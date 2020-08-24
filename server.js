"use strict";
const fs = require("fs");

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "0.0.0.0"
  });

  server.route({
    method: "GET",
    path: "/acct/historycsv.asp",
    handler: (request, h) => {
      const stream = fs.createReadStream("./dummy.csv");
      console.log(`path ${JSON.stringify(request.path)}`);
      console.log(`headers ${JSON.stringify(request.headers)}`);
      console.log(`query ${JSON.stringify(request.query)}`);
      console.log(`params ${JSON.stringify(request.params)}`);
      // const streamData = Buffer.from(stream);
      //   let streamData = new Readable().wrap(stream);
      return h.response(stream).header("Content-Type", "application/csv");
    }
  });

  server.route({
    method: "GET",
    path: "/acct/balance.asp",
    handler: (request, h) => {
      const stream = fs.createReadStream("./balance-response.html");

      return h
        .response(stream)
        .header("Content-Type", "text/html; charset=UTF-8");
    }
  });

  server.events.on("start", function() {
    server
      .table()
      .forEach(route =>
        console.log(`${route.method.toUpperCase()}\t${route.path}`)
      );
  });

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
});

init();
