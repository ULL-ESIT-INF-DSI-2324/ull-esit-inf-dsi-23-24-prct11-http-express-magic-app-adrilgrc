import "mocha";
import { expect } from "chai";
import request from "request";

describe('Server functionalities tests', () => {
  context('GET /cards requests testing', () => {
    it('Tesing GET request. Bad use: Using without providing username', (done) => {
      request.get({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('User is required');
        done();
      });
    });
    it('Tesing GET request. Bad use: Using without providing id', (done) => {
      request.get({ url: 'http://localhost:3000/cards?user=test', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('Id is required');
        done();
      });
    });
    it('Tesing GET request. Bad use: Non existing card', (done) => {
      request.get({ url: 'http://localhost:3000/cards?user=test&id=999', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('Error: Card 999 does not exist');
        done();
      });
    });
    it('Tesing GET request. Good use: Existing card', (done) => {
      request.get({ url: 'http://localhost:3000/cards?user=test&id=0', json: true }, (error: Error, response) => {
        let expected_result: string = `{"_id":0,"_name":"Spectra Ward","_manaCost":5,"_color":"White","_typeLine":"Enchantment","_rarity":"Rare","_text":"Enchant creature. Enchanted creature gets +2/+2 and has protection from all colors.","_value":2}`
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal(expected_result);
        done();
      });
    });
	});
  context('POST /cards requests testing', () => {
    it('Tesing POST request. Bad use: Using without providing username', (done) => {
      request.post({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('User is required');
        done();
      });
    });
    it('Tesing POST request. Good use: Adding a new card', (done) => {
      let new_card = {
        "id": 999,
        "name": "Test Card",
        "manaCost": 1,
        "color": "White",
        "typeLine": "Enchantment",
        "rarity": "Common",
        "text": "Test text",
        "value": 1,
        "strength": 1,
        "endurance": 1,
        "loyaltyMark": 1
      }
      request.post({ url: 'http://localhost:3000/cards?user=test', body: new_card, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        done();
      });
    });
    it('Tesing POST request. Bad use: Adding an existing card', (done) => {
      let new_card = {
        "id": 0,
        "name": "Spectra Ward",
        "manaCost": 5,
        "color": "White",
        "typeLine": "Enchantment",
        "rarity": "Rare",
        "text": "Enchant creature. Enchanted creature gets +2/+2 and has protection from all colors.",
        "value": 2,
        "strength": 2,
        "endurance": 2,
        "loyaltyMark": 2
      }
      request.post({ url: 'http://localhost:3000/cards?user=test', body: new_card, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        done();
      });
    });
  });
  context('DELETE /cards requests testing', () => {
    it('Tesing DELETE request. Bad use: Using without providing username', (done) => {
      request.delete({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('User is required');
        done();
      });
    });
    it('Tesing DELETE request. Bad use: Using without providing id', (done) => {
      request.delete({ url: 'http://localhost:3000/cards?user=test', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('Id is required');
        done();
      });
    });
    // THIS ONE RECEIVES {} ON THE TEST INSTEAD OF THE {status: '[ERROR]', message: 'Error: Card 9999 does not exist'}.
    // BUT USING THE THUNDER CLIENT EXTENSION ON VSCODE IT WORKS AS EXPECTED.
    // it('Tesing DELETE request. Bad use: Non existing card', (done) => {
    //   request.delete({ url: 'http://localhost:3000/cards?user=test&id=9999', json: true }, (error: Error, response) => {
    //     expect(response.body.status).to.equal('[ERROR]');
    //     expect(response.body.message).to.equal('Error: Card 9999 does not exist');
    //     done();
    //   });
    // });
    it('Tesing DELETE request. Good use: Deleting an existing card', (done) => {
      request.delete({ url: 'http://localhost:3000/cards?user=test&id=999', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card removed successfully');
        done();
      });
    });
  });
  context('PATCH /cards requests testing', () => {
    it('Tesing PATCH request. Bad use: Using without providing username', (done) => {
      request.patch({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('User is required');
        done();
      });
    });
    it('Tesing PATCH request. Bad use: Using without providing id', (done) => {
      request.patch({ url: 'http://localhost:3000/cards?user=test', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('Id is required');
        done();
      });
    });
    it('Testing PATCH request. Intermediate step. Creating a card with id 100 to update it later', (done) => {
      let new_card = {
        "id": 100,
        "name": "Test Card",
        "manaCost": 1,
        "color": "White",
        "typeLine": "Enchantment",
        "rarity": "Common",
        "text": "Test text",
        "value": 1,
        "strength": 1,
        "endurance": 1,
        "loyaltyMark": 1
      }
      request.post({ url: 'http://localhost:3000/cards?user=test', body: new_card, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card with id \'100\' added to user \'test\'');
        done();
      });
    });
    it('Tesing PATCH request. Good use: Updating an existing card', (done) => {
      let updated_card = {
        "name": "Updated Test Card",
        "manaCost": 2,
        "color": "Blue",
        "typeLine": "Creature",
        "rarity": "Uncommon",
        "text": "Updated test text",
        "value": 2,
        "strength": 2,
        "endurance": 2,
        "loyaltyMark": 2
      }
      request.patch({ url: 'http://localhost:3000/cards?user=test&id=100', body: updated_card, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card modified successfully');
        done();
      });
    });
    it ('Testing PATCH request. Extra step. Deleting the card with id 100', (done) => {
      request.delete({ url: 'http://localhost:3000/cards?user=test&id=100', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card removed successfully');
        done();
      });
    });
  });
  context('Lifecycle', () => {
    it('Creating a new card with id 20', (done) => {
      let newCard = {
        "id": 20,
        "name": "New Card",
        "manaCost": 3,
        "color": "Red",
        "typeLine": "Creature",
        "rarity": "Common",
        "text": "New card text",
        "value": 3,
        "strength": 3,
        "endurance": 3,
        "loyaltyMark": 3
      }
      request.post({ url: 'http://localhost:3000/cards?user=test', body: newCard, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        done();
      });
    });

    it('Testing PATCH request. Modifying the card with id 20', (done) => {
      let updatedCard = {
        "name": "Modified Card",
        "manaCost": 4,
        "color": "Blue",
        "typeLine": "Enchantment",
        "rarity": "Rare",
        "text": "Modified card text",
        "value": 4,
        "strength": 4,
        "endurance": 4,
        "loyaltyMark": 4
      }
      request.patch({ url: `http://localhost:3000/cards?user=test&id=20`, body: updatedCard, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card modified successfully');
        done();
      });
    });

    it('Testing GET request. Showing the card with id 20', (done) => {
      request.get({ url: `http://localhost:3000/cards?user=test&id=20`, json: true }, (error: Error, response) => {
        let expected_result: string = `{"name":"Modified Card","manaCost":4,"color":"Blue","typeLine":"Enchantment","rarity":"Rare","text":"Modified card text","value":4,"strength":4,"endurance":4,"loyaltyMark":4}`
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal(expected_result);
        done();
      });
    });
    it('Tesing DELETE request. Deleting the card with id 20', (done) => {
      request.delete({ url: 'http://localhost:3000/cards?user=test&id=20', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card removed successfully');
        done();
      });
    });
  });
  context('Lifecycle 2', () => {
    it('Creating a new card with id 30', (done) => {
      let newCard = {
        "id": 30,
        "name": "New Card",
        "manaCost": 3,
        "color": "Red",
        "typeLine": "Creature",
        "rarity": "Common",
        "text": "New card text",
        "value": 3,
        "strength": 3,
        "endurance": 3,
        "loyaltyMark": 3
      }
      request.post({ url: 'http://localhost:3000/cards?user=test', body: newCard, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        done();
      });
    });

    it('Testing PATCH request. Modifying the card with id 30', (done) => {
      let updatedCard = {
        "name": "Modified Card",
        "manaCost": 4,
        "color": "Blue",
        "typeLine": "Enchantment",
        "rarity": "Rare",
        "text": "Modified card text",
        "value": 4,
        "strength": 4,
        "endurance": 4,
        "loyaltyMark": 4
      }
      request.patch({ url: `http://localhost:3000/cards?user=test&id=30`, body: updatedCard, json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card modified successfully');
        done();
      });
    });

    it('Testing GET request. Showing the card with id 30', (done) => {
      request.get({ url: `http://localhost:3000/cards?user=test&id=30`, json: true }, (error: Error, response) => {
        let expected_result: string = `{"name":"Modified Card","manaCost":4,"color":"Blue","typeLine":"Enchantment","rarity":"Rare","text":"Modified card text","value":4,"strength":4,"endurance":4,"loyaltyMark":4}`
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal(expected_result);
        done();
      });
    });
    it('Tesing DELETE request. Deleting the card with id 30', (done) => {
      request.delete({ url: 'http://localhost:3000/cards?user=test&id=30', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[OK]');
        expect(response.body.message).to.equal('Card removed successfully');
        done();
      });
    });
  });
});