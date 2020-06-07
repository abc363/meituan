'use strict';
 
const path = require('path');
module.exports={
    entry:"./src/index.js",
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    mode:'production',
    module:{
        rules:[
            {test:/\.less$/,loader: "style-loader!css-loader!less-loader"},
        ]
    }
}