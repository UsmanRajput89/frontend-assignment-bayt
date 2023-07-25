# Frontend Assignment
it is the complete assignment with all the completed parts
## Table of Contents
- [Usage](#usage)
- [Getting Started](#getting-started)

## Usage

To use the slider in your project, you will need the following files:

1. `index.html` - Contains the HTML structure for the slider and its slides.
2. `styles.css` - Contains the CSS styles for the slider and its animations.
3. `script.js` - Contains the JavaScript code that provides the slider functionality.
4. `images/ ` - It contains all the required images either for icons png’s or other images

Simply include these files in your project and make sure to update the image paths if needed.

## Getting Started

To get started with the slider, follow these steps:

1. in HTML we need two necessary elements with classes: main wrapper with class 'slider_wrapper' and its direct child 'slider' and all the direct children divs of slider will be slides 
2. The Autoplay feature can be  controlled by the data-autoplay attribute and we can give two possible values 'true' or 'false' 

```
<div class="slider_wrapper" data-autoplay="false">
    <div class="slider">
        <div>
            SLIDE 2
        </div>

        <div>
            SLIDE 2
        </div>

        <div>
            SLIDE 3
        </div>
        
        <div>
            SLIDE 4
        </div>
    </div>
</div>

```
2. Open the `index.html` file in your web browser.

The slider should now be visible, and you can interact with it using the navigation arrows or the dots.

