
import { App } from './app.js';
import { Card } from './card.js';
import chalk from 'chalk';
import { Color, TypeLine, Rarity } from './enums.js';
import { ManagerServer } from './managerserver.js';
import express from 'express';


const cardAppInstance = new App();

const server = express();

server.use(express.json());

// Implementation for the GET request
server.get('/cards', (req, res) => {
  // If the user is not provided, return an error
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }
  // If the id is not provided, return an error
  if (!req.query.id) {
    res.send({
      status: '[ERROR]',
      message: 'Id is required',
    });
    return;
  } else {
    // Try to show the card
    cardAppInstance.showCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      // If the callback returns an error, return that error
      if (error) {
        console.log("HUBO UN ERROR");
        res.send({
          status: '[ERROR]',
          message: `${error}`,
        });
        return;
      }
      // If the callback returns a result, return that result
      res.send({
        status: '[OK]',
        message: result,
      });
    });
    return;
  }
  });

// Implementation for the POST request
server.post('/cards', (req, res) => {
  // If the user is not provided, return an error
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }
  // Create a new card with the information provided in the body
  const new_card = new Card(req.body.id as number, req.body.name as string, req.body.manaCost as number, Color[req.body.color as keyof typeof Color], TypeLine[req.body.typeLine as keyof typeof TypeLine], Rarity[req.body.rarity as keyof typeof Rarity], req.body.text as string, req.body.value as number, req.body.strength as number, req.body.endurance as number, req.body.loyaltyMark as number);
  // Try to add the card
  cardAppInstance.addCard(req.query.user as string, new_card, (error, result) => {
    // If the callback returns an error, return that error
    if (error) {
      res.send({
        status: '[ERROR]',
        message: error,
      });
      return;
    }
    // If the callback returns a result, inform that the card was added successfully
    res.send({
      status: '[OK]',
      message: `Card with id '${req.body.id}' added to user '${req.query.user}'`,
    });
  });

});

// Implementation for the DELETE request
server.delete('/cards', (req, res) => {
  // If the user is not provided, return an error
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }
  // If the id is not provided, return an error
  if (!req.query.id) {
    res.send({
      status: '[ERROR]',
      message: 'Id is required',
    });
    return;
  } else {
    // Try to remove the card
    cardAppInstance.removeCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      // If the callback returns an error, return that error
      if (error) {
        res.send({
          status: '[ERROR]',
          message: error,
        });
        return;
      }
      // If the callback returns a result, inform that the card was removed successfully
      res.send({
        status: '[OK]',
        message: 'Card removed successfully',
      });
    });
    return;
  }
  });

// Implementation for the PATCH request
server.patch('/cards', (req, res) => {
  // If the user is not provided, return an error
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }
  // If the id is not provided, return an error
  if (!req.query.id) {
    res.send({
      status: '[ERROR]',
      message: 'Id is required',
    });
    return;
  } else {
    // Try to modify the card
    cardAppInstance.modifyCard(req.query.user as string, parseInt(req.query.id as string), req.body, (error, result) => {
      // If the callback returns an error, return that error
      if (error) {
        res.send({
          status: '[ERROR]',
          message: error,
        });
        return;
      }
      // If the callback returns a result, inform that the card was modified successfully
      res.send({
        status: '[OK]',
        message: 'Card modified successfully',
      });
    });
    return;
  }
  });

// Make the server listen on port 3000
server.listen(3000, () => {
  console.log(chalk.green('[INFO]: Server listening on port 3000'));
});