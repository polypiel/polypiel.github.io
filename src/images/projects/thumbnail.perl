#!/usr/bin/perl
# (c) Copyright 2003-2005 by Ortwin Glück
# This is free software. Free as in "freedom" and "free beer".
use Image::Magick;

if ($#ARGV < 1) {
  print <<EOF;
usage: thumbnail [options] size image [image ...]
 options:
  -d destinationdir  thumbnails are saved to that directory
                     default is the current directory
  -p prefix          thumbnail filenames are prefixed with this string
  -bg color          (only with -w -h size) draw borders to fit box
                     color names (blue) or RGB hexcode (#00ff00)
  -q quality         JPEG quality of the output (0-100)
                     default is 75
  -v                 verbose mode: print filenames
                     
 size (either of the following):
  -f factor          image is resized by 1/factor
  -w width -h height image is resized to fit in the box width x height
  -w width           the longer side of image is resized to width
  -h height          the shorter side of image is resized to height
  
 image               file name of an image

 examples:
 thumbnail -d thumbs -f 8 *.jpg
   scales all jpg files in the current directory down by factor 8 and
   stores them in the thumbs directory under the same name.

 thumbnail -p t- -w 120 -h 90 -bg black *.jpg
   scales all jpg files in the current directory to fit in a 120x90 box
   using black background color and stores them in the current directory
   with their name prefixed by t-
EOF
  exit;
}

my $ddir = '.';
my $prefix = '';
my $factor = 0;
my $quality = 75;
my $fwidth = 0;
my $fheight = 0; 
my $bgcol = '';
my $verbose = 0;
my @images;
# parse parameters
for ($i = 0; $i <= $#ARGV; $i++) { 
  $arg = $ARGV[$i];
  if ($arg =~ /^-/) {
    if ($arg eq "-d") {
      $i++;
      $ddir = $ARGV[$i];
    } elsif ($arg eq "-p") {
      $i++;
      $prefix = $ARGV[$i]; 
    } elsif ($arg eq "-f") {
      $i++;
      $factor = $ARGV[$i];
    } elsif ($arg eq "-w") {
      $i++;
      $fwidth = $ARGV[$i];
    } elsif ($arg eq "-h") {
      $i++;
      $fheight = $ARGV[$i];
    } elsif ($arg eq "-bg") {
      $i++;
      $bgcol = $ARGV[$i];
    } elsif ($arg eq "-v") {
      $verbose = 1;
    } elsif ($arg eq "-q") {
	  $i++;
      $quality = $ARGV[$i];
	}
  } else {
    if (-f $arg) {
      @images = (@images, $arg);
    } else {
      print "not a file: $arg\n";
    }
  }
}

if (($factor == 0) && ($fwidth == 0) && ($fheight == 0)) {
  die("size parameter missing");
}

for my $image (@images) {
  my $file = "$image";
  $image =~ s/.*\/([^\/]+)$/$1/;
  my $img = Image::Magick->new;
  $img->Read($file);
  ($width, $height) = $img->Get('width', 'height');
  if ($factor > 0) {
    $width = $width / $factor;
    $height = $height / $factor; 
  } elsif (($fwidth > 0) && ($fheight > 0)) {
    my $wf = $fwidth / $width;
    my $hf = $fheight / $height;
    if ($wf * $height > $fheight) {
      $width = $width * $hf;
      $height = $fheight; 
    } else {
      $width = $fwidth;
      $height = $height * $wf; 
    }
  } elsif ($fwidth > 0) {
    my $wf = $fwidth / $width;
    my $hf = $fwidth / $height;
    if ($wf < $hf) {
      $width = $fwidth;
      $height = $height * $wf;
    } else {
      $width = $width * $hf;
      $height = $fwidth;
    }
  } elsif ($fheight > 0) {
    my $wf = $fheight / $width;
    my $hf = $fheight / $height;
    if ($wf < $hf) {
      $width = $width * $hf;
      $height = $fheight;
    } else {
      $width = $fheight;
      $height = $height * $wf;
    }
  } else {
    die("Invalid size parameter");
  }
  $img->Scale(width=>$width, height=>$height);
  if (($factor == 0) && ($bgcol ne '')) {
    $img->Set(bordercolor=>$bgcol);
    $framew = ($fwidth - $width) / 2;
    $frameh = ($fheight - $height) / 2;
    if (($framew != 0) || ($frameh != 0)) {
      if ($frameh == 0) {
        $frameh++; # workaround bug to prevent a black image
      }
      $img->Frame(width=>$framew,
                  height=>$frameh,
                  inner=>0, outer=>0, fill=>$bgcol);
    }
  }
  $img->SetAttribute(quality=>$quality);
  $img->Write("$ddir/${prefix}${image}");
  if ($verbose) { print "$image\n"; }
}
