#!/bin/bash

# Compile and  minifies CSSs
for f in `ls src/css/*.scss`; do
  sass --update $f:${f%.scss}.css --style compressed
done

# Build site
jekyll build

# Minifies JS files
yui-compressor _build/js/angel.js -o _build/js/angel.js
yui-compressor _build/js/simplespi.js -o _build/js/simplespi.js
# Minifies CSS files
yui-compressor _build/css -o build/animate-custom.css
yui-compressor _build/lightbox.css -o build/lightbox.css
yui-compressor -build/normalize.css -o build/normalize.css
