let myLibrary = [
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: "1000",
    read: "Read",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: "1000",
    read: "Read",
  },
];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary(title, author, pages, read) {
  return myLibrary.push(new Book(title, author, pages, read));
}
