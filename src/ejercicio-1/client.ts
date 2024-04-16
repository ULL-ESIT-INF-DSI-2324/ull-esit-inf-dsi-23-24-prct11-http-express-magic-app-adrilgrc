import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Card } from './card.js';
import { Color, TypeLine, Rarity } from './enums.js';
import net from 'net';


// const appInstance = new App();
const connection = net.connect({ port: 60300 });

/**
 * Command line interface to manage the card collection. The commands are:
 * 
 * add: Adds a card to the collection
 * remove: Removes a card from the collection
 * modify: Modifies a card from the collection
 * list: List all cards from a user collection
 * show: Show card details
 */
yargs(hideBin(process.argv))
  /**
   * Command to add a card to the collection. Example use:
   * node dist/runManager.js add --user adrilgrc --id 0 --name "Spectra Ward" --manaCost 5 --color "White" --typeLine "Enchantment" --rarity "Rare" --text "Enchant creature. Enchanted creature gets +2/+2 and has protection from all colors." --value 2
   */
  .command('add', 'Adds a card to the collection', {
  user: {
    description: 'User name',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'Card ID',
    type: 'number',
    demandOption: true
  },
  name: {
    description: 'Card Name',
    type: 'string',
    demandOption: true
  },
  manaCost: {
    description: 'Card Mana Cost',
    type: 'number',
    demandOption: true
  },
  color: {
    description: 'Card Color',
    type: 'string',
    demandOption: true,
    choices: Object.keys(Color)
  },
  typeLine: {
    description: 'Card Type Line',
    type: 'string',
    demandOption: true,
    choices: Object.keys(TypeLine)
  },
  rarity: {
    description: 'Card Rarity',
    type: 'string',
    demandOption: true,
    choices: Object.keys(Rarity)
  },
  text: {
    description: 'Card Text',
    type: 'string',
    demandOption: true
  },
  strength: {
    description: 'Card Strength',
    type: 'number',
    demandOption: false
  },
  endurance: {
    description: 'Card Endurance',
    type: 'number',
    demandOption: false
  },
  loyaltyMark: {
    description: 'Card Loyalty Mark',
    type: 'number',
    demandOption: false
  },
  value: {
    description: 'Card Value',
    type: 'number',
    demandOption: true
  }
 }, (argv) => {
  const new_card = new Card(argv.id, argv.name, argv.manaCost, Color[argv.color as keyof typeof Color], TypeLine[argv.typeLine as keyof typeof TypeLine] , Rarity[argv.rarity as keyof typeof Rarity], argv.text, argv.value, argv.strength, argv.endurance, argv.loyaltyMark);
  connection.write(JSON.stringify({command: 'add', user: argv.user, card: new_card}) + '\n');
 })
 /**
  * Command to remove a card from the collection. Example use:
  * node dist/ejercicio-1/runManager.js remove --user adrilgrc --id 0
  */
 .command('remove', 'Removes a card from the collection', {
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'Card ID',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    connection.write(JSON.stringify({command: 'remove', user: argv.user, id: argv.id}) + '\n');
  })
  /**
   * Command to modify a card from the collection. Example use:
   * node dist/ejercicio-1/runManager.js modify --user adrikbps --id 0 --name "Spectra Ward" --manaCost 5 --color "White" --typeLine "Enchantment" --rarity "Rare" --text "Enchant creature. Enchanted creature gets +2/+2 and has protection from all colors." --value 2
   */
  .command('modify', 'Modifies a card', {
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'Card ID',
      type: 'number',
      demandOption: true
    },
    name: {
      description: 'Card Name',
      type: 'string',
      demandOption: true
    },
    manaCost: {
      description: 'Card Mana Cost',
      type: 'number',
      demandOption: true
    },
    color: {
      description: 'Card Color',
      type: 'string',
      demandOption: true,
      choices: Object.keys(Color)
    },
    typeLine: {
      description: 'Card Type Line',
      type: 'string',
      demandOption: true,
      choices: Object.keys(TypeLine)
    },
    rarity: {
      description: 'Card Rarity',
      type: 'string',
      demandOption: true,
      choices: Object.keys(Rarity)
    },
    text: {
      description: 'Card Text',
      type: 'string',
      demandOption: true
    },
    strength: {
      description: 'Card Strength',
      type: 'number',
      demandOption: false
    },
    endurance: {
      description: 'Card Endurance',
      type: 'number',
      demandOption: false
    },
    loyaltyMark: {
      description: 'Card Loyalty Mark',
      type: 'number',
      demandOption: false
    },
    value: {
      description: 'Card Value',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    const new_card = new Card(argv.id, argv.name, argv.manaCost, Color[argv.color as keyof typeof Color], TypeLine[argv.typeLine as keyof typeof TypeLine] , Rarity[argv.rarity as keyof typeof Rarity], argv.text, argv.value, argv.strength, argv.endurance, argv.loyaltyMark);
    connection.write(JSON.stringify({command: 'modify', id: argv.id, user: argv.user, card: new_card}) + '\n');
  })
  /**
   * Command to list all cards from a user collection. Example use:
   * node dist/ejercicio-1/runManager.js list --user adrilgrc
   */
  .command('list', 'List all cards from a user collection', {
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true
    }
  }, (argv) => {
    connection.write(JSON.stringify({command: 'list', user: argv.user}) + '\n');
  })
  /**
   * Command to show card details. Example use:
   * node dist/ejercicio-1/runManager.js show --user adrilgrc --id 0
   */
  .command('show', 'Show card details', {
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'Card ID',
      type: 'number',
      demandOption: true
      },
    }, (argv) => {
      connection.write(JSON.stringify({command: 'show', user: argv.user, id: argv.id}) + '\n');
    })
 .help()
 .argv;

let wholeData = '';
connection.on('data', (data) => {
  wholeData += data;
});

connection.on('error', (error) => {
  console.log('[ERROR]:', error.message);
});

connection.on('end', () => {
  console.log(wholeData);
});

connection.on('close', () => {
  console.log('[INFO]: Connection closed');
});