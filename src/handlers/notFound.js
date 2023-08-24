const notFound = (data, callback) => {
  callback(404, { message: "Not Found" });
};

module.exports = notFound;
