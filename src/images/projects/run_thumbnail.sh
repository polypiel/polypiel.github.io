#!/bin/bash

# Parameter $1 -> directory

perl thumbnail.perl -d $1 -p thumb_ -w 200 $1/*.png
