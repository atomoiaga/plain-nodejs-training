const { writeHandler } = require("../handlers");

const ALLOWED_METHODS = ["POST"];

const write = async (data, callback) => {
  const { payload, method } = data;
  console.log("Method", method);
  if (ALLOWED_METHODS.indexOf(method)) {
    if (payload) {
      const result = await writeHandler(payload);
      if (result && result.status === 200) {
        callback(200, result);
      }
      callback(500, { message: "Could not write to file" });
    } else {
      console.log("Payload is missing");
      callback(400, { message: "Payload is missing" });
    }
  } else {
    console.log("Method not allowed");
    callback(405, { message: "Method not allowed" });
  }
};

module.exports = write;
