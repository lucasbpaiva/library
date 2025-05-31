const myLibrary = [
    {title: "Fahrenheit 451", author: "Ray Bradbury", pages: 199, id: "82723be9-a71c-48ca-a068-730c49534642"},
    {title: "Pachinko", author: "Min Jin Lee", pages: 522, id: "ff1eb1b5-66de-47b1-a605-6e57fdfbba49"}];

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