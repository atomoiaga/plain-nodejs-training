const generateRandomNumber = () => {
  return Math.floor(Math.random() * 1000 + 1000000);
};

module.exports = {
  generateRandomNumber,
};
