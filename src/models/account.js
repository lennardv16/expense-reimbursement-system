class Account {
  constructor(account_id, username, password) {
    this.account_id = account_id;
    this.username = username;
    this.password = password;
  }

  getAccount_id() {
    return this.account_id;
  }

  setAccount_id(account_id) {
    this.account_id = account_id;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    this.username = username;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

module.exports = Account;
