# Awesome Tower Defense
This is a tower defense game - still in progress

## Installation
Clone the repo and run npm install
```bash
npm install
```
Install ```gulp``` globally

```bash
npm install -g gulp-cli npm install gulp
```
Make sure you have ```gulp``` installed by testing
```bash
gulp -v
```

Compile assets and run using gulp
```bash
gulp
```

## Notes - general dev notes

Position are defined by the top left corner of the element (monsters and towers are square blocks). The monsters and towers have a sideLength value which can be used to compute the coordinate square used to determine position

Towers have a size of 2x2

### TODO
* When changing tabs (in the browser), monsters jump (because of the dt used, time doesn't stop but execution stops) - look into web workers or pausing the game when request animation - OR set a maximum dt....?
* Complete upgrade lb
* Complete unit test coverage
* do some balancing (towers and levels are definitely not balanced lol.)
* add in strengths and weaknesses
* render information properly
* move out html into components
* Fix modal to vertically center (ugh)
* make the styling nice

### TODO later
* Come up with a better name than awesome TD
* Think of a theme to go with the better name than awesome TD
* Make some cool sprites
* Get a better background (instead of using canvas to generate the background) - or implement path finding
