const books = document.querySelectorAll('.book');
const background = document.querySelector('body');
const titleBookThree = books[4];
const adv = document.querySelector('.adv');
const chaptersBookTwo = books[0].querySelectorAll('li');
const chaptersBookFive = books[5].querySelectorAll('li');
const chaptersBookSix = books[2].querySelectorAll('li');
const bookSixChapters = books[2].querySelector('ul');

books[1].after(books[0]);
books[0].after(books[4]);
books[5].after(books[2]);

background.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

titleBookThree.querySelector('a').textContent =
  'Книга 3. this и Прототипы Объектов';

adv.remove();

chaptersBookTwo[10].before(chaptersBookTwo[2]);
chaptersBookTwo[3].after(chaptersBookTwo[6]);
chaptersBookTwo[4].before(chaptersBookTwo[8]);

chaptersBookFive[4].after(chaptersBookFive[2]);
chaptersBookFive[3].before(chaptersBookFive[9]);
chaptersBookFive[8].before(chaptersBookFive[5]);

const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
bookSixChapters.insertBefore(newChapter, bookSixChapters.lastElementChild);

console.log(books);
console.log(background);
console.log(titleBookThree);
console.dir(chaptersBookTwo);
console.dir(chaptersBookFive);
console.dir(chaptersBookSix);
