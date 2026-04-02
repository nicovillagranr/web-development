// 04 — Factory Pattern
// TS: literal union type para roles — el compilador verifica valores válidos.
// Record<K, V> para mapas de configuración tipados.
class User {
    constructor(role, // readonly: no cambia después de crearse
    name) {
        this.role = role;
        this.name = name;
    }
    canEdit() {
        return this.role === "admin" || this.role === "editor";
    }
    canDelete() {
        return this.role === "admin";
    }
}
class UserFactory {
    static createAdmin(name) {
        return new User("admin", name);
    }
    static createGuest(name) {
        return new User("guest", name);
    }
    static createEditor(name) {
        return new User("editor", name);
    }
    // Factory genérico — TS verifica que 'role' sea un UserRole válido
    static create(role, name) {
        return new User(role, name);
    }
}
const admin = UserFactory.createAdmin("Nico");
const guest = UserFactory.createGuest("Camila");
const editor = UserFactory.create("editor", "Luis");
console.log("[factory-pattern] admin puede editar:", admin.canEdit()); // true
console.log("[factory-pattern] guest puede eliminar:", guest.canDelete()); // false
console.log("[factory-pattern] editor puede editar:", editor.canEdit()); // true
// Record<K, V> — mapa de permisos por rol
const permisos = {
    admin: ["leer", "escribir", "eliminar", "configurar"],
    editor: ["leer", "escribir"],
    guest: ["leer"],
};
console.log("[factory-pattern] permisos del admin:", permisos["admin"]);
console.log("[factory-pattern] permisos del guest:", permisos["guest"]);
export {};
// TS: si intentas un rol inválido, es error de compilación:
// UserFactory.create("superadmin", "Test"); // Error: no es UserRole
//# sourceMappingURL=04-factory-pattern.js.map