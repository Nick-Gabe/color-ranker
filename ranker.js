const Jimp = require('jimp')
const rgb2hex = require('rgb2hex')

module.exports = {
    async rank(directory, format = 'rgb', tolerance = 30 ) {
        if(isNaN(tolerance)) tolerance = 30

        const img = await Jimp.read(`${directory}`)

        var ranked_colors = []

        if (img.getWidth() * img.getHeight() >= 10000) {
            img.resize(300, Jimp.AUTO)
            var width = img.getWidth()
            var height = img.getHeight()
        } else {
            var width = img.getWidth()
            var height = img.getHeight()
        }

        const max = width * height

        var pixel_color
        var exist
        var x = 0
        var y = 0

        for (ct = 0; ct < max; ct++) {
            pixel_color = Object.values(Jimp.intToRGBA(img.getPixelColor(x, y))).slice(0, 3)
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

        switch (format) {
            case 'hex':
                ranked_colors.forEach((element, index) => {
                    ranked_colors[index].color = rgb2hex(`rgb(${element.color.join(',')})`).hex
                });
                break
        }

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

