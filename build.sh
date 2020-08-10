#!/bin/bash

while getopts ":hp" opt; do
  case ${opt} in
    h ) # process option h
      echo "Usage: $0 [-h] [-p]"
      echo "\tUse -p for production build"
      ;;
    p ) # process option t
      SASS_FGS="--style compressed"
      JEKYLL_ENV="prod"
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
	# Minifies CSS files
	yui-compressor _build/css/normalize.css -o _build/css/normalize.css
	yui-compressor _build/css/angel.css -o _build/css/angel.css
fi
