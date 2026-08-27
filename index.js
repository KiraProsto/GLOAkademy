'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 25,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  asking: function () {
    this.title = prompt('как называется ваш проект?', 'Калькулятор верстки');
    this.screens = prompt(
      'Какие типы экранов нужно разработать?',
      'Сложные, Интерактивные',
    );

    do {
      this.screenPrice = prompt('Сколько будет стоить данная работа?', '15000');
    } while (!this.isNum(this.screenPrice));

    this.screenPrice = +this.screenPrice;
    this.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  isNum: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getAllServicePrices: function () {
    let sum = 0;
    let price;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        this.service1 = prompt(
          'Какой дополнительный тип услуги нужен?',
          'Кулл',
        );
      } else if (i === 1) {
        this.service2 = prompt(
          'Какой дополнительный тип услуги нужен?',
          'прикол',
        );
      }
      do {
        price = prompt('Сколько это будет стоить?', '1000');
      } while (!this.isNum(price));

      sum += +price;
    }
    return sum;
  },

  getFullPrice: function () {
    return this.screenPrice + this.allServicePrices;
  },

  getTitle: function () {
    return (
      this.title.trim().charAt(0).toUpperCase() +
      this.title.trim().slice(1).toLowerCase()
    );
  },

  getServicePercentPrices: function () {
    return Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
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

  start: function () {
    this.asking();
    this.allServicePrices = this.getAllServicePrices();
    this.fullPrice = this.getFullPrice();
    this.title = this.getTitle();
    this.servicePercentPrice = this.getServicePercentPrices();
    this.logger();
  },

  logger: function () {
    for (let key in this) {
      if (typeof this[key] !== 'function') {
        console.log(`${key}: ${this[key]}`);
      }
    }
    console.log('Сообщение по откату: ' + this.getRollbackMessage());
  },
};

appData.start();
