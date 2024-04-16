import fs from "fs";
import chalk from "chalk";
import { Card } from "./card.js";
import { getColorText } from "./utils.js";
import path from "path";

const collectionsDir = `./collections/`;

/**
 * Class that represents the App of the card collection
 */
export class App {
  constructor() {
    console.log("App is running");
  }
  /**
   * Method to create a new user collection
   * Example: node ./dist/commands.js add adrilgrc --
   *
   * @param user to create a collection for
   * @param card to add to the collection
   * @returns 0 if succesful, 1 if could not
   */
  addCard(
    user: string,
    card: Card,
    callback: (error: Error | undefined, result?: number) => void,
): void {
    // User collection directory
    const userCollectionDir = path.join(collectionsDir, user);

    // Verify if the user collection directory exists
    const cardRoute = path.join(userCollectionDir, `${card.id}.json`);

    // 
    fs.access(cardRoute, fs.constants.F_OK, (err) => {
        if (!err) {
            // If the file already exists, show an error
            const error = new Error(`[ERROR]: Card ${card.id} already exists for user ${user}`);
            console.error(`[ERROR]: ${error.message}`);
            callback(error);
        } else {
            // If the file does not exist, write the card data to a new file
            fs.writeFile(cardRoute, JSON.stringify(card), (err) => {
                if (err) {
                    // If an error occurs while writing the file, show an error
                    console.error(
                        `[ERROR]: Failed to add card ${card.id} for ${user}: ${err.message}`,
                    );
                    callback(err);
                } else {
                    // If the file was written successfully, show a success message
                    console.log(`[OK]: Card ${card.id} added to ${user} collection`);
                    callback(undefined, 0);
                }
            });
        }
    });
}

  /**
   * Method to remove a card from a user collection
   *
   * @param user to remove the card from
   * @param cardId to remove from the collection
   * @returns 0 if succesful, 1 if could not
   */
  removeCard(
    user: string,
    cardId: number,
    callback: (error: Error | undefined, result?: number) => void,
  ): void {
    // User collection directory
    const userCollectionDir = collectionsDir + user + "/";
    // Card file route
    const cardRoute = userCollectionDir + cardId + ".json";
    // Verify if the user collection directory exists
    fs.access(userCollectionDir, fs.constants.F_OK, (err) => {
      if (err) {
        // If the directory does not exist, show an error
        console.error(`[ERROR]: User ${user} does not exist`);
        callback(new Error(`[ERROR]: User ${user} does not exist`), 1);
      } else {
        //  If the directory exists, verify if the card file exists
        fs.access(cardRoute, fs.constants.F_OK, (err) => {
          if (err) {
            // If the file does not exist, show an error
            console.error(`[ERROR]: Card ${cardId} does not exist`);
            callback(new Error(`[ERROR]: Card ${cardId} does not exist`), 1);
          } else {
            // If the file exists, remove it
            fs.unlink(cardRoute, (err) => {
              if (err) {
                // If an error occurs while removing the file, show an error
                console.error(
                  `[ERROR]: Failed to remove card ${cardId}: ${err.message}`,
                );
                callback(err, 1);
              } else {
                // If the file was removed successfully, show a success message
                console.log(
                  `[OK]: Card ${cardId} removed from ${user} collection`,
                );
                callback(undefined, 0);
              }
            });
          }
        });
      }
    });
  }

  /**
   * Method to modify a card from a user collection
   *
   * @param user to modify the card from
   * @param cardId to modify from the collection
   * @param attributes to modify
   * @returns 0 if succesful, 1 if could not
   */
  modifyCard(user: string, cardId: number, new_card: Card, callback: (error: Error | null, result?: number) => void): void {
    const userCollectionDir = path.join(collectionsDir, user);
    const cardRoute = path.join(userCollectionDir, `${cardId}.json`);
    // Verify if the user collection directory exists
    fs.access(userCollectionDir, fs.constants.F_OK, (err) => {
      if (err) {
        // If the directory does not exist, show an error
        const errorMessage = `[ERROR]: User ${user} does not exist`;
        console.error(chalk.red(errorMessage));
        callback(new Error(errorMessage), 1);
      } else {
        // If the directory exists, verify if the card file exists
        fs.access(cardRoute, fs.constants.F_OK, (err) => {
          if (err) {
            // If the file does not exist, show an error
            const errorMessage = `[ERROR]: Card ${cardId} does not exist`;
            console.error(chalk.red(errorMessage));
            callback(new Error(errorMessage), 1);
          } else {
            //  If the file exists, remove it
            fs.unlink(cardRoute, (err) => {
              if (err) {
                const errorMessage = `[ERROR]: Failed to remove card ${cardId}: ${err.message}`;
                console.error(chalk.red(errorMessage));
                callback(new Error(errorMessage), 1);
              } else {
                // Write the modified card to a new file
                fs.writeFile(cardRoute, JSON.stringify(new_card), (err) => {
                  if (err) {
                    const errorMessage = `[ERROR]: Failed to write modified card ${cardId}: ${err.message}`;
                    console.error(chalk.red(errorMessage));
                    callback(new Error(errorMessage), 1);
                  } else {
                    // If the file was written successfully, show a success message
                    console.log(chalk.green(`[OK]: Card ${cardId} modified`));
                    callback(null, 0);
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  /**
   * Method to list all cards from a user collection
   *
   * @param user to list the cards from
   * @returns the string with the cards information
   */
  ListCards(user: string): (string | undefined) {
    // User collection directory
    const userCollectionDir = `${collectionsDir}${user}/`;
    // Check if the user collection exists. If not, shows an error.
    if (!fs.existsSync(userCollectionDir)) {
      let errorMessage = `[ERROR]: User ${user} does not exist`;
      console.log(chalk.red(errorMessage));
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
  showCard(user: string, cardId: number, callback: (error: Error | undefined, result?: string) => void): void {
    // User collection directory
    const userCollectionDir = collectionsDir + user + '/';
    // Card file route
    const cardRoute = userCollectionDir + cardId + '.json';
    // First, check if the user collection directory exists
    fs.access(cardRoute, fs.constants.F_OK, (err) => {
        if (err) {
            // If the directory does not exist, show an error
            let errorMessage = `[ERROR]: Card ${cardId} does not exist`;
            console.error(chalk.red(errorMessage));
            callback(new Error(errorMessage));
        } else {
            // If the directory exists, read the card data from the file
            fs.readFile(cardRoute, 'utf-8', (err, cardData) => {
                if (err) {
                    let errorMessage = `[ERROR]: Failed to read card data from file ${cardId}: ${err.message}`;
                    console.error(`[ERROR]: Failed to read card data from file ${cardId}: ${err.message}`);
                    callback(new Error(errorMessage));
                } else {
                    // Parse the card data to a JSON object
                    const card = JSON.parse(cardData);
                    // Create the result string with the card information
                    let result = `------ ${chalk.bold('Card')} ------\n`;
                    for (const [key, value] of Object.entries(card)) {
                        if (key === '_color') {
                            // Handle the _color property
                            result += `${chalk.bold(key)}: ${getColorText(value as string)}\n`;
                        } else {
                            // Handle the rest of the properties
                            result += `${chalk.bold(key)}: ${value}\n`;
                        }
                    }
                    result += `------------------\n`;
                    // Return the result string by calling the callback
                    callback(undefined, result);
                }
            });
        }
    });
  }
}
