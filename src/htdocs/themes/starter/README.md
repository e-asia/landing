# Installation

Starter theme uses [Gulp](http://gulpjs.com) to compile Sass. Gulp needs Node.

#### Step 1
Make sure you have Node and npm installed. 
You can read a guide on how to install node here: https://docs.npmjs.com/getting-started/installing-node

#### Step 2
Go to the root of Starter theme: `cd /themes/custom/starter`.

#### Step 3
Install modules by run the following commands: `npm install`.

#### Step 4
Run the following command to compile Sass and watch for changes: `gulp`.

# How it works

#### Add files
Custom css and js are added automatically when created in `assets/scss` and `assets/js`.
For node modules import scss in `/starter/starter.imports.min.scss` and for js in `/starter/config.json`

#### Edit files
Edit css and js files in `assets/scss` and `assets/js` only.

#### Compilation
all scss files are compiled in `/starter/starter.style.min.css`.
all js files are compiled in `/starter/starter.script.min.js`.
****DO NOT EDIT THAT FILES****

# Breakpoints

#### Mobile first
@include media-breakpoint-up(sm) {}

@include media-breakpoint-up(md) {}

@include media-breakpoint-up(lg) {}

@include media-breakpoint-up(xl) {}


#### Smaller size
@include media-breakpoint-down(xs) {}

@include media-breakpoint-down(sm) {}

@include media-breakpoint-down(md) {}

@include media-breakpoint-down(lg) {}