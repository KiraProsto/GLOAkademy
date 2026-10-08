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
  screenCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 25,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    this.addTitle();
    btnCalculate.addEventListener('click', () => {
      this.start();
    });
    screenBtn.addEventListener('click', () => {
      this.addScreenBlock();
    });
    rollbackInput.addEventListener('input', () => {
      rollbackValue.textContent = rollbackInput.value + '%';
      this.rollback = +rollbackInput.value;
    });
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    if (!this.checkScreens()) {
      alert('Заполните все поля экранов');
      return;
    }

    this.screens = [];
    this.servicesPercent = {};
    this.servicesNumber = {};

    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;

    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();

    // this.logger();
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.screenCount;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function () {
    screenBlock = document.querySelectorAll('.screen');

    screenBlock.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value,
      });
    });
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screenBlock[0].cloneNode(true);
    screenBlock[screenBlock.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce(
      (acc, screen) => acc + screen.price,
      0,
    );

    this.screenCount = this.screens.reduce(
      (acc, screen) => acc + screen.count,
      0,
    );

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100),
    );
  },

  checkScreens: function () {
    return [...screenBlock].every((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      return select.value !== '' && input.value !== '';
    });
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

appData.init();
