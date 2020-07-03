'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

let jokeTriger = false;

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout( () => {
      res.status(200).json({ status: 200, message});
    }, randomTime);
  })

  .get('/monkey-message', (req, res) => {
    const messages = [
      'Don’t monkey around with me.',
      'If you pay peanuts, you get monkeys.',
      'I fling 💩 at you!',
      '🙊',
      '🙈',
      '🙉',
    ];
    const randomTime = Math.random() * 3000;
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = { author: 'monkey', text: messages[randomIndex]};
    setTimeout( () => {
      res.status(200).json( { status: 200, message});
    }, randomTime)
  })

  .get('/parrot-message', (req, res) => {
    const randomTime = Math.random() * 3000;
    const message = {author: 'parrot', text: req.query.messageInput }
    setTimeout( () => {
      res.status(200).json({status: 200, message})
    }, randomTime)
  })


  .get('/bot-message', (req, res) => {
    let myMsgO = req.query.messageInput;
    let myMsg = myMsgO.toLowerCase();
    let botMsg;
    const commonGreetings = ['hi', 'hello', 'howdy'];
    const commonGoodbyes = ['bye', 'see you', 'ciao'];
    const jokes = [
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
      'My wife accused me of being immature. I told her to get out of my fort.',
      'How does Moses make his coffee? Hebrews it.'
    ]
    let randomJoke = jokes[Math.floor(Math.random() * 3)];
    if (myMsg === 'something funny') {
      jokeTriger = true;
      botMsg = 'BZZT WANT A JOKE?';
    } else if ((jokeTriger && myMsg === 'no') || commonGoodbyes.some( elem => myMsg.indexOf(elem) > -1)) {
      jokeTriger = false;
      botMsg = 'BZZT GOODBYE';
    } else if (jokeTriger && myMsg === 'yes') {
      botMsg = `BZZT "${randomJoke}"\nWANT ANOTHER ONE?`;
    } else if (commonGreetings.some( elem => myMsg.indexOf(elem) > -1)) {
      botMsg = 'BZZT HELLO';
    } else {
      botMsg = `BZZT "${myMsgO}"`;
    }
    const message = { author: 'bot', text: botMsg };
    const randomTime = Math.random() * 3000;
    setTimeout( () => {
      res.status(200).json({status: 200, message})
    }, randomTime)
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
