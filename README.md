# Awesome Tower Defense
This is a tower defense game - still in progress

##Notes - general dev notes

Position are defined by the top left corner of the element (monsters and towers are square blocks). The monsters and towers have a sideLength value which can be used to compute the coordinate square used to determine position

Towers have a size of 2x2

### TODO
* Write tests

### TODO later
* Come up with a better name than awesome TD
* Think of a theme to go with the better name than awesome TD
* Make some cool sprites
* Think of better towers and monsters
* Get a better background (instead of using canvas to generate the background)
* Figure out why there is a delay with projectiles after hitting a monster (and the monster dies) - only noticable with a slower game cycle speed
