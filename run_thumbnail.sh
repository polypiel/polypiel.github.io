#!/bin/bash

# Parameter $1 -> project
IMG_DIR=src/images/projects/
PREFIX=thumb_

shopt -s extglob

perl thumbnail.perl -v -d $IMG_DIR$1 -p $PREFIX -w 200 `ls $IMG_DIR$1/!($PREFIX*.png)`

shopt -u extglob
