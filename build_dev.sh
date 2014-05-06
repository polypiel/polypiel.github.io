#!/bin/bash

# Compile SASS
for f in `ls src/css/*.scss`; do
  sass --update $f:${f%.scss}.css
done

# Build site
jekyll build
