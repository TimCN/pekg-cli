var program = require('commander');
program.parse(process.argv);
require('./command/' + program.args + '.js') 