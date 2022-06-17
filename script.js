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
    alertModal.style.display = "none";
    displayForm();
  });

let myLibrary = [];

// Constructor
function Book(title, author, pages, status) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.status = status);
}
// Prototype
Book.prototype.toggleStatus = function () {
  if (this.status == "Read") {
    this.status = "Not read";
  } else {
    this.status = "Read";
  }
};

// Add book to library array and display it
submitButton.addEventListener("click", () => {
  if (titleField.value === "" || authorField.value === "") {
    displayForm();
    alertModalText.textContent = "Please fill in the fields!";
    alertModal.style.display = "block";
  } else {
    addBookToLibrary();
    clearFields();
    clearBookDisplay();
    updateBookDisplay();
  }
});

function addBookToLibrary(title, author, pages, read) {
  title = titleField.value;
  author = authorField.value;
  pages = pagesField.value;
  status = statusField.value;
  if (myLibrary.find((book) => book.title === title)) {
    displayForm();
    alertModalText.textContent = "This book is already in your library!";
    alertModal.style.display = "block";
  } else {
    return myLibrary.push(new Book(title, author, pages, status));
  }
}

function findBook(title) {
  return myLibrary.find((book) => book.title === title);
}

function toggleRead(e) {
  const title = e.target.parentNode.firstChild.textContent.replaceAll('"', "");
  const book = findBook(title);
  book.toggleStatus();
  clearBookDisplay();
  updateBookDisplay();
}

function removeBook(e) {
  const title = e.target.parentNode.firstChild.textContent.replaceAll('"', "");
  const book = myLibrary.findIndex((book) => book.title === title);
  myLibrary.splice(book, 1);
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
    bookCard.classList.add("not-read");
  }
}

function updateBookDisplay() {
  for (i in myLibrary) {
    createBookCard(myLibrary[i]);
  }
}

function displayForm() {
  if (formField.style.display === "flex") {
    formField.style.display = "none";
    addButtonText.innerText = "Add book";
    addButton.style.transform = "rotate(0deg)";
  } else {
    formField.style.display = "flex";
    addButtonText.innerText = "Close";
    addButton.style.transform = "rotate(45deg)";
  }
}

// Toggle form
addButton.addEventListener("click", displayForm);
