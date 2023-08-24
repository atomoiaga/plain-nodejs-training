/*
    Title: Server
    Author: Andrei Tomoiaga
    Date: 2023
*/

// dependencies
const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

// const https = require("https");
// const fs = require("fs");

const { PORT } = require("./config");
const {
  writeHandler,
  notFoundHandler,
  encodeHandler,
} = require("./src/handlers");

const { writeController } = require("./src/controllers");

// Code

const routes = {
  write: writeController,
  notFound: notFoundHandler,
  encode: encodeHandler,
};

const handleRequest = (req, res) => {
  const { method, headers } = req;

  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;

  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    const chosenHandler =
      typeof routes[trimmedPath] !== "undefined"
        ? routes[trimmedPath]
        : routes["notFound"];

    const data = {
      path: trimmedPath,
      method,
      headers,
      payload: buffer,
    };

    chosenHandler(data, (statusCode = 200, payload = {}) => {
      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// HTTPS
// const httpServerOptions = {
//   key: fs.readFileSync("./https/key.pem"),
//   cert: fs.readFileSync("./https/cert.pem"),
// };

// const httpsServer = https.createServer(httpServerOptions, (req, res) => {
//   res.end("Hello World from HTTPS\n");
// });

// httpsServer.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
