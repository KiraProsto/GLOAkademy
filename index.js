'use strict';
//======== lesson01 ========

// let title = 'Lesson2';
// let screens = 'Простые, Сложные, Интерактивные';
// let screenPrice = 1000;
// let rollback = 25;
// let fullPrice = 123456789000000000000000;
// let adaptive = true;

// alert('Hello, world!');
// console.log('this is console');

// console.log(typeof title);
// console.log(typeof fullPrice);
// console.log(typeof adaptive);

//======== lesson02 ========
// console.log(screens.length);
// console.log('Стоимость верстки экранов ' + screenPrice + ' долларов');
// console.log('Стоимость разработки сайта ' + fullPrice + ' долларов');

// console.log(screens.toLowerCase().split(', '));
// console.log(fullPrice * (rollback / 100));

//======== lesson03 ========
let title = prompt('как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let rollback = 25;

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice >= 0 && fullPrice < 15000) {
  console.log('Скидка не предусмотрена');
} else {
  console.log('Что то пошло не так');
}

console.log(servicePercentPrice);
