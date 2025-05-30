const myLibrary = [];

function Book(title, author, pages, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
}

function addBookToLibrary(title, author, pages) {
    let id = crypto.randomUUID();
    let book = new Book(title, author, pages, id);
    myLibrary.push(book);
}