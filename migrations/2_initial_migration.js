const Reservation = artifacts.require("Reservation");

module.exports = function (deployer) {
  deployer.deploy(Reservation);
};
