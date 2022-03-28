const commaFormat = require("./commaFormat");
module.exports = {
  nameFormat() {
    if (!this.firstName || !this.lastName) {
      return "No Name";
    }
    const [firstF, ...restF] = this.firstName;
    const [firstL, ...restL] = this.lastName;
    return `${firstF.toUpperCase() + restF.join("")} ${
      firstL.toUpperCase() + restL.join("")
    }`;
  },
  phoneNumber() {
    if (!this.phone) {
      return "No Phone Number";
    }
    return `(${this.phone.substring(0, 3)}) ${
      this.phone.substring(3, 6) + "-" + this.phone.substring(6)
    }`;
  },
  dollar(name) {
    return `$${commaFormat(this.getDataValue(name))}`;
  },
  address() {
    return `${this.streetOne} ${this.streetTwo || ""} ${this.city}, ${
      this.state
    } ${this.zip}`;
  },
  sqft() {
    return `${commaFormat(this.squareFootage)}`;
  },
};
