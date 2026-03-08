class Agenda {
  constructor() { this.contacts = []; }

  add(name, phone) {
    this.contacts.push({ id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), name, phone });
  }

  search(query) {
    const q = query.toLowerCase();
    return this.contacts.filter((c) => ${c.name} .toLowerCase().includes(q));
  }
}

const agenda = new Agenda();
agenda.add('Luis', '+56911111111');
agenda.add('Camila', '+56922222222');
console.log('[contact-agenda]', agenda.search('luis'));
