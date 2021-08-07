var colorranker = require('../index')

colorranker({
    directory: 'example/image2.png',
    output: 'integer',
    percent: true,
    tolerance: 10
}).then(promise => console.log(promise))
