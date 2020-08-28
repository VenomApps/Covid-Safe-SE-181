
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));



let encounters = obj.encounters

encounters = encounters.map((ele) => {
    ele.uid = `${Math.floor((Math.random() * 999999999) + 1)}`
    return ele
})

console.log(encounters)


