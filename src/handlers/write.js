// Dependencies: fs, path
// const fs = require("fs");
const path = require("path");

const { generateRandomNumber } = require("../utils");
const storagePath = path.join(__dirname, "../../data");

// const write = (data, callback) => {
//   const { payload } = data;
//   const storagePath = path.join(__dirname, "../../data");
//   fs.open(
//     `${storagePath}/${generateRandomNumber()}.json`,
//     "wx",
//     (err, fileDescriptor) => {
//       if (err) {
//         console.log("Error at file opening", err);
//         callback(500, { message: "Could not open the file for writing" });
//       } else {
//         fs.writeFile(fileDescriptor, payload, (err) => {
//           if (err) {
//             console.log("Error at writing", err);
//             callback(500, { message: "Could not write to file" });
//           }
//           console.log("Success at writing");
//           callback(200, { message: "Success at writing" });
//         });
//       }
//     }
//   );
// };

const fs = require("fs").promises;

const write = async (payload) => {
  try {
    const fileDescriptor = await fs.open(
      `${storagePath}/${generateRandomNumber()}.json`,
      "wx"
    );

    if (!fileDescriptor) {
      console.log("Error at file opening", err);
      throw new Error("Could not open the file for writing");
    }

    await fs.writeFile(fileDescriptor, payload);
    return { message: "Success at writing", status: 200 };
  } catch (err) {
    if (err.message === "Could not open the file for writing") {
      console.log("Error at file opening", err);
      return { message: "Could not open the file for writing", status: 500 };
    } else {
      console.log("Error at file opening", err);
      return { message: "Could not open the file for writing", status: 500 };
    }
  }
};

module.exports = write;
