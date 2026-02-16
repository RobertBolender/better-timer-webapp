#!/bin/bash

# Create simple colored PNG icons using ImageMagick
convert -size 192x192 xc:"#5f7cc9" \
  -draw "fill none stroke white stroke-width 15 circle 96,96 68,96" \
  -draw "fill none stroke white stroke-width 12 stroke-linecap round line 96,96 96,48" \
  -draw "fill none stroke white stroke-width 10 stroke-linecap round line 96,96 125,67" \
  icon-192x192.png 2>/dev/null || \
  convert -size 192x192 gradient:"#5f7cc9-#8b6bbd" icon-192x192.png 2>/dev/null || \
  convert -size 192x192 xc:"#5f7cc9" icon-192x192.png

convert -size 512x512 xc:"#5f7cc9" \
  -draw "fill none stroke white stroke-width 40 circle 256,256 180,256" \
  -draw "fill none stroke white stroke-width 30 stroke-linecap round line 256,256 256,128" \
  -draw "fill none stroke white stroke-width 25 stroke-linecap round line 256,256 333,179" \
  icon-512x512.png 2>/dev/null || \
  convert -size 512x512 gradient:"#5f7cc9-#8b6bbd" icon-512x512.png 2>/dev/null || \
  convert -size 512x512 xc:"#5f7cc9" icon-512x512.png

echo "PNG icons created"
