'use strict';

let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 1000;
let rollback = 25;
let fullPrice = 123456789000000000000000;
let adaptive = true;

alert('Hello, world!');
console.log('this is console');

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' долларов');
console.log('Стоимость разработки сайта ' + fullPrice + ' долларов');

console.log(screens.toLowerCase().split(', '));
console.log(fullPrice * (rollback / 100));

const title = prompt('как называется ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (serv1, serv2) {
  return serv1 + serv2;
};
const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice(screen, allServ) {
  return screen + allServ;
}
const fullPrice = getFullPrice(screenPrice, allServicePrices);

function getTitle() {
  return (
    title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase()
  );
}
title = getTitle();

function getServicePercentPrices(full, roll) {
  return Math.ceil(full - full * (roll / 100));
}
const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

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

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('Типы экранов для разработки: ' + screens);
console.log(getRollbackMessage(fullPrice));
console.log('Стоимость за вычетом процента отката: ' + servicePercentPrice);
