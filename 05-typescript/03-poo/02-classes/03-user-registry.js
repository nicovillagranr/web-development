// 03 — User Registry
// TS: Map<K, V> con tipos genéricos; interfaz UserRecord.
class UserRegistry {
    constructor() {
        // Map tipado: clave string → valor UserRecord
        this.users = new Map();
    }
    register(email, name) {
        if (this.users.has(email))
            return false;
        this.users.set(email, { email, name });
        return true;
    }
    list() {
        // spread de Map.values() devuelve Iterable<UserRecord>; convertimos a array
        return [...this.users.values()];
    }
    find(email) {
        return this.users.get(email);
    }
}
const registry = new UserRegistry();
registry.register("ana@mail.com", "Ana");
registry.register("nico@mail.com", "Nico");
console.log("[user-registry]", registry.list());
export {};
//# sourceMappingURL=03-user-registry.js.map