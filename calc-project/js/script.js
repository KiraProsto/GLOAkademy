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
  initialScreenCount: 1,
  init() {
    this.addTitle();

    btnCalculate.addEventListener('click', () => {
      this.start();
    });

    btnReset.addEventListener('click', () => {
      this.reset();
    });

    screenBtn.addEventListener('click', () => {
      this.addScreenBlock();
    });

    rollbackInput.addEventListener('input', () => {
      rollbackValue.textContent = rollbackInput.value + '%';
      this.rollback = +rollbackInput.value;
    });

    btnReset.style.display = 'none';
  },

  addTitle() {
    document.title = title.textContent;
  },

  start() {
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

    this.disableInputs();

    btnCalculate.style.display = 'none';
    btnReset.style.display = 'block';

    // this.logger();
  },

  reset() {
    this.title = '';
    this.screens = [];
    this.screenCount = 0;
    this.screenPrice = 0;
    this.rollback = 25;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};

    total.value = '';
    totalCount.value = '';
    totalCountOther.value = '';
    totalFullCount.value = '';
    totalCountRollback.value = '';

    rollbackInput.value = 25;
    rollbackValue.textContent = '25%';

    const textInputs = document.querySelectorAll('input[type="text"]');

    textInputs.forEach((input) => {
      input.value = '';
      input.disabled = false;
    });

    const selects = document.querySelectorAll('select');

    selects.forEach((select) => {
      select.selectedIndex = 0;
      select.disabled = false;
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    screenBlock = document.querySelectorAll('.screen');

    while (screenBlock.length > 1) {
      screenBlock[screenBlock.length - 1].remove();
      screenBlock = document.querySelectorAll('.screen');
    }

    btnReset.style.display = 'none';
    btnCalculate.style.display = 'block';
  },

  showResult() {
    total.value = this.screenPrice;
    totalCount.value = this.screenCount;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens() {
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

  addServices() {
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

  addScreenBlock() {
    const cloneScreen = screenBlock[0].cloneNode(true);

    cloneScreen.querySelector('input').value = '';
    cloneScreen.querySelector('select').selectedIndex = 0;

    screenBlock[screenBlock.length - 1].after(cloneScreen);

    screenBlock = document.querySelectorAll('.screen');
  },

  addPrices() {
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

  disableInputs() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    const selects = document.querySelectorAll('select');

    textInputs.forEach((input) => {
      input.disabled = true;
    });

    selects.forEach((select) => {
      select.disabled = true;
    });
  },

  checkScreens() {
    return [...screenBlock].every((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      return select.value !== '' && input.value !== '';
    });
  },

  logger() {
    for (let key in this) {
      if (typeof this[key] !== 'function') {
        console.log(`${key}:`, this[key]);
      }
    }
    console.log('Сообщение по откату: ' + this.getRollbackMessage());
  },
};

appData.init();
