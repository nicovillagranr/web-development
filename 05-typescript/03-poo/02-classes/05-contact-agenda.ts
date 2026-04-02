// 05 — Contact Agenda
// TS: interfaz Contact; crypto.randomUUID() está en la lib DOM desde TS 4.4.

interface Contact {
  id: string;
  name: string;
  phone: string;
}

class Agenda {
  private contacts: Contact[] = [];

  add(name: string, phone: string): void {
    const id: string = crypto.randomUUID();
    this.contacts.push({ id, name, phone });
  }

  search(query: string): Contact[] {
    const q: string = query.toLowerCase();
    return this.contacts.filter((c: Contact) =>
      `${c.name} ${c.phone}`.toLowerCase().includes(q)
    );
  }

  remove(id: string): boolean {
    const before: number = this.contacts.length;
    this.contacts = this.contacts.filter((c: Contact) => c.id !== id);
    return this.contacts.length < before;
  }

  list(): Contact[] {
    return [...this.contacts];
  }
}

const agenda = new Agenda();
agenda.add("Luis", "+56911111111");
agenda.add("Camila", "+56922222222");
console.log("[contact-agenda]", agenda.search("luis"));
