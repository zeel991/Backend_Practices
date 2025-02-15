const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
app.use(express.json());

const JSON_SECRET= "Terimaakichut"

const users = []
app.get('/', function(req,res) {
    res.sendFile(__dirname +"/public/index.html")
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: username
        },JSON_SECRET);
        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});


app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })
    res.send({
        message: "You have signed up"
    })
});
function auth(req, res, next) {
    const token = req.headers.token;

    if (token) {
        jwt.verify(token, JSON_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}
app.get('/me',auth ,(req,res) => {
    const token = req.headers.token
    const detail = jwt.verify(token,JSON_SECRET)
    const username = detail.username

    const user = users.find(user => user.username === username);

    if(user){
        res.send({
            username: user.username
        })
    }
})

app.listen(3000);