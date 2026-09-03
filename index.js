'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 25,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    this.asking();
    this.addPrices();
    this.getFullPrice();
    this.getTitle();
    this.getServicePercentPrice();
    this.logger();
  },

  asking: function () {
    do {
      this.title = prompt('как называется ваш проект?', 'Калькулятор верстки');
    } while (!this.isString(this.title));

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!this.isString(name));
      let price = 0;

      do {
        price = +prompt('Сколько будет стоить данная работа?', '15000');
      } while (!this.isNum(price));

      this.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!this.isString(name));
      let price = 0;

      do {
        price = +prompt('Сколько это будет стоить?', '1000');
      } while (!this.isNum(price));

      this.services[name] = +price;
    }

    this.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += screen.price;
    }

    for (let key in this.services) {
      this.allServicePrices += this.services[key];
    }
  },

  isNum: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  isString: function (str) {
    return isNaN(str) && typeof str === 'string';
  },

  getFullPrice: function () {
    this.fullPrice = this.screenPrice + this.allServicePrices;
  },

  getTitle: function () {
    this.title =
      this.title.trim().charAt(0).toUpperCase() +
      this.title.trim().slice(1).toLowerCase();
  },

  getServicePercentPrice: function () {
    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100),
    );
  },

  getRollbackMessage: function () {
    if (this.fullPrice >= 30000) {
      return 'Даем скидку в 10%';
    } else if (this.fullPrice >= 15000 && this.fullPrice < 30000) {
      return 'Даем скидку в 5%';
    } else if (this.fullPrice >= 0 && this.fullPrice < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что-то пошло не так';
    }
  },

  logger: function () {
    for (let key in this) {
      if (typeof this[key] !== 'function') {
        console.log(`${key}:`, this[key]);
      }
    }
    console.log('Сообщение по откату: ' + this.getRollbackMessage());
  },
};

appData.start();
