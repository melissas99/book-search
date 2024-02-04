
const body = document.body;

//div header container
const headerContainer = document.createElement('div');
headerContainer.setAttribute('class', 'header-container');

//immagine
const pageImage = document.createElement('img');
pageImage.setAttribute('src', './assets/img/immagine.png');
pageImage.setAttribute('class', 'page-image');

// Append image to header container
headerContainer.appendChild(pageImage);

//  h1 element per il titolo
const h1Title = document.createElement('h1');
h1Title.textContent = 'Book Search';

// div per search container
const searchContainer = document.createElement('div');
searchContainer.setAttribute('class', 'search-container');

// input element per search
const inputSearch = document.createElement('input');
inputSearch.setAttribute('type', 'text');
inputSearch.setAttribute('id', 'categoryInput');
inputSearch.setAttribute('placeholder', 'Search Books...');

//  button element for search
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchButton.addEventListener('click', searchBooks);

// Append input and button to search container
searchContainer.appendChild(inputSearch);
searchContainer.appendChild(searchButton);

// Create loader
const loader = document.createElement('div');
loader.setAttribute('class', 'loader');

// Create ul element for result list
const resultList = document.createElement('ul');
resultList.setAttribute('id', 'resultList');

// Append header, search container, and result list to body
body.appendChild(headerContainer);
body.appendChild(h1Title);
body.appendChild(searchContainer);
body.appendChild(loader);
body.appendChild(resultList);


async function searchBooks() {
    try {
        const category = inputSearch.value.toLowerCase();
        if (!category) return;
        loader.style.display = 'block';

        const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
        const data = await response.json();

        resultList.innerHTML = '';

        data.works.forEach((work) => {
            const bookItem = document.createElement('li');
            bookItem.textContent = `${work.title} - ${work.authors ? work.authors.map((a) => a.name).join(', ') : 'Autore sconosciuto'}`;
            resultList.appendChild(bookItem);
            bookItem.addEventListener('click', () => {
                window.location.href = `bookDetails.html?bookId=${work.key}`;
            });
        });

        loader.style.display = 'none';

    } catch (error) {
        resultList.innerHTML = 'Failed to fetch request';
    }
}