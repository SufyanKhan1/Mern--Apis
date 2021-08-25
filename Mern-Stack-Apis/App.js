const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { listenerCount } = require("./Model/User");

require('./Model/User');

app.use(bodyParser.json());

const UserX = mongoose.model("USERS")

//Login Api
app.get('/Login', async (req, res,next) => {
    try {
        const user = await UserX.find({})
        console.log("LOGGED INNN");
        res.send(user);
    next();
    }
    catch (error) {
        res.status(500)
    }
})

app.post('/Add/Login', async (req, res) => {
    try {
        const user = new UserX();
        user.Username=req.body.Username;
        user.Password=req.body.Password;
        
        await user.save();

        res.send(user);
    }
    catch (error) {
        res.status(500)
    }
})

// @routes DELETE api/posts/:id
// @desc DELETE AN post


app.delete("/user/:USERId", async (request, response) => {
    try {
      const user = await UserX.findByIdAndDelete(request.params.USERId);
  
      if (!user) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });
// api for UPDATE

/* app.patch("/food/:USERId", async (request, response) => {
  try {
    const user = await UserX.findByIdAndUpdate(request.params.USERId);
    await UserX.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});
 */

app.get('/blogs/:id', (req, res) => {
    UserX.findById(req.params.id, req.body, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})


app.patch('/blogs/:id', (req, res) => {
    UserX.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})




// var myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }

// app.use(myLogger)

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.listen(3000)



// @routes DELETE api/posts/:id
// @desc DELETE AN post

mongoose.connect("mongodb+srv://sufyan:123@cluster01.fgxxu.mongodb.net/databasee?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => {
        console.log('Connected to MongoDB');
        server = app.listen(5000, () => {
            console.log("Listening to port: 5000");
        });
    });    // custom middleware create
    
    const LoggerMiddleware = (req,res,next) =>{
        console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
        next();
    }
    
    // application level middleware
    app.use(LoggerMiddleware);



