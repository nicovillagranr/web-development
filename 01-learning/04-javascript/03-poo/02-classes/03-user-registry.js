class UserRegistry {
  constructor() { this.users = new Map(); }

  register(email, name) {
    if (this.users.has(email)) return false;
    this.users.set(email, { email, name });
    return true;
  }

  list() { return [...this.users.values()]; }
}

const registry = new UserRegistry();
registry.register('ana@mail.com', 'Ana');
registry.register('nico@mail.com', 'Nico');
console.log('[user-registry]', registry.list());
