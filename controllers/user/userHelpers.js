const SharedHelpers = require ('../../sharedHelpers/sharedHelpers')

module.exports = {
  validateEmail: function (email) {
      if (typeof email === 'string' && !SharedHelpers.isEmpty(email)) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(String(email).toLowerCase())
      }

      return false
  },
  validatePassword: function (password) {
    if (typeof password === 'string' && !SharedHelpers.isEmpty(password)){
      return true
    }

    return false
  },
  validateName: function (name) {
    if (typeof name === 'string' && !SharedHelpers.isEmpty(name)){
      return true
    }

    return false
  },
  validateNewUserParams: function ({email, name, password}) {
    if (this.validateEmail(email) && this.validateName(name) && this.validatePassword(password)) {
      return true
    }

    return false
  }

}
