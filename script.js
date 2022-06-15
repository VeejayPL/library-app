const addButton = document.querySelector("#add-btn");
const addButtonText = document.querySelector("#btn-text");
const formField = document.querySelector("#form");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const statusField = document.querySelector("#status");

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
function getData() {
  title = titleField;
  author = authorField;
  pages = pagesField;
  status = statusField;
  return new Book(title, author, pages, status);
}
function addBookToLibrary(title, author, pages, read) {
  return myLibrary.push(new Book(title, author, pages, read));
}

function displayForm() {
  if (formField.style.display === "flex") {
    formField.style.display = "none";
    addButtonText.innerText = "Add book";
    addButton.style.transform = "rotate(0deg)";
  } else {
    formField.style.display = "flex";
    addButtonText.innerText = "Close form";
    addButton.style.transform = "rotate(45deg)";
  }
}
// Toggle form
addButton.addEventListener("click", displayForm);
