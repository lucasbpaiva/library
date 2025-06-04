let myLibrary = [];

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

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    return book
}

//add some books manually
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 199, true);
addBookToLibrary("Pachinko", "Min Jin Lee", 522, true);
addBookToLibrary("1984", "George Orwell", 362, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 349, true);
addBookToLibrary("Kafka on the Shore", "Haruki Murakami", 571, true);
addBookToLibrary("An Artist of the Floating World", "Kazuo Ishiguro", 206, false);

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

    card.dataset.id = book.id;
    card.appendChild(infoContainer);

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    let toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = book.read ? "Mark as not finished" : "Mark as read";
    toggleReadBtn.classList.add("card-button");
    buttonsContainer.appendChild(toggleReadBtn);

    toggleReadBtn.addEventListener("click", () => {
        //toggle object property
        book.toggleReadStatus();
        //toggle button textContent
        toggleReadBtn.textContent = book.read ? "Mark as not finished" : "Mark as read";
        //toggle card textContent
        read.textContent = book.read ? "Already Read" : "Not read yet";
    });

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("card-button");
    buttonsContainer.appendChild(removeBtn);

    removeBtn.addEventListener("click", (event) => {
        let cardToRemove = event.target.parentElement.parentElement;
        let bookId = cardToRemove.dataset.id;

        //remove card
        container.removeChild(cardToRemove);
        // remove book from library
        myLibrary = myLibrary.filter(book => book.id != bookId);
    });

    card.appendChild(buttonsContainer);
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