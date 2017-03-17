# Awesome Tower Defense
This is a tower defense game - still in progress

## Notes - general dev notes

Position are defined by the top left corner of the element (monsters and towers are square blocks). The monsters and towers have a sideLength value which can be used to compute the coordinate square used to determine position

Towers have a size of 2x2

### TODO
* Add upgrade screen so that users can choose different towers to upgrade from
* Complete unit test coverage
* add the following effects:
 - multiple targets
 - damage over timer
 - splash
 - slow
 - damage amplifier
 - bounce to next monster
 - freeze
 * do some balancing (towers and levels are definitely not balanced lol.)

### TODO later
* Add range displays for towers during placement and when clicked
* Add messages for when something is sold
* Come up with a better name than awesome TD
* Think of a theme to go with the better name than awesome TD
* Make some cool sprites
* Get a better background (instead of using canvas to generate the background)
