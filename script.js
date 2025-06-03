let myLibrary = [
    {title: "Fahrenheit 451", author: "Ray Bradbury", pages: 199, read: true, id: "82723be9-a71c-48ca-a068-730c49534642"},
    {title: "Pachinko", author: "Min Jin Lee", pages: 522, read: true, id: "ff1eb1b5-66de-47b1-a605-6e57fdfbba49"},
    {title: "1984", author: "George Orwell", pages: 362, read: false, id: "8d86f374-d4af-40f5-9b1d-7abec52459f4"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", pages: 349, read: true, id: "b80fe826-0e7d-4f63-b0b2-8811e0906dbd"},
    {title: "Kafka on the Shore", author: "Haruki Murakami", pages: 571, read: true, id: "403c9a9f-591d-43ae-91d0-3ee060480855"},
    {title: "An Artist of the Floating World", author: "Kazuo Ishiguro", pages: 206, read: false, id: "c9f3b294-ec5f-4ce2-8956-bfc717c54f58"}];

function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    return book
}

function createBookCard(book) {
    let container = document.querySelector(".container")

    let card = document.createElement("div");
    card.classList.add("card");

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    let title = document.createElement("p");
    title.textContent = `Title: ${book.title}`;
    infoContainer.appendChild(title);

    let author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    infoContainer.appendChild(author);

    let pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    infoContainer.appendChild(pages);

    let read = document.createElement("p");
    read.textContent = book.read ? "Already Read" : "Not read yet";
    infoContainer.appendChild(read);

    card.appendChild(infoContainer);

    card.dataset.id = book.id;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-button");
    card.appendChild(removeBtn);

    removeBtn.addEventListener("click", (event) => {
        let cardToRemove = event.target.parentElement;
        let bookId = event.target.parentElement.dataset.id;

        //remove card
        container.removeChild(cardToRemove);
        // remove book from library
        myLibrary = myLibrary.filter(book => book.id != bookId);
    });

    container.appendChild(card);
}

function displayBooks(arrayOfBooks) {
    for (const book of arrayOfBooks) {
        createBookCard(book);
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

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"]

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    let bookTitle = document.querySelector("#book-title").value;
    let bookAuthor = document.querySelector("#book-author").value;
    let numPages = Number(document.querySelector("#number-of-pages").value);
    let readStatus = document.querySelector("#read-status").checked;

    let book = addBookToLibrary(bookTitle, bookAuthor, numPages, readStatus);
    createBookCard(book);

    document.querySelector(".book-form").reset(); //reset form input fields
    dialog.close();
});