
import { App } from './app.js';
import { Card } from './card.js';
import chalk from 'chalk';
import { Color, TypeLine, Rarity } from './enums.js';
import { ManagerServer } from './managerserver.js';


const cardAppInstance = new App();
const managerServerInstance = new ManagerServer();


/**
 * Listener for the 'request' event
 */
managerServerInstance.on('request', (request, connection) => {
  console.log('[INFO]: Request received:', request);
  let new_card: Card;
  switch (request.command) {
    case 'add':
      // Create a new Card instance with the request data
      new_card = new Card(
        request.card._id,
        request.card._name,
        request.card._manaCost,
        Color[request.card._color as keyof typeof Color],
        TypeLine[request.card._typeLine as keyof typeof TypeLine],
        Rarity[request.card._rarity as keyof typeof Rarity],
        request.card._text,
        request.card._value,
        request.card._strength,
        request.card._endurance,
        request.card._loyaltyMark
      );
      // Then call addCard with the user, the new card and a callback
      cardAppInstance.addCard(request.user, new_card, (err, result) => {
        if (err) {
          connection.write(chalk.red(`${err.message}`));
        } else {
          connection.write(chalk.green('[OK]: Card added successfully'));
        }
        connection.end();
      });
      break;
    case 'remove':
      // Call removeCard with the user, the card ID and a callback
      cardAppInstance.removeCard(request.user, request.id, (err, result) => {
        if (err) {
          connection.write(chalk.red(`${err.message}`));
        } else {
          connection.write(chalk.green('[OK]: Card removed successfully'));
        }
        connection.end();
      });
      break;
    case 'modify':
      // Create a new Card instance with the request data
      new_card = new Card(
        request.card._id,
        request.card._name,
        request.card._manaCost,
        Color[request.card._color as keyof typeof Color],
        TypeLine[request.card._typeLine as keyof typeof TypeLine],
        Rarity[request.card._rarity as keyof typeof Rarity],
        request.card._text,
        request.card._value,
        request.card._strength,
        request.card._endurance,
        request.card._loyaltyMark
      );
      new_card = new Card(
        request.card._id,
        request.card._name,
        request.card._manaCost,
        Color[request.card._color as keyof typeof Color],
        TypeLine[request.card._typeLine as keyof typeof TypeLine],
        Rarity[request.card._rarity as keyof typeof Rarity],
        request.card._text,
        request.card._value,
        request.card._strength,
        request.card._endurance,
        request.card._loyaltyMark
      );
      cardAppInstance.modifyCard(request.user, request.id, new_card, (error, result) => {
        if (error) {
          connection.write(chalk.red(`${error.message}`));
        } else {
          connection.write(chalk.green('[OK]: Card modified successfully'));
        }
        connection.end();
      });
      break;
    case 'list':
      // Call ListCards with the user and write the result to the connection
      connection.write(cardAppInstance.ListCards(request.user));
      connection.end();
      break;
    case 'show':
      // Show card details
      cardAppInstance.showCard(request.user, request.id, (err, cardInfo) => {
        if (err) {
          connection.write(chalk.red(`[ERROR]: ${err.message}`));
        } else {
          connection.write(cardInfo);
        }
        connection.end();
      });
      break;
    default:
      connection.write('[ERROR]: Invalid command');
      connection.end();
      break;
  }
});