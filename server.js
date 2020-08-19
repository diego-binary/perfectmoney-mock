"use strict";
const fs = require("fs");

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/acct/historycsv.asp",
    handler: (request, h) => {
      const stream = fs.createReadStream("./dummy.csv");
      // const streamData = Buffer.from(stream);
      //   let streamData = new Readable().wrap(stream);
      return h.response(stream).header("Content-Type", "application/csv");
    },
  });
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  //process.exit(1);
});

init();
