class Festival {
  constructor(price, maxPeople, name, description, travel, imgs, type) {
    this.price = price;
    this.maxPeople = maxPeople;
    this.name = name;
    this.description = description;
    this.travel = travel;
    this.imgs = imgs;
    this.type = type;
  }

  toString() {
    return `${this.name} ${this.price} ${this.maxPeople} ${this.description} ${this.travel} ${this.imgs} ${this.type}`;
  }
}

const festivalConverter = {
  toFirestore: (fest) => {
    const data = {};

    const festData = {
      cena: fest.cena,
      maxOsoba: fest.maxOsoba,
      naziv: fest.naziv,
      opis: fest.opis,
      prevoz: fest.prevoz,
      slike: fest.slike,
      tip: fest.tip,
    };

    data[fest.id] = festData;
    return data;
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      price: data.cena,
      maxPeople: data.maxOsoba,
      name: data.naziv,
      description: data.opis,
      travel: data.prevoz,
      imgs: data.slike,
      type: data.tip,
    };
  },
};

export { Festival, festivalConverter };
