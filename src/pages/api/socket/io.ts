import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "./types";
import { set } from "zod";
import { Decoder, Encoder, Packet } from "socket.io-parser";
import SuperJSON from "superjson";
import {history} from "./history";
export const config = {
  api: {
    bodyParser: false,
  },
};


const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";



    const httpServer: NetServer = res.socket.server as unknown as  NetServer;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      transports: [ "polling"]
    });
    res.socket.server.io = io;


    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
      

      socket.on("history",()=>{
        console.log("history: " + JSON.stringify(history));
        history.toReversed().forEach((message) => {

          socket.emit("message", message);
        });
      })

      socket.on("message", (message : {content:string,from:string}) => {
        history.push({
          ...message, time: Date.now(),
        });
        io.emit("message", {...message, time: Date.now()});
        console.log("message: " + JSON.stringify(message));
      });


      // setInterval(() => {
      //   socket.emit("message", "Hello from server timed");
      // }, 3000);


    });
  }

  res.end();
}

export default ioHandler;


