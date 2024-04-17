import { EventEmitter } from 'events'
import net from 'net'

/**
 * Class that represents the server that manages the card collection.
 * It listens for incoming connections and emits a 'request' event when a new request is received.
 *
 */
export class ManagerServer extends EventEmitter {
  private _server: net.Server;
  /**
   * Constructor that creates a new server instance.
   * It listens for incoming connections and emits a 'request' event when a new request is received.
   */
  constructor() {
    super();
    // Create a new server instance
    this._server = net.createServer(
      (connection) => {
        // Once a client connects, listen for incoming data
        console.log('[INFO]: Client connected');
        // Split the incoming data and wait for the end of the message
        // which is marked by a newline character.
        let wholeData: string = '';
        connection.on('data', (dataChunk) => {
          wholeData += dataChunk.toString();
          // Once the message is complete, parse it and emit a 'request' event
          if (wholeData.endsWith('\n')) {
            wholeData.slice(0, -1);
            let request = JSON.parse(wholeData);
            // The request is an object with the following properties:
            // - command: string
            // - user: string
            // - card: Card
            // - id: number
            // Emit the 'request' event with the request object and the connection
            this.emit('request', request, connection);
          }
        });
        // When the client disconnects, log it
        connection.on('end', () => {
          console.log('[INFO]: Client disconnected');
        });
      }
    );
    // The server keeps listening on port 60300
    this._server.listen(60300, () => {
      console.log('[INFO]: Server listening on port 60300. Waiting for connections...');
    });
    
  }
  get server(): net.Server {
    return this._server;
  }
}