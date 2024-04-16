import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';
import { Card } from './card.js'
import { Color, TypeLine, Rarity } from './enums.js';

const collectionsDir = `./collections/`;

/**
 * Class that represents the App of the card collection
 */
export class App {
  constructor() {
    console.log('App is running');
  }
  /**
   * Method to create a new user collection
   * Example: node ./dist/commands.js add adrilgrc --
   * 
   * @param user to create a collection for
   * @param card to add to the collection
   * @returns 0 if succesful, 1 if could not
   */
  addCard(user: string, card: Card): number {
    // Set the directory of the user collection
    const userCollectionDir = `${collectionsDir}${user}/`;
    // Check if the user collection exists. If not, create it.
    if (!fs.existsSync(userCollectionDir)) {
      fs.mkdirSync(userCollectionDir);
    }
    // Set the route of the card to add
    const cardRoute = `${userCollectionDir}${card.id}.json`;
    // Check if the card already exists. If it does, shows an error.
    if (fs.existsSync(cardRoute)) {
      console.log(chalk.red(`[ERROR]: Card ${card.id} already exists`));
      return 1;
    } else {
      // If the card does not exist, write the card data to the file.
      fs.writeFileSync(cardRoute, JSON.stringify(card));
      // Show a success message.
      console.log(chalk.green(`[OK]: Card ${card.id} added to ${user} collection`));
      return 0;
    }
  }

  addCardASYNC(user: string, card: Card, callback: (error: string | undefined, success: string | undefined) => void): number {
    // Set the directory of the user collection
    const userCollectionDir = `${collectionsDir}${user}/`;
    // Check if the user collection exists. If not, create it.
    if (!fs.existsSync(userCollectionDir)) {
      fs.mkdirSync(userCollectionDir);
    }
    // Set the route of the card to add
    const cardRoute = `${userCollectionDir}${card.id}.json`;
    // Check if the card already exists. If it does, shows an error.
    if (fs.existsSync(cardRoute)) {
      console.log(chalk.red(`[ERROR]: Card ${card.id} already exists`));
      return 1;
    } else {
      // If the card does not exist, write the card data to the file.
      fs.writeFileSync(cardRoute, JSON.stringify(card));
      // Show a success message.
      console.log(chalk.green(`[OK]: Card ${card.id} added to ${user} collection`));
      return 0;
    }
  }

  /**
   * Method to remove a card from a user collection
   * 
   * @param user to remove the card from
   * @param cardId to remove from the collection
   * @returns 0 if succesful, 1 if could not
   */
  removeCard(user: string, cardId: number): number {
    // Set the directory of the user collection
    const userCollectionDir = `${collectionsDir}${user}/`;
    // Check if the user collection exists. If not, shows an error.
    if (!fs.existsSync(userCollectionDir)) {
      console.log(chalk.red(`[ERROR]: User ${user} does not exist`));
      return 1;
    }
    // Set the route of the card to remove
    const cardRoute = `${userCollectionDir}${cardId}.json`;
    // Check if the card exists. If not, shows an error.
    if (fs.existsSync(cardRoute)) {
      // If the card exists, remove it by deleting the file.
      fs.unlinkSync(cardRoute);
      console.log(chalk.green(`[OK]: Card ${cardId} removed from ${user} collection`));
      return 0;
    }
    console.log(chalk.red(`[ERROR]: Card ${cardId} does not exist`));
    return 1;
  }


  /**
   * Method to remove a card from a user collection
   * 
   * @param user to remove the card from
   * @param cardId to remove from the collection
   * @returns 0 if succesful, 1 if could not
   */
  removeCardASYNC(user: string, cardId: number, callback: (error: string | undefined, success: string | undefined) => void): void {
    // Set the directory of the user collection
    const userCollectionDir = `${collectionsDir}${user}/`;
    const cardRoute = `${userCollectionDir}${cardId}.json`;
    if (fs.existsSync(cardRoute)) {
      // If the card exists, remove it by deleting the file.
      fs.unlink(cardRoute, (err) => {
        if (err) {
          callback(chalk.red(`[ERROR]: Cannot remove card ${cardId}: ${err.message}`), undefined);
        } else {
          callback(undefined, chalk.green(`[OK]: Card ${cardId} removed from ${user} collection`));
        }
      });
    } else {
      callback(chalk.red(`[ERROR]: Card ${cardId} does not exist`), undefined);
    }
  }

  /**
   * Method to modify a card from a user collection
   * 
   * @param user to modify the card from
   * @param cardId to modify from the collection
   * @param attributes to modify
   * @returns 0 if succesful, 1 if could not
   */
  modifyCard(user: string, cardId: number, new_card: Card): number {
    // Set the directory of the user collection
    const userCollectionDir = `${collectionsDir}${user}/`;
    // Check if the user collection exists. If not, shows an error.
    if (!fs.existsSync(userCollectionDir)) {
      console.log(chalk.red(`[ERROR]: User ${user} does not exist`));
      return 1;
    }
    // Set the route of the card to modify
    const cardRoute = `${userCollectionDir}${cardId}.json`;
    // Check if the card exists. If not, shows an error.
    if (fs.existsSync(cardRoute)) {
      // If the card exists, remove it by deleting the file.
      fs.unlinkSync(cardRoute);
      // Then, write the new card data to the file.
      fs.writeFileSync(cardRoute, JSON.stringify(new_card));
      console.log(chalk.green(`[OK]: Card ${cardId} modified`));
      return 0;
    } else {
      console.log(chalk.red(`[ERROR]: Card ${cardId} does not exist`));
      return 1;
    }
  }

  /**
   * Method to list all cards from a user collection
   * 
   * @param user to list the cards from
   * @returns the string with the cards information
   */
  ListCards(user: string): (string | undefined) {
    // Set the directory of the user collection
    const userCollectionDir = `${collectionsDir}${user}/`;
    // Check if the user collection exists. If not, shows an error.
    if (!fs.existsSync(userCollectionDir)) {
      console.log(chalk.red(`[ERROR]: User ${user} does not exist`));
      return undefined;
    }
    // Get all the files from the user collection directory
    const cardFile = fs.readdirSync(userCollectionDir);
    let result = ""
    // For each file, read the data and parse it to a JSON object
    cardFile.forEach((file) => {
      const cardData = fs.readFileSync(`${userCollectionDir}${file}`, 'utf-8');
      const card = JSON.parse(cardData);
      result += `------ ${chalk.bold("Card")} ------\n`
      // For each key-value pair, show the key in bold and the value
      for (const [key, value] of Object.entries(card)) {
        // If the key is _color, show the color in the corresponding color
        if (key === '_color') {
          result += `${chalk.bold(key)}: `
          if (value === 'White') {
            result += `${chalk.white("White")}\n`
          } else if (value === 'Blue') {
            result += `${chalk.blue("Blue")}\n`
          } else if (value === 'Black') {
            result += `${chalk.black("Black")}\n`
          } else if (value === 'Red') {
            result += `${chalk.red("Red")}\n`
          } else if (value === 'Green') {
            result += `${chalk.green("Green")}\n`
          } else if (value === 'Colorless') {
            result += `${chalk.gray("Colorless")}\n`
          } else if (value === 'Multicolor') {
            result += `${chalk.red("Mul")}${chalk.green("ti")}${chalk.blue("co")}${chalk.yellow("lor")}\n`
          }
        } else {
          result += `${chalk.bold(key)}: ${value}\n`
        }
      }
      result += `------------------\n`
    });
    // Return the result string
    return result;
  }

  /**
   * Method to show a card from a user collection
   * 
   * @param user a string with the user name we want to show the card from
   * @param cardId a number with the card id we want to show
   * @returns the string with the card information or undefined if the card does not exist
   */
  showCard(user: string, cardId: number): (string | undefined) {
    // Set the directory of the user collection
    const userCollectionDir = `${collectionsDir}${user}/`;
    // Check if the user collection exists. If not, shows an error.
    if (!fs.existsSync(userCollectionDir)) {
      console.log(chalk.red(`[ERROR]: User ${user} does not exist`));
      return undefined;
    }
    // Set the route of the card to show
    const cardRoute = `${userCollectionDir}${cardId}.json`;
    // Check if the card exists. If not, shows an error.
    if (fs.existsSync(cardRoute)) {
      // If the card exists, read the data and parse it to a JSON object
      const cardData = fs.readFileSync(cardRoute, 'utf-8');
      const card = JSON.parse(cardData);
      // Create a string with the card information
      let result = `------ ${chalk.bold("Card")} ------\n`
      for (const [key, value] of Object.entries(card)) {
        if (key === '_color') {
          result += `${chalk.bold(key)}: `
          if (value === 'White') {
            result += `${chalk.white("White")}\n`
          } else if (value === 'Blue') {
            result += `${chalk.blue("Blue")}\n`
          } else if (value === 'Black') {
            result += `${chalk.black("Black")}\n`
          } else if (value === 'Red') {
            result += `${chalk.red("Red")}\n`
          } else if (value === 'Green') {
            result += `${chalk.green("Green")}\n`
          } else if (value === 'Colorless') {
            result += `${chalk.gray("Colorless")}\n`
          } else if (value === 'Multicolor') {
            result += `${chalk.red("Mul")}${chalk.green("ti")}${chalk.blue("co")}${chalk.yellow("lor")}\n`
          }
        } else {
          result += `${chalk.bold(key)}: ${value}\n`
        }
      }
      result += `------------------\n`
      // Return the result string
      return result;
    } else {
      // If the card does not exist, shows an error
      console.log(chalk.red(`[ERROR]: Card ${cardId} does not exist`));
    }
    // If the card does not exist, return undefined
    return undefined;
  }
}