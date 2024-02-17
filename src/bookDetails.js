const app = {
    body: document.body,
    bookTitle: null,
    bookDescription: null,
    returnButton: null,
    bookImage: null,
};

function createBookDetails() {
    app.bookTitle = document.createElement('h1');
    app.bookTitle.setAttribute('id', 'bookTitle');

    app.bookDescription = document.createElement('p');
    app.bookDescription.setAttribute('id', 'bookDescription');

    app.returnButton = document.createElement('button');
    app.returnButton.setAttribute('id', 'returnButton');
    app.returnButton.textContent = 'Back';
    app.returnButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    app.bookImage = document.createElement('img');
    app.bookImage.setAttribute('src', './assets/img/book.png');
    app.bookImage.setAttribute('class', 'book-image');

    app.body.appendChild(app.bookTitle);
    app.body.appendChild(app.bookDescription);
    app.body.appendChild(app.returnButton);
    app.body.appendChild(app.bookImage);
}

async function showBookDetails(bookId) {
    try {
        app.bookImage.style.animation = "scale 2s linear infinite";

        const response = await fetch(`https://openlibrary.org${bookId}.json`);
        const data = await response.json();

        app.bookTitle.textContent = data.title;
        if (data.description && typeof data.description === 'string') {
            app.bookDescription.textContent = data.description;
        } else if (data.description && typeof data.description === 'object') {
            app.bookDescription.textContent = data.description.value;
        } else {
            app.bookDescription.textContent = 'No description available';
        }
    } catch (error) {
        app.bookDescription.textContent = 'Failed to fetch request';
    } finally {
        app.bookImage.style.animation = null;
    }
}

function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    if (bookId) {
        createBookDetails();
        showBookDetails(bookId);
    } else {
        app.body.textContent = 'Missing book id';
    }
}

main();