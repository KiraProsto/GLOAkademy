'use strict';

const title = document.getElementsByTagName('h1')[0];

const btns = document.getElementsByClassName('handler_btn');
const btnCalculate = btns[0];
const btnReset = btns[1];

const screenBtn = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const rollbackInput = document.querySelector('.rollback input[type="range"]');
const rollbackValue = document.querySelector('.rollback .range-value');

const totalInputs = document.getElementsByClassName('total-input');
const total = totalInputs[0];
const totalCount = totalInputs[1];
const totalCountOther = totalInputs[2];
const totalFullCount = totalInputs[3];
const totalCountRollback = totalInputs[4];

let screenBlock = document.querySelectorAll('.screen');

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

      this.services[name + '_' + i] = +price;
    }

    this.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce(
      (acc, screen) => acc + screen.price,
      0,
    );

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
