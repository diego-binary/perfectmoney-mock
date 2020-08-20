"use strict";
const fs = require("fs");

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost"
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
    method: "POST",
    path: "/acct/confirm.asp",
    handler: async request => {
      const {
        AccountID,
        PassPhrase,
        Payer_Account,
        Payee_Account,
        Amount,
        Memo,
        PAYMENT_ID,
        code,
        Period
      } = request.payload;

      return {
        Payee_Account_Name: "John Doe",
        Payer_Account,
        Payee_Account,
        PAYMENT_AMOUNT: Amount,
        PAYMENT_BATCH_NUM: -1,
        PAYMENT_ID,
        code,
        Period
      };
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  //process.exit(1);
});

init();
