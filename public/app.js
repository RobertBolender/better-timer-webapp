// Timer Application Logic
class TimerApplication {
  constructor() {
    this.totalDuration = 0;
    this.remainingTime = 0;
    this.timerIntervalId = null;
    this.audioContext = null;
    this.oscillator = null;
    this.isRunning = false;
    
    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    this.configPanel = document.getElementById('configPanel');
    this.activePanel = document.getElementById('activePanel');
    this.inputMinutes = document.getElementById('inputMinutes');
    this.inputSeconds = document.getElementById('inputSeconds');
    this.btnBegin = document.getElementById('btnBegin');
    this.btnCancel = document.getElementById('btnCancel');
    this.btnRestart = document.getElementById('btnRestart');
    this.timerDisplay = document.getElementById('timerDisplay');
    this.timerProgress = document.getElementById('timerProgress');
    this.snoozeModal = document.getElementById('snoozeModal');
    this.dragGrid = document.getElementById('dragGrid');
    this.instructionText = document.getElementById('instructionText');
  }

  attachEventListeners() {
    this.btnBegin.addEventListener('click', () => this.startTimer());
    this.btnCancel.addEventListener('click', () => this.stopTimer());
    this.btnRestart.addEventListener('click', () => this.resetTimer());
  }

  startTimer() {
    const mins = parseInt(this.inputMinutes.value) || 0;
    const secs = parseInt(this.inputSeconds.value) || 0;
    this.totalDuration = mins * 60 + secs;
    
    if (this.totalDuration <= 0) {
      alert('Please enter a valid duration');
      return;
    }

    this.remainingTime = this.totalDuration;
    this.isRunning = true;
    this.configPanel.classList.add('hidden');
    this.activePanel.classList.remove('hidden');
    
    this.updateDisplay();
    this.timerIntervalId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    if (this.remainingTime > 0) {
      this.remainingTime--;
      this.updateDisplay();
    } else {
      this.triggerAlarm();
    }
  }

  updateDisplay() {
    const mins = Math.floor(this.remainingTime / 60);
    const secs = this.remainingTime % 60;
    this.timerDisplay.textContent = 
      `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    const progressPercent = ((this.totalDuration - this.remainingTime) / this.totalDuration) * 100;
    this.timerProgress.style.width = `${progressPercent}%`;
  }

  stopTimer() {
    if (this.timerIntervalId) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }
    this.isRunning = false;
    this.stopAlarmSound();
    this.configPanel.classList.remove('hidden');
    this.activePanel.classList.add('hidden');
    this.snoozeModal.classList.add('hidden');
  }

  resetTimer() {
    this.stopTimer();
    this.timerProgress.style.width = '0%';
  }

  triggerAlarm() {
    if (this.timerIntervalId) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }
    this.playAlarmSound();
    this.showSnoozeChallenge();
  }

  playAlarmSound() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      
      this.oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      this.oscillator.start();
      
      setInterval(() => {
        if (this.oscillator) {
          this.oscillator.frequency.setValueAtTime(
            this.oscillator.frequency.value === 880 ? 440 : 880,
            this.audioContext.currentTime
          );
        }
      }, 500);
    } catch (err) {
      console.error('Audio error:', err);
    }
  }

  stopAlarmSound() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  showSnoozeChallenge() {
    this.snoozeModal.classList.remove('hidden');
    const challenge = new DragSnoozeChallenge(this.dragGrid, this.instructionText, () => {
      this.snoozeTimer();
    });
    challenge.initialize();
  }

  snoozeTimer() {
    this.stopAlarmSound();
    this.snoozeModal.classList.add('hidden');
    this.remainingTime = 300;
    this.totalDuration = 300;
    this.updateDisplay();
    this.timerIntervalId = setInterval(() => this.tick(), 1000);
  }
}

class DragSnoozeChallenge {
  constructor(gridContainer, instructionElement, onSuccessCallback) {
    this.gridContainer = gridContainer;
    this.instructionElement = instructionElement;
    this.onSuccessCallback = onSuccessCallback;
    this.originIndex = -1;
    this.destinationIndex = -1;
    this.circles = [];
    this.dragStartCircle = null;
    this.isLongPressing = false;
    this.longPressTimer = null;
    this.currentDragElement = null;
  }

  initialize() {
    this.gridContainer.innerHTML = '';
    this.circles = [];
    
    const allIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.originIndex = allIndices[Math.floor(Math.random() * allIndices.length)];
    
    do {
      this.destinationIndex = allIndices[Math.floor(Math.random() * allIndices.length)];
    } while (this.destinationIndex === this.originIndex);

    for (let i = 0; i < 9; i++) {
      const circle = document.createElement('div');
      circle.className = 'circle-target';
      circle.dataset.index = i;
      
      if (i === this.originIndex) {
        circle.classList.add('origin');
        circle.textContent = '▶';
      } else if (i === this.destinationIndex) {
        circle.classList.add('destination');
        circle.textContent = '⬤';
      }
      
      this.setupDragHandlers(circle, i);
      this.circles.push(circle);
      this.gridContainer.appendChild(circle);
    }

    this.instructionElement.textContent = 'Long-press BLUE (▶), drag to RED (⬤)';
  }

  setupDragHandlers(element, index) {
    let pressTimer = null;
    let startX = 0;
    let startY = 0;

    const handleStart = (e) => {
      if (index !== this.originIndex) return;
      
      e.preventDefault();
      const touch = e.touches ? e.touches[0] : e;
      startX = touch.clientX;
      startY = touch.clientY;
      
      pressTimer = setTimeout(() => {
        this.isLongPressing = true;
        this.currentDragElement = element;
        element.classList.add('being-dragged');
        navigator.vibrate && navigator.vibrate(50);
      }, 800);
    };

    const handleMove = (e) => {
      if (!this.isLongPressing) {
        const touch = e.touches ? e.touches[0] : e;
        const dx = Math.abs(touch.clientX - startX);
        const dy = Math.abs(touch.clientY - startY);
        if (dx > 10 || dy > 10) {
          clearTimeout(pressTimer);
        }
        return;
      }

      e.preventDefault();
      const touch = e.touches ? e.touches[0] : e;
      const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
      
      this.circles.forEach(c => c.classList.remove('hover-target'));
      
      if (elementAtPoint && elementAtPoint.classList.contains('circle-target')) {
        const targetIndex = parseInt(elementAtPoint.dataset.index);
        if (targetIndex === this.destinationIndex) {
          elementAtPoint.classList.add('hover-target');
        }
      }
    };

    const handleEnd = (e) => {
      clearTimeout(pressTimer);
      
      if (this.isLongPressing) {
        const touch = e.changedTouches ? e.changedTouches[0] : e;
        const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (elementAtPoint && elementAtPoint.classList.contains('circle-target')) {
          const targetIndex = parseInt(elementAtPoint.dataset.index);
          if (targetIndex === this.destinationIndex) {
            this.onSuccessCallback();
            return;
          }
        }
        
        element.classList.remove('being-dragged');
        this.circles.forEach(c => c.classList.remove('hover-target'));
        this.isLongPressing = false;
        this.currentDragElement = null;
        navigator.vibrate && navigator.vibrate([50, 50, 50]);
      }
    };

    element.addEventListener('touchstart', handleStart, { passive: false });
    element.addEventListener('touchmove', handleMove, { passive: false });
    element.addEventListener('touchend', handleEnd);
    element.addEventListener('touchcancel', handleEnd);
    
    element.addEventListener('mousedown', handleStart);
    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseup', handleEnd);
  }
}

const appInstance = new TimerApplication();
