#!/bin/bash

while getopts ":hp" opt; do
  case ${opt} in
    h ) # process option h
      echo "Usage: $0 [-h] [-p]"
      echo "\tUse -p for production build"
      ;;
    p ) # process option t
      SASS_FGS="--style compressed"
      ;;
  esac
done


# Compile and  minifies CSSs
for f in `ls src/css/*.scss`; do
  sass --update $f:${f%.scss}.css $SASS_FGS
done

# Build site
jekyll build


if [ ! -z  "$SASS_FGS" ]
then
	# Minifies JS files
	yui-compressor _build/js/angel.js -o _build/js/angel.js
	yui-compressor _build/js/simplespi.js -o _build/js/simplespi.js
	yui-compressor _build/js/handlebars-v2.0.0.js -o _build/js/handlebars-v2.0.0.js
	# Minifies CSS files
	yui-compressor _build/css/animate-custom.css -o _build/css/animate-custom.css
	yui-compressor _build/css/magnific-popup.css -o _build/css/magnific-popup.css
	yui-compressor _build/css/normalize.css -o _build/css/normalize.css
	yui-compressor _build/css/angel.css -o _build/css/angel.css
fi
