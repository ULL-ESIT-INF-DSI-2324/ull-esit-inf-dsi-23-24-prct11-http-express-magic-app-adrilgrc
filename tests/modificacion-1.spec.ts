import "mocha";
import { expect } from "chai";
import chalk from "chalk";
import { App } from "../src/modificacion-1/app.js";
import { Card } from "../src/modificacion-1/card.js";
import { Color, TypeLine, Rarity } from "../src/modificacion-1/enums.js";

describe("Modification", () => {
  const appInstance = new App();
  context("Testing to add and delete card Life Cycle. Includes errors.", () => {
    it("Add card 1 to usermod", () => {
      let new_card = new Card(1, 'Modification Card Example 1', 1, Color.White, TypeLine.Land, Rarity.Common, 'Test Card', 2);
			return appInstance.addCard("usermod1", new_card).then((res) => {
				expect(res).to.equal("[OK]: Card added successfully");
			});
    });
    it("Delete card 1 to usermod", () => {
      return appInstance.removeCard("usermod1", 1).then((res) => {
        expect(res).to.equal("[OK]: Card removed successfully.");
      });
    });
    it("Delete non existing card 1 to usermod", () => {
      return appInstance.removeCard("usermod1", 1).catch((res) => {
        expect(res).to.equal(`[ERROR]: Could not remove the card: ENOENT: no such file or directory, access './collections/usermod1/1.json'`);
      });
    });
  });
  context("Testing to add and delete card Life Cycle 2. Includes errors.", () => {
    it("Add card 1 to usermod", () => {
      let new_card = new Card(0, 'Modification Card Example 1', 1, Color.White, TypeLine.Land, Rarity.Common, 'Test Card', 2);
			return appInstance.addCard("usermod1", new_card).then((res) => {
				expect(res).to.equal("[OK]: Card added successfully");
			});
    });
    it("Delete card 1 to usermod", () => {
      return appInstance.removeCard("usermod1", 0).then((res) => {
        expect(res).to.equal("[OK]: Card removed successfully.");
      });
    });
    it("Delete non existing card 1 to usermod", () => {
      return appInstance.removeCard("usermod1", 0).catch((res) => {
        expect(res).to.equal(`[ERROR]: Could not remove the card: ENOENT: no such file or directory, access './collections/usermod1/0.json'`);
      });
    });
  });
  context("Testing to add cards that already exists", () => {
    it("Add card 1 to usermod", () => {
      let new_card = new Card(0, 'Modification Card Example 1', 1, Color.White, TypeLine.Land, Rarity.Common, 'Test Card', 2);
			return appInstance.addCard("usermod1", new_card).then((res) => {
				expect(res).to.equal("[OK]: Card added successfully");
			});
    });
    it("Add card 1 again to usermod", () => {
      let new_card = new Card(0, 'Modification Card Example 1', 1, Color.White, TypeLine.Land, Rarity.Common, 'Test Card', 2);
			return appInstance.addCard("usermod1", new_card).catch((res) => {
				expect(res).to.equal("[ERROR]: Card exists");
			});
    });
    it("Delete card 1 to usermod", () => {
      return appInstance.removeCard("usermod1", 0).then((res) => {
        expect(res).to.equal("[OK]: Card removed successfully.");
      });
    });
  });
  context("Testing to add cards that already exists", () => {
    it("Add card 1 to usermod", () => {
      let new_card = new Card(0, 'Modification Card Example 1', 1, Color.White, TypeLine.Land, Rarity.Common, 'Test Card', 2);
			return appInstance.addCard("usermod1", new_card).then((res) => {
				expect(res).to.equal("[OK]: Card added successfully");
			});
    });
    it("Add card 1 again to usermod", () => {
      let new_card = new Card(0, 'Modification Card Example 1', 1, Color.White, TypeLine.Land, Rarity.Common, 'Test Card', 2);
			return appInstance.addCard("usermod1", new_card).catch((res) => {
				expect(res).to.equal("[ERROR]: Card exists");
			});
    });
    it("Delete card 1 to usermod", () => {
      return appInstance.removeCard("usermod1", 0).then((res) => {
        expect(res).to.equal("[OK]: Card removed successfully.");
      });
    });
  });
});