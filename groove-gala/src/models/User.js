class User {
  constructor(
    id,
    address,
    birth,
    email,
    name,
    username,
    password,
    lastname,
    mobile,
    occupation
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.birth = birth;
    this.username = username;
    this.lastname = lastname;
    this.mobile = mobile;
    this.occupation = occupation;
  }

  toString() {
    return `${this.name} ${this.lastname} ${this.email} ${this.address} ${this.birth} ${this.username} ${this.mobile} ${this.occupation} ${this.id}`;
  }
}

const userConverter = {
  toFirestore: (user) => {
    const userData = {
      adresa: user.address,
      datumRodjenja: user.birth,
      email: user.email,
      ime: user.name,
      korisnickoIme: user.username,
      lozinka: user.password,
      prezime: user.lastname,
      telefon: user.mobile,
      zanimanje: user.occupation,
    };
    return userData;
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      address: data.adresa,
      birth: data.datumRodjenja,
      email: data.email,
      name: data.ime,
      username: data.korisnickoIme,
      password: data.lozinka,
      lastname: data.prezime,
      mobile: data.telefon,
      occupation: data.zanimanje,
    };
  },
};

export { User, userConverter };
