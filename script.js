const addButton = document.querySelector("#add-btn");
const addButtonText = document.querySelector("#btn-text");
const submitButton = document.querySelector("#submit-btn");
const formField = document.querySelector("#form");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const statusField = document.querySelector("#status");
const bookCardDisplay = document.querySelector(".book-card-display");

let myLibrary = [
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: "1000",
    status: "Read",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: "1000",
    status: "Read",
  },
];

function Book(title, author, pages, status) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.status = status);
}
function addBookToLibrary(title, author, pages, read) {
  title = titleField.value;
  author = authorField.value;
  pages = pagesField.value;
  status = statusField.value;
  return myLibrary.push(new Book(title, author, pages, status));
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

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");

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

function toggleRead() {
  const readBtn = document.querySelector;
}
// Toggle form
addButton.addEventListener("click", displayForm);

// Add book to library array and display
submitButton.addEventListener("click", () => {
  if (titleField.value === "" || authorField.value === "") {
    return;
  } else {
    addBookToLibrary();
    clearFields();
    clearBookDisplay();
    updateBookDisplay();
  }
});

onload(updateBookDisplay());
