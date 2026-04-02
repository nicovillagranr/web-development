// 05 — Contact Agenda
// TS: interfaz Contact; crypto.randomUUID() está en la lib DOM desde TS 4.4.
class Agenda {
    constructor() {
        this.contacts = [];
    }
    add(name, phone) {
        const id = crypto.randomUUID();
        this.contacts.push({ id, name, phone });
    }
    search(query) {
        const q = query.toLowerCase();
        return this.contacts.filter((c) => `${c.name} ${c.phone}`.toLowerCase().includes(q));
    }
    remove(id) {
        const before = this.contacts.length;
        this.contacts = this.contacts.filter((c) => c.id !== id);
        return this.contacts.length < before;
    }
    list() {
        return [...this.contacts];
    }
}
const agenda = new Agenda();
agenda.add("Luis", "+56911111111");
agenda.add("Camila", "+56922222222");
console.log("[contact-agenda]", agenda.search("luis"));
export {};
//# sourceMappingURL=05-contact-agenda.js.map