# ![Color-Ranker](https://i.imgur.com/fgNtVaC.png)
An image reader tool which gets a complete ranking based in the most used colors on it.

![Issues](https://img.shields.io/github/issues/Kiddyzaster/color-ranker)
![Forks](https://img.shields.io/github/forks/Kiddyzaster/color-ranker?color=brightgreen)
![Stars](https://img.shields.io/github/stars/Kiddyzaster/color-ranker?color=brightgreen)
![License](https://img.shields.io/npm/l/color-ranker?color=brightgreen)
![Version](https://img.shields.io/npm/v/color-ranker?color=0669b2&label=version)

<!--ts-->
   * [Installation](#installation)
   * [How to Use](#how-to-use)
      * [Directory](#directory)
      * [Output](#output)
      * [Tolerance](#tolerance)
      * [Percentage](#percentage)
   * [Retrieving the data](#retrieving-the-data)
   * [Author](#author)
   * [License](#license)
<!--te-->

## Installation
~~~javascript
npm install color-ranker
~~~


## How to use
~~~javascript
var colorranker  = require("color-ranker");
// or if you're using ES6
import colorranker from "color-ranker";

colorranker({directory, output, tolerance, percentage})
// The function must receive these values inside an object
// Further explanation below
~~~
### Directory
~~~javascript
{ directory: "path/to/image.png" }
~~~
First you need to say the image directory to the function, where the image is located.

You must send it as a string, including its format "image.png", "image.jpeg", etc...


### Output
~~~javascript
{ output: "hex" }
// default: RGBA
~~~
Currently the color codes available for output are:
* RGBA (255, 255, 255, 255)
* RGB (255, 255, 255)
* HEX (#000000)
* Integer (0xFFFFFFFF)

You must pass them as a string, e. g. "hex", "integer".

### Tolerance
~~~javascript
{ tolerance: 0 }
// default: 30
~~~
Tolerance is the maximum amount of RGB variation that can consider one color the same as another.

The default tolerance being 30 means (225, 225, 225) is considered the same color as (255, 255, 255).

More tolerance = faster execution, but also means more detail will be lost. Less tolerance is the opposite.

### Percentage
~~~javascript
{ percent: true } // ---> output { color: '#e3fffe', quantity: 42.96 }
// default: false
~~~
You can give the function a parameter called "percent", if set to true it will return the percentage of pixels in the image equivalent to each color. 

By default it is set to false, meaning it will display only the quantity of pixels instead.

## Retrieving the data
The color ranking will be returned as a promise.
~~~javascript
colorranker({directory: "example/image.png", output: "hex", tolerance: 30}).then(promise => console.log(promise))
// or you can use await
const ranking = await colorranker({directory: "example/image.png", output: "hex", tolerance: 30})
console.log(ranking)

// Output:
[
  { color: '#ffe0da', quantity: 1426 },
  { color: '#fab5ac', quantity: 438 },
  { color: '#722b21', quantity: 294 },
  { color: '#924d42', quantity: 208 },
  { color: '#d69b8b', quantity: 203 },
  { color: '#c48274', quantity: 168 },
  { color: '#fff3f3', quantity: 140 },
  { color: '#ffede6', quantity: 128 },
  { color: '#ffc0ac', quantity: 84 },
  { color: '#ffc3b2', quantity: 72 },
... 39 more items
]
~~~

## Author
I'm Nícolas Gabriel, also known as Nick Gabe, I started programming in 2020.
Already developed Discord Chatbots, Games, Bad Apple and now Libraries.
This is my first public code, but I won't stop there and I'm planning to do more contributions to the community in the future.

# License
[MIT License](https://choosealicense.com/licenses/mit/)
Copyright (c) 2021 [Nícolas Gabriel da Silva Sena](https://github.com/Kiddyzaster)
