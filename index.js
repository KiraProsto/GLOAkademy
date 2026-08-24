const title = 'Lesson2';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 1000;
let rollback = 25;
let fullPrice = 123456789000000000000000;
let adaptive = true;

alert('Hello, world!');
console.log('this is console');

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + 'долларов');
console.log('Стоимость разработки сайта ' + fullPrice + ' долларов');

console.log(screens.toLowerCase().split(', '));
console.log(fullPrice * (rollback / 100));
