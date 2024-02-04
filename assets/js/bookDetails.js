const body = document.body;

//h1 element per il titolo del libro
const bookTitle = document.createElement('h1');
bookTitle.setAttribute('id', 'bookTitle');

// p element per la descrizione del libro
const bookDescription = document.createElement('p');
bookDescription.setAttribute('id', 'bookDescription');

// button element per tornare indietro
const returnButton = document.createElement('button');
returnButton.setAttribute('id', 'returnButton');
returnButton.textContent = 'Back';
returnButton.addEventListener('click', function () {
    window.location.href = 'index.html';
});

// img element per l'immagine del libro
const bookImage = document.createElement('img');
bookImage.setAttribute('src', './assets/img/book.png');
bookImage.setAttribute('class', 'book-image');

// Aggiungere gli elementi al corpo
body.appendChild(bookTitle);
body.appendChild(bookDescription);
body.appendChild(returnButton);
body.appendChild(bookImage);


async function showBookDetails(bookId) {
    try {
        bookImage.style.animation = "scale 2s linear infinite";

        const response = await fetch(`https://openlibrary.org${bookId}.json`);
        const data = await response.json();

        bookTitle.textContent = data.title;
        if (data.description && typeof data.description === 'string') {
            bookDescription.textContent = data.description;
        } else {
            bookDescription.textContent = 'No description available';
        }

    } catch (error) {
        bookDescription.textContent = 'Failed to fetch request';
    }

    bookImage.style.animation = null;
}

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('bookId');
if (bookId) {
    showBookDetails(bookId);
}