const myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 310, 'not read'),
  new Book('1984', 'George Orwell', 328, 'read'),
  new Book('Pride and Prejudice', 'Jane Austen', 279, 'read'),
  new Book('To Kill a Mockingbird', 'Harper Lee', 324, 'not read')
];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("you must use 'new' operator to call this constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

Book.prototype.toggleStatus = function() {
    this.read = this.read === 'read' ? 'not read' : 'read';
}

function addBookToLibrary(title, author, pages, read) {
    const books = new Book (title, author, pages, read);
    myLibrary.push(books);
    dynamicBookAddition();
}

const booksDisplayContainer = document.querySelector("#for-books-display");

function dynamicBookAddition() {
    booksDisplayContainer.innerHTML = '';
    myLibrary.forEach((item)=> {
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.textContent = 'x';

        const content = document.createElement("div");
        content.classList.add("cards");
        content.dataset.id = item.id;

        const title = document.createElement("h4");
        title.classList.add("title");
        title.textContent = `${item.title}`;
        
        const author = document.createElement("p")
        author.classList.add("author");
        author.textContent = `by ${item.author}`;
        
        const pages = document.createElement("p")
        pages.classList.add("pages");
        pages.textContent = `Pages: ${item.pages}`;
        
        const status = document.createElement("button")
        status.classList.add(item.read === 'read' ? 'read' : 'not-read');
        status.textContent = `Status: ${item.read}`;

        content.append(removeBtn, title, author, pages, status);
        booksDisplayContainer.append(content);
    }
    );
}

dynamicBookAddition();

const addBookBtn = document.querySelector("#add-book");
const dialog = document.querySelector("#dialog");

addBookBtn.addEventListener('click', ()=> dialog.showModal());

const form = document.querySelector("form");

form.addEventListener("submit", (e)=> { 
    e.preventDefault();
    const title = document.querySelector("#title-input").value.trim();
    const author = document.querySelector("#author-input").value.trim();
    const pages = parseInt(document.querySelector("#pages-input").value);
    const status = document.querySelector('input[name="status"]:checked').value;

    if (!title || !author || !pages || !status) {
    alert("Please fill in all fields!");
    return;}
    
    addBookToLibrary(title, author, pages, status);

    dialog.close();
    form.reset();
});

const closeBtn = document.querySelector("#close-btn")
closeBtn.addEventListener("click", ()=> dialog.close());

booksDisplayContainer.addEventListener("click", (e)=> {
    if(e.target.classList.contains("removeBtn")) {   //remove button
        const removeCard = e.target.closest(".cards");

        const removeCardId = myLibrary.findIndex(item => item.id === removeCard.dataset.id);
        myLibrary.splice(removeCardId, 1);
        removeCard.remove();
    }
    if(e.target.classList.contains("read") || e.target.classList.contains("not-read")) {       //toggle button
        const toggle = e.target.closest(".cards");
        const toggleBookID = toggle.dataset.id;

        const toggleBook = myLibrary.find(item => item.id === toggleBookID);
        toggleBook.toggleStatus();
        e.target.textContent = `Status: ${toggleBook.read}`;

        e.target.classList.remove("read", "not-read");

        e.target.classList.add(toggleBook.read === "read" ? "read" : "not-read");
    }
})