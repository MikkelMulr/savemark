const SEARCH_BAR = document.getElementById('search');
const LIST = document.querySelector('.bookmark-list');
const ADD_BOOK_TITLE = document.getElementById('addBook-title');
const ADD_BOOK_PAGE = document.getElementById('addBook-page');

const ADD_BTN = document.getElementById('add-btn');
const SEARCH_BTN = document.getElementById('search-btn');
const BACK_BTN = document.getElementById('back-btn');

let DELETE_BTN = document.querySelectorAll('.fa-times-circle');

let bookList = [];
let searchBooks = [];

class bookmark {
	constructor(title, page) {
		this.title = title;
		this.page = page;
	}
}

function stringBuilder(arr, list, adding, itterator = '') {
	if (!adding) {
		return (list.innerHTML = `<li><span class="bookName">${itterator.title}</span> <span class="pageNum">Pg: ${itterator.page}</span><i class="far fa-times-circle"></i></li>`);
	} else {
		return arr.forEach((book) => {
			list.innerHTML += `<li><span class="bookName">${book.title}</span> <span class="pageNum">Pg: ${book.page}</span><i class="far fa-times-circle"></i></li>`;
		});
	}
}

function removeBook(arr, list) {
	let currentMark;
	arr.forEach((ele) => {
		ele.addEventListener('click', function() {
			this.parentElement.remove();
			currentMark = this;
		});
	});
	// remove item from saved array, otherwise it will still be output during search
}

ADD_BTN.addEventListener('click', function() {
	const newBook = new bookmark(ADD_BOOK_TITLE.value, ADD_BOOK_PAGE.value);

	bookList.push(newBook);

	stringBuilder(bookList, LIST, true);

	searchBooks.push(newBook);
	bookList = [];
	ADD_BOOK_PAGE.value = '';
	ADD_BOOK_TITLE.value = '';
	ADD_BOOK_TITLE.focus();
	DELETE_BTN = document.querySelectorAll('.fa-times-circle');

	removeBook(DELETE_BTN);
});

SEARCH_BAR.addEventListener('keyup', function() {
	if (this.value.length === 0 && LIST.innerHTML !== '') {
		LIST.innerHTML = '';

		stringBuilder(searchBooks, LIST, true);
	}
});

SEARCH_BTN.addEventListener('click', function() {
	searchBooks.forEach((book) => {
		if (book.title === SEARCH_BAR.value) {
			stringBuilder(searchBooks, LIST, false, book);
		}
	});
});

BACK_BTN.addEventListener('click', function() {
	LIST.innerHTML = '';

	stringBuilder(searchBooks, LIST, true);
});
