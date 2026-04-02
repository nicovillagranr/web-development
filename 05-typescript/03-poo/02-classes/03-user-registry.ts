// 03 — User Registry
// TS: Map<K, V> con tipos genéricos; interfaz UserRecord.

interface UserRecord {
  email: string;
  name: string;
}

class UserRegistry {
  // Map tipado: clave string → valor UserRecord
  private users: Map<string, UserRecord> = new Map();

  register(email: string, name: string): boolean {
    if (this.users.has(email)) return false;
    this.users.set(email, { email, name });
    return true;
  }

  list(): UserRecord[] {
    // spread de Map.values() devuelve Iterable<UserRecord>; convertimos a array
    return [...this.users.values()];
  }

  find(email: string): UserRecord | undefined {
    return this.users.get(email);
  }
}

const registry = new UserRegistry();
registry.register("ana@mail.com", "Ana");
registry.register("nico@mail.com", "Nico");
console.log("[user-registry]", registry.list());
