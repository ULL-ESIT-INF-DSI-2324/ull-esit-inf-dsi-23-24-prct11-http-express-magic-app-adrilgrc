import "mocha";
import { expect } from "chai";
import chalk from "chalk";
import { App } from "../src/modificacion-1/app.js";
import { Card } from "../src/modificacion-1/card.js";
import { Color, TypeLine, Rarity } from "../src/modificacion-1/enums.js";

describe('Card Application tests', () => {  
  context('Life cycle test 1. Good values.', () => {
    let appInstance = new App();
    it('Test addCard Creature 1', () => {
        let card = new Card(1, 'Test Card', 1, Color.White, TypeLine.Creature, Rarity.Common, 'Test Card', 1, 1, 1);
        expect(appInstance.addCard('test', card)).to.deep.equal(0);
    });
    
    it("Delete card with id 1 async", (done) => {
      expect(appInstance.removeCardASYNC("test", 1, (_,data) => {
        if (data) {
          expect(data).to.equal(`${(chalk.green(`[OK]: Card 1 removed from test collection`))}`);
          done();
        }
      }))
    });

    it("Delete card with id 1 async", (done) => {
      expect(appInstance.removeCardASYNC("test", 1, (error,_) => {
        if (error) {
          expect(error).to.equal(`${(chalk.red(`[ERROR]: Card 1 does not exist`))}`);
          done();
        }
      }))
    });
      
  });
  
}); 