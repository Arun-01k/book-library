const myLibrary = [
{id: 'a533dbc1-47bb-4af9-819f-36d37c863861', title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: 'not read'},
{id: '84e57aee-4332-4343-8d44-e3643ebf6496', title: '1984', author: 'George Orwell', pages: 328, read: 'read'},
{id: 'edce4fbe-04b1-4af6-bda5-8231ee35da2a', title: 'Pride and Prejudice', author: 'Jane Austen', pages: 279, read: 'read'},
{id: '22525267-a395-47eb-920f-4e4b2bc45e2a', title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 324, read: 'not read'}
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

function addBookToLibrary(title, author, pages, read) {
    const books = new Book (title, author, pages, read);
    myLibrary.push(books);
    dynamicBookAddition();
}

const booksDisplayContainer = document.querySelector("#for-books-display");

function dynamicBookAddition() {
    booksDisplayContainer.innerHTML = '';
    myLibrary.forEach((item)=> {
        const content = document.createElement("div");
        content.classList.add("cards");

        const title = document.createElement("h4");
        title.classList.add("title");
        title.textContent = `${item.title}`;
        
        const author = document.createElement("p")
        author.classList.add("author");
        author.textContent = `by ${item.author}`;
        
        const pages = document.createElement("p")
        pages.classList.add("pages");
        pages.textContent = `Pages: ${item.pages}`;
        
        const status = document.createElement("p")
        status.classList.add("status");
        status.textContent = `Status: ${item.read}`;

        content.append(title, author, pages, status);
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
    const status = document.querySelector("#status-input").value.trim();

    if (!title || !author || !pages || !status) {
    alert("Please fill in all fields!");
    return;}
    
    addBookToLibrary(title, author, pages, status);

    dialog.close();
    form.reset();
});

const closeBtn = document.querySelector("#close-btn")
closeBtn.addEventListener("click", ()=> dialog.close());