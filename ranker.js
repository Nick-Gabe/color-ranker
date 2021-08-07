const Jimp = require('jimp')
const rgb2hex = require('rgb2hex')

module.exports = {
    async colorranker({
        directory,
        output = 'rgba',
        tolerance = 30,
        percent = false
    }) {
        if (isNaN(tolerance)) tolerance = 30
        if (percent.valueOf != true || false) percent = false

        // first it reads the image
        const img = await Jimp.read(`${directory}`)

        var ranked_colors = []

        var base_area = img.getWidth() * img.getHeight()
        var new_area = null

        // if the image has more than 90,000 pixels, we'll resize it
        if ( base_area >= 90000) {
            img.resize(300, Jimp.AUTO)
            new_area = img.getWidth() * img.getHeight()
        }
            
        var width = img.getWidth(), height = img.getHeight()

        const max = width * height

        var pixel_color
        var exist
        var x = 0
        var y = 0

        /** Here is where the magic happens
         * In the loop we see the color of a pixel, then search to see if it's already listed
         * if not, it tries comparing against other colors to see if they're similar
         * enough according to the tolerance, if not then add it on the array.
         *  */
        for (ct = 0; ct < max; ct++) {
            pixel_color = Object.values(Jimp.intToRGBA(img.getPixelColor(x, y)))
            exist = ranked_colors.find(x => x.color === pixel_color)

            if (exist) {
                exist.quantity++
            }
            else {
                var similar = ranked_colors.find(x => {
                    var points = 0
                    x.color.forEach((element, index) => {
                        element >= pixel_color[index] && pixel_color[index] >= element - tolerance ? points++ : points--
                    });
                    if (points > 0) return true
                })

                if (similar) {
                    similar.quantity++
                } else {
                    ranked_colors.push({
                        color: pixel_color,
                        quantity: 1
                    })
                }
            }

            if (x >= width) {
                y++
                x = 0
            }
            else x++
        }

        // turns into percentage if wanted
        percent === true && ranked_colors.forEach(e => e.quantity = (e.quantity / (height * width))*100);
        // if the image is resized, convert the resized pixel quantity output to its normal quantity
        percent === false && new_area && ranked_colors.forEach(e => e.quantity*= (base_area / new_area));

        // converts the rgba values to other sorts of outputs you might want
        switch (output.toLowerCase()) {   
            case 'rgb':
                ranked_colors.forEach((element, index) => {
                    ranked_colors[index].color = element.color.slice(0, 3).join(',')
                });
                break
            case 'hex':
                ranked_colors.forEach((element, index) => {
                    ranked_colors[index].color = rgb2hex(`rgb(${element.color.slice(0, 3).join(',')})`).hex
                });
                break
            case 'integer':
                ranked_colors.forEach((element, index) => {
                    ranked_colors[index].color = Jimp.rgbaToInt(...element.color)
                });
                break
        }

        // returns the sorted array
        return ranked_colors.sort((a, b) => {
            if (a.quantity > b.quantity) {
                return -1
            }
            else if (a.quantity < b.quantity) {
                return 1
            }
            else return 0
        })
    }
}


