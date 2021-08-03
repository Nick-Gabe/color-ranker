const { Rank } = require("../ranker");

Rank('example/image.png', 'hex', 30).then(premise => console.log(premise.length))
