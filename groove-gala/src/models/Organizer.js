class Organizer {
  constructor(address, email, festivals, since, phone, logo, name) {
    this.address = address;
    this.email = email;
    this.festivals = festivals;
    this.since = since;
    this.phone = phone;

    this.logo = logo;
    this.name = name;
  }

  toString() {
    return `${this.address} ${this.name} ${this.email}`;
  }
}

const organizerConverter = {
  toFirestore: (org) => {
    const orgData = {
      adresa: org.address,
      email: org.email,
      festivali: org.festivals,
      godinaOsnivanja: org.since,
      kontaktTelefon: org.phone,
      logo: org.logo,
      naziv: org.name,
    };
    return orgData;
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      address: data.adresa,
      email: data.email,
      festivals: data.festivali,
      since: data.godinaOsnivanja,
      phone: data.kontaktTelefon,
      logo: data.logo,
      name: data.naziv,
    };
  },
};

export { Organizer, organizerConverter };
