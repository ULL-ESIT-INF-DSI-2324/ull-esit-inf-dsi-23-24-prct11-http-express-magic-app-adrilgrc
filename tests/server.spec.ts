// import "mocha"
// import { expect } from "chai";
// import { App } from "../src/ejercicio-1/app.js";
// import { Card } from "../src/ejercicio-1/card.js";
// import { Color, Rarity, TypeLine } from "../src/ejercicio-1/enums.js";
// import { ManagerServer } from "../src/ejercicio-1/managerserver.js";
// import net from 'net';

// describe('Server', () => {
//   const client = new ManagerServer();
//   it('Test to read the complete request', (done) => {
//     client.server.on('request', (request, _) => {
//       expect(request.command).to.be.eql('show');
//       done();
//     });

//     client.server.emit('data', '{"command":"show","user":"');
//     client.server.emit('data', '"edusegre", "id": 1');
// 	  client.server.emit('data', '\n}');
//     done();
//   });
//   it('Test to read the complete request', (done) => {
//     client.server.on('request', (request, _) => {
//       expect(request.command).to.be.eql('add');
//       done();
//     });

//     client.server.emit('data', '{"command":"add","user":"');
//     client.server.emit('data', '"edusegre", "card":');
//     client.server.emit('data', '{"_id":1,"_name":"card1","_manaCost":1,"_color":0,"_typeLine":0,"_rarity":0,"_text":"text","_value":1,"_strength":1,"_endurance":1,"_loyaltyMark":1}');
//     client.server.emit('data', '\n}');
//     done();
//   });
// });

