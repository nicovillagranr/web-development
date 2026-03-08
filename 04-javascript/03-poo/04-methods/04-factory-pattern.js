class User {
  constructor(role, name) {
    this.role = role;
    this.name = name;
  }
}

class UserFactory {
  static createAdmin(name) { return new User('admin', name); }
  static createGuest(name) { return new User('guest', name); }
}

console.log('[factory-pattern]', UserFactory.createAdmin('Nico'));
console.log('[factory-pattern]', UserFactory.createGuest('Camila'));
