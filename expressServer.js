//*****GLOBAL VAR AND MODULES**** */
let express = require('express')
let server = express()
let fs = require('fs')
let path = require('path')
let PORT = 8002


//*****GLOBAL VAR AND MODULES**** */
server.use(express.json())
// server.use(expressurlencoded({extended: false }));

server.post('/pets', (req, res)  => { 
  const {age, kind , name} = req.body;
  if ( !name || !age || !kind || isNaN(age)) {
    res.status(400).send(err);
  } else if (
    name.length === 0 || 
    kind.length === 0 || 
    typeof age !== "number") {
        res.status(404).send(err);
  } else {
    const petPath = path.join(__dirname, "pets.json");
    fs.readFile(petPath, "utf-8", (err, data) => {
        if(err) {
            res.status(500).send("err");
        } else {
            const parsed = JSON.parse(data);
            const newPet = { age: parseInt(age), kind, name};
            parsed.push(newPet);
            fs.writeFile(petPath, JSON.stringify(parsed), (err) => {
                if (err) {
                    res.status(500).send(err);
                } else { 
                    res.status(200).json(newPet);
                };
                });
        }
    })
  };
});
    // console.log(req.body)
    // res.statusCode = 200 
    // res.send('Created New Pet')






server.get('/pets', function(req, res) {
    const petsPath = path.join(__dirname, 'pets.json')
    fs.readFile(petsPath, 'utf-8', function(error, data){
        if(error){
            console.error(error.message)
        }
            const parsedData = JSON.parse(data)
            res.statusCode = 200
                res.send(parsedData)
        })
})
  

server.get('/pets/:id', function (req, res) {
       const id = req.params.id
       const petsPath = path.join(__dirname, 'pets.json')
       fs.readFile(petsPath, 'utf-8', function(error, data) {
        let parsedData = JSON.parse(data)
        if(error){
            console.error(error.message)
        } else if (id >= 0 && id <= parsedData.length -1) {
            res.statusCode = 200
            res.send(parsedData[id])
        } else {
            res.statusCode = 404
            res.send('Not Found')
        }

       }) 
})



server.listen(PORT, function () {
console.log('Listening on port', PORT)
})



