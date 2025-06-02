const myLibrary = [
    {title: "Fahrenheit 451", author: "Ray Bradbury", pages: 199, id: "82723be9-a71c-48ca-a068-730c49534642"},
    {title: "Pachinko", author: "Min Jin Lee", pages: 522, id: "ff1eb1b5-66de-47b1-a605-6e57fdfbba49"},
    {title: "1984", author: "George Orwell", pages: 362, id: "8d86f374-d4af-40f5-9b1d-7abec52459f4"}];

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

function displayBooks(arrayOfBooks) {
    for (const book of arrayOfBooks) {
        let container = document.querySelector(".container")

        let card = document.createElement("div");
        card.classList.add("card");

        let title = document.createElement("p");
        title.textContent = `Title: ${book.title}`;
        card.appendChild(title);

        let author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;
        card.appendChild(pages);

        container.appendChild(card);
    }
}

displayBooks(myLibrary);

let dialog = document.querySelector("dialog");
let addBookBtn = document.querySelector(".addBookBtn");
let confirmBtn = document.querySelector(".confirmBtn");
let outputBox = document.querySelector("output");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
dialog.addEventListener("close", () => {
    outputBox.value = dialog.returnValue
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    let bookTitle = document.querySelector("#book-title").value
    dialog.close(bookTitle); // Have to send the book object here.
});