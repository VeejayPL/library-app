class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
  toggleStatus() {
    if (this.status == "Read") {
      this.status = "Not read";
    } else {
      this.status = "Read";
    }
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }
  findBook(title) {
    return this.books.find((book) => book.title === title);
  }
  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
  removeBook(title) {
    return (this.books = this.books.filter((book) => book.title !== title));
  }
}
const myLibrary = new Library();

// User interface
const addButton = document.querySelector("#add-btn");
const addButtonText = document.querySelector("#btn-text");
const submitButton = document.querySelector("#submit-btn");
const formField = document.querySelector("#form");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const statusField = document.querySelector("#status");
const bookCardDisplay = document.querySelector(".book-card-display");

// Modal
const alertModal = document.querySelector(".modal-container");
const alertModalText = document.querySelector(".modal-content-text");
const alertModalButton = document
  .querySelector(".modal-content-button")
  .addEventListener("click", () => {
    alertModal.setAttribute("close", "");
    window.setTimeout(() => {
      alertModal.style.display = "none";
      alertModal.removeAttribute("close");
    }, 600);
  });

// Add book to library array and display it
submitButton.addEventListener("click", () => {
  if (titleField.value === "" || authorField.value === "") {
    alertModalText.textContent = "Please fill in the fields!";
    alertModal.style.display = "block";
  } else {
    addBookToLibrary();
    clearFields();
    clearBookDisplay();
    updateBookDisplay();
  }
});

function addBookToLibrary(title, author, pages, status) {
  title = titleField.value;
  author = authorField.value;
  pages = pagesField.value;
  status = statusField.value;

  const newBook = new Book(title, author, pages, status);

  if (myLibrary.isInLibrary(newBook)) {
    alertModalText.textContent = "This book is already in your library!";
    alertModal.style.display = "block";
  } else {
    return myLibrary.addBook(newBook);
  }
}

function toggleRead(e) {
  e.preventDefault();
  const title = e.target.parentNode.firstChild.textContent.replaceAll('"', "");
  const book = myLibrary.findBook(title);
  book.toggleStatus();
  clearBookDisplay();
  updateBookDisplay();
}

function removeBook(e) {
  e.preventDefault();
  const title = e.target.parentNode.firstChild.textContent.replaceAll('"', "");
  myLibrary.removeBook(title);
  clearBookDisplay();
  updateBookDisplay();
}

function clearFields() {
  titleField.value = "";
  authorField.value = "";
  pagesField.value = "";
  statusField.value = "Read";
}

function clearBookDisplay() {
  bookCardDisplay.innerHTML = "";
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  readBtn.addEventListener("click", toggleRead);
  removeBtn.addEventListener("click", removeBook);

  title.textContent = `"${book.title}"`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  readBtn.textContent = book.status;
  removeBtn.textContent = "Remove";

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  bookCardDisplay.appendChild(bookCard);

  if (readBtn.textContent === "Not read") {
    readBtn.classList.toggle("not-read");
  }
}

function updateBookDisplay() {
  for (let book of myLibrary.books) {
    createBookCard(book);
  }
}

function displayForm() {
  const header = document.querySelector("header");
  if (formField.style.display === "flex") {
    formField.style.display = "none";
    header.classList.toggle("border");
    addButtonText.style.opacity = "1";
    addButton.style.transform = "rotate(0deg)";
  } else {
    formField.style.display = "flex";
    header.classList.toggle("border");
    addButtonText.style.opacity = "0";
    addButton.style.transform = "rotate(45deg)";
  }
}

// Toggle form
addButton.addEventListener("click", displayForm);

myLibrary.addBook(new Book("Harry Potter", "J.K. Rowling", "1200", "Read"));
myLibrary.addBook(
  new Book("Lord of the Rings", "J.R.R. Tolkien", "1200", "Read")
);
myLibrary.addBook(new Book("The Martian", "Andy Weir", "480", "Read"));
myLibrary.addBook(
  new Book("Alice in Wonderland", "Lewis Carroll", "240", "Not read")
);
myLibrary.addBook(
  new Book("The Silmarillion", "J.R.R. Tolkien", "370", "Read")
);
myLibrary.addBook(new Book("Dune", "Frank Herbert", "592", "Not read"));

updateBookDisplay();
