// 04 — Factory Pattern
// TS: literal union type para roles — el compilador verifica valores válidos.
// Record<K, V> para mapas de configuración tipados.

// Literal union type: solo estos valores son válidos para UserRole
type UserRole = "admin" | "guest" | "editor";

class User {
  constructor(
    public readonly role: UserRole, // readonly: no cambia después de crearse
    public readonly name: string
  ) {}

  canEdit(): boolean {
    return this.role === "admin" || this.role === "editor";
  }

  canDelete(): boolean {
    return this.role === "admin";
  }
}

class UserFactory {
  static createAdmin(name: string): User {
    return new User("admin", name);
  }

  static createGuest(name: string): User {
    return new User("guest", name);
  }

  static createEditor(name: string): User {
    return new User("editor", name);
  }

  // Factory genérico — TS verifica que 'role' sea un UserRole válido
  static create(role: UserRole, name: string): User {
    return new User(role, name);
  }
}

const admin = UserFactory.createAdmin("Nico");
const guest = UserFactory.createGuest("Camila");
const editor = UserFactory.create("editor", "Luis");

console.log("[factory-pattern] admin puede editar:", admin.canEdit());   // true
console.log("[factory-pattern] guest puede eliminar:", guest.canDelete()); // false
console.log("[factory-pattern] editor puede editar:", editor.canEdit()); // true

// Record<K, V> — mapa de permisos por rol
const permisos: Record<UserRole, string[]> = {
  admin: ["leer", "escribir", "eliminar", "configurar"],
  editor: ["leer", "escribir"],
  guest: ["leer"],
};

console.log("[factory-pattern] permisos del admin:", permisos["admin"]);
console.log("[factory-pattern] permisos del guest:", permisos["guest"]);

// TS: si intentas un rol inválido, es error de compilación:
// UserFactory.create("superadmin", "Test"); // Error: no es UserRole
