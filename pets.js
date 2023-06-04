//global variables
let command = process.argv[2]
let args = process.argv
const path = require('path')
let petPath = path.join(__dirname, 'pets.json')


//******************* SERVER **************/
const http = require("http");
const PORT =  8001;


let server = http.createServer( (req, res) => {
    fs.readFile(petPath, 'utf-8', (error, petsJSON) => {
        if (req.method === 'GET' && req.url === '/pets') {
            if (error) {
                console.error(error.message)
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(petsJSON)
            }
        } else {
       res.statusCode = 404;
       res.setHeader('Content-Type', 'text/plain');
       res.end('Not found');
        }
    })



});


server.listen(PORT, function() {
    console.log('Listening on port' , PORT)
});

//******************* SERVER **************/


//******** READ AND CREATE FUNCTIONALITY ******************/
const fs = require("fs");

//create FN
const create = () => {
    const age = parseInt(args[3])
    const kind = args[4]
    const name = args[5]
    if (!args.length === 6){
        console.log("Usage: node pets.js create [AGE | KIND | NAME]")
    } else {
        fs.readFile(`${petPath}`, 'utf-8', function(error, data) { 
            const parsedData = JSON.parse(data)
            if (error) {
                console.error(error.message)
            } else {
                const newPet = { 
                age,
                kind,
                name
                }
                parsedData.push(newPet)
            

        fs.writeFile('./pets.json', JSON.stringify(parsedData), function (error){
        if (error){
                console.error(error.message);
            } else {
                console.log(parsedData)
            }
        })
        }
        })
    }
 }

//read FN
const read = () => {
    fs.readFile('./pets.json', readData);
}

//read async callback 
async function readData(error, data) {
    const parsedData = JSON.parse(data)
    const index = process.argv[3]
        if (error){
            console.log(error)
        } else if (index === undefined){
            console.log(parsedData)
        } else {
            console.log(parsedData[index])
        }
} // there is no datat at your requested index FYSA age needs to be parsed to an int 


function getCommand(){
    if (command === 'read') {
        read()
    } else if (command === 'create'){
        create()
    }  else if (command === 'update'){
        update()
    } else if (command === 'destroy'){
        destroy()
    } else{
        console.log("Usage: node pets.js [read | create | update | destroy]")
    }
}

getCommand()
//******** READ AND CREATE FUNCTIONALITY ******************/