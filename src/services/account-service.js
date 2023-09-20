const accountDAO = require('./AccountDAO'); // Import the AccountDAO class
const Account = require('../Model/Account'); // Import the Account class

class accountService {
  constructor() {
    this.accountDAO = new AccountDAO();
  }

  createAccount(account) {
    return this.accountDAO.createAccount(account);
  }

  loginAccount(account) {
    return this.accountDAO.loginAccount(account);
  }
}

module.exports = accountService; // Export the accountService class
