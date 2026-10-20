
class Customer {
  constructor(id, name, email, phone, type, address) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.address = address;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getType() {
    return this.type;
  }

  getCity() {
    return this.address.city;
  }

  getState() {
    return this.address.state;
  }

  getRegion() {
    return this.address.region;
  }
}

module.exports = Customer;
