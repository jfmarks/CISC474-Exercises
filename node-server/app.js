const express = require("express");
const fs = require("fs");
const path = require('path');
const app = express();
const port = 8080;

app.use( function ( req, res, next ) {
    const { url, path: routePath } = req ;
    console.log( 'Request: Timestamp:', new Date().toLocaleString(), ', URL (' + url + '), PATH (' + routePath + ').' ) ;
    next();
});

app.use('/', express.static(path.join(__dirname, '')))
app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
});

app.get('/api/v1/listUsers', function(req, res) {
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        console.log (data);
        res.end(data);
    });
});

app.delete('/api/v1/deleteUser', function(req, res){
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        delete data["user"+req.query["user"]];
        fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.post('/api/v1/listUsers', function(req, res) {
    data = JSON.parse(data);
    console.log(data);
    fs.appendFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        console.log (data);
        res.end(data);
    });
});

app.get('/api/v1/filterUser', function(req, res) {
    const filterKey = parseInt(req.query["key"]);
    console.log("looking for: user" +filterKey);
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        const allUsers = JSON.parse(data);
        
        const userArray = Object.values(allUsers);
        
        // Filter users based on the specified key
        console.log(userArray);
        const filteredUsers = userArray.filter(user => user.id === filterKey);


        console.log(filteredUsers);
        res.json(filteredUsers);
    });
});


app.post('/api/v1/addUser', function(req, res) {
    // Read existing users data
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(req.query["password"]);
        const newUser = {
            name: req.query["name"],
            password: req.query["password"],
            profession: req.query["profession"],
            id: parseInt(req.query["user"])
        };

        const allUsers = JSON.parse(data); // Parse existing data

        console.log(newUser);

        // Add the new user to the array
        allUsers["user"+req.query["user"]] = newUser;

        // Write the updated object back to the file
        fs.writeFile(__dirname + "/data/" + "users.json", JSON.stringify(allUsers, null, 2), 'utf8', function(err) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('User added successfully');
                res.json(allUsers); // Send the newly added user as the response
            }
        });
    });
});

