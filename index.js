'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 25;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNum = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('как называется ваш проект?', 'Калькулятор ерстки');
  screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Сложные, Интерактивные',
  );

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?', '15000');
  } while (!isNum(screenPrice));

  screenPrice = +screenPrice;

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
  let sum = 0;
  let price;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }
    do {
      price = prompt('Сколько это будет стоить?');
    } while (!isNum(price));

    sum += +price;
  }
  return sum;
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

function getFullPrice(screen, allServ) {
  return screen + allServ;
}

function getTitle() {
  return (
    title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase()
  );
}

function getServicePercentPrices(full, roll) {
  return Math.ceil(full - full * (roll / 100));
}

function getRollbackMessage(price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  } else if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что-то пошло не так';
  }
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle();
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);

console.log('Типы экранов для разработки: ' + screens);
console.log(getRollbackMessage(fullPrice));
console.log('Стоимость за вычетом процента отката: ' + servicePercentPrice);
