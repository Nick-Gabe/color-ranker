# ![Color-Ranker](https://i.imgur.com/fgNtVaC.png)
A tool which read an image using the Jimp library, and returns a complete ranking based in the most used colors on it.

![Badge](https://img.shields.io/github/issues/Kiddyzaster/color-ranker)
![Badge](https://img.shields.io/github/forks/Kiddyzaster/color-ranker)
![Badge](https://img.shields.io/github/stars/Kiddyzaster/color-ranker)
![Badge](https://img.shields.io/badge/license-MIT-brightgreen)

<!--ts-->
   * [Installation](#installation)
   * [How to Use](#how-to-use)
      * [Directory](#directory)
      * [Output](#output)
      * [Tolerance](#tolerance)
   * [Retrieving the data](#retrieving-the-data)
   * [Author](#author)
   * [License](#mit-license)
<!--te-->

## Installation
~~~javascript
npm install color-ranker
~~~


## How to use
~~~javascript
const rank  = require("color-ranker");
// or if you're using ES6
import rank from "color-ranker";

Rank("directory", "output", tolerance)
// Explanation below
~~~
### Directory
First you need to say the image directory to the function, where the image is located.

You must send it as a **string**, including its **format** "image.png", "image.jpeg", etc...


### Output
Currently the color codes available for output are:
* RGB (255, 255, 255)
* HEX (#000000)

You must pass them as a string, for example "hex". The standard is RGB.

### Tolerance
Tolerance is the maximum amount of RGB variation that can consider one color the same as another.

The standard tolerance is 30, this means (225, 225, 225) is considered the same as (255, 255, 255).

More tolerance = faster execution, but also means more detail will be lost. Less tolerance is the opposite.

## Retrieving the data
The color ranking will be returned as a premise.
~~~javascript
Rank("example/image.png", "hex", 30).then(premise => console.log(premise))
// or you can use await
const ranking = await Rank("example/image.png", "hex", 30)
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
I'm Nícolas Gabriel, known as Kiddyzaster or Nick Gabe, I started programming in 2020.
Already developed Discord Chatbots, Games and [Bad Apple](https://www.youtube.com/watch?v=XzXHIuJOCPk).
This is my first public code, but i won't stop there and I'm planning to do more contributions to the community in the future.

# MIT License
Copyright (c) 2021 [Nícolas Gabriel da Silva Sena](https://github.com/Kiddyzaster)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.