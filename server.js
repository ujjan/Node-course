  const express = require('express');
  const hbs = require("hbs");
  const fs = require('fs');

  const port = process.env.PORT || 3000;
  var app = express();

  hbs.registerPartials(__dirname +"/views/partials")
  app.set("view engine", "hbs");


  app.use((req, res, next)=>{

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('newVAlues.log', log + '\n')
    next();
  });

  /*
  app.use( (req, res, next) => {
    res.render("maintenence.hbs", {
      pageTitle: "We are Sorry to keep you wait ...",
      mesagee: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    })
  });

  */

  app.use(express.static(__dirname +"/public"));

  hbs.registerHelper("getCurrentYear", ()=>{

    return new Date().getFullYear();
  });

  hbs.registerHelper("screamIt", (text)=>{

    return text.toUpperCase();
  })


  app.get('/', (req, res) => {

    // res.send('<h1>Hello Express!</h1>');
    res.render("home.hbs", {
      title: "Home PAge",
      pageTitle: "This is Home PAge",
      welcomeMessage: "Hello this is really working i think"

    })
  });

  app.get('/about', (req, res) => {
    res.render("about.hbs", {
      pageTitle: "About Page"
    })
  });


  // /bad - send back json with errorMessage
  app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'Unable to handle request'
    });
  });

  app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
  });

