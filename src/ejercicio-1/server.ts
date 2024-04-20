
import { App } from './app.js';
import { Card } from './card.js';
import chalk from 'chalk';
import { Color, TypeLine, Rarity } from './enums.js';
import { ManagerServer } from './managerserver.js';
import express from 'express';


const cardAppInstance = new App();

const server = express();

server.use(express.json());

server.get('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }

  if (!req.query.id) {
    res.send({
      status: '[ERROR]',
      message: 'Id is required',
    });
    return;
  } else {
    cardAppInstance.showCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      if (error) {
        console.log("HUBO UN ERROR");
        res.send({
          status: '[ERROR]',
          message: `${error}`,
        });
        return;
      }
      res.send({
        status: '[OK]',
        message: result,
      });
    });
    return;
  }
  });

server.post('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }
  console.log(req.body);
  //                new Card(argv.id, argv.name, argv.manaCost, Color[argv.color as keyof typeof Color], TypeLine[argv.typeLine as keyof typeof TypeLine] , Rarity[argv.rarity as keyof typeof Rarity], argv.text, argv.value, argv.strength, argv.endurance, argv.loyaltyMark);
  const new_card = new Card(req.body.id as number, req.body.name as string, req.body.manaCost as number, Color[req.body.color as keyof typeof Color], TypeLine[req.body.typeLine as keyof typeof TypeLine], Rarity[req.body.rarity as keyof typeof Rarity], req.body.text as string, req.body.value as number, req.body.strength as number, req.body.endurance as number, req.body.loyaltyMark as number);
  cardAppInstance.addCard(req.query.user as string, new_card, (error, result) => {
    if (error) {
      res.send({
        status: '[ERROR]',
        message: error,
      });
      return;
    }
    res.send({
      status: '[OK]',
      message: `Card with id '${req.body.id}' added to user '${req.query.user}'`,
    });
  });

});

server.delete('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }

  if (!req.query.id) {
    res.send({
      status: '[ERROR]',
      message: 'Id is required',
    });
    return;
  } else {
    cardAppInstance.removeCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      if (error) {
        res.send({
          status: '[ERROR]',
          message: error,
        });
        return;
      }
      res.send({
        status: '[OK]',
        message: 'Card removed successfully',
      });
    });
    return;
  }
  });

server.patch('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      status: '[ERROR]',
      message: 'User is required',
    });
  return;
  }

  if (!req.query.id) {
    res.send({
      status: '[ERROR]',
      message: 'Id is required',
    });
    return;
  } else {
    cardAppInstance.modifyCard(req.query.user as string, parseInt(req.query.id as string), req.body, (error, result) => {
      if (error) {
        res.send({
          status: '[ERROR]',
          message: error,
        });
        return;
      }
      res.send({
        status: '[OK]',
        message: 'Card modified successfully',
      });
    });
    return;
  }
  });


server.listen(3000, () => {
  console.log(chalk.green('[INFO]: Server listening on port 3000'));
});