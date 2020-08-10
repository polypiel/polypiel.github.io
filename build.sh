#!/bin/bash

while getopts ":hp" opt; do
  case ${opt} in
    h ) # process option h
      echo "Usage: $0 [-h] [-p]"
      echo "\tUse -p for production build"
      ;;
    p ) # process option t
      echo "Building for prod..."
      SASS_FGS="--style compressed"
      JEKYLL_ENV="prod"
      ;;
  esac
done


# Build site
jekyll build

# Compile SCSS
for f in `ls src/css/*.scss`; do
  sass --update $f:${f%.scss}.css --sourcemap=none $SASS_FGS
done

if [ ! -z  "$SASS_FGS" ]
then
  # Minifies CSS files
  yui-compressor _build/css/angel.css -o _build/css/angel.css
  
  # Clean stuff
  rm _build/css/angel.scss
  rm _build/css/angel.css.map
fi
