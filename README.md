# Awesome Tower Defense
This is a tower defense game - still in progress

##Notes - general dev notes

Position are defined by the top left corner of the element (monsters and towers are square blocks). The monsters and towers have a sideLength value which can be used to compute the coordinate square used to determine position

### TODO

* Add in basic game cycle functionality (monsters move and towers shoot things, game gets money when monster dies from tower, game loses life when monster reaches the end, etc)
* Write tests once the structure better defined
* Write tests for utils and add comments to it
* Pull out all the game constants and store them in a file somewhere
* fix monster movement

### TODO later
* Come up with a better name than awesome TD
* Think of a theme to go with the better name than awesome TD
* Make some cool sprites
* Think of better towers and monsters
* Get a better background (instead of using canvas to generate the background)
