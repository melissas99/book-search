const app = {
    body: document.body,
    loader: null,
    resultList: null,
    inputSearch: null,
};

function createHeader() {
    const headerContainer = document.createElement('div');
    headerContainer.setAttribute('class', 'header-container');

    // Immagine
    const pageImage = document.createElement('img');
    pageImage.setAttribute('src', './assets/img/immagine.png');
    pageImage.setAttribute('class', 'page-image');

    headerContainer.appendChild(pageImage);

    // H1 element per il titolo
    const h1Title = document.createElement('h1');
    h1Title.textContent = 'Book Search';

    headerContainer.appendChild(h1Title);

    return headerContainer;
}

function createTitle() {
    const titleContainer = document.createElement('div');
    titleContainer.setAttribute('class', 'title-container');

    // H1 element per il titolo
    const h1Title = document.createElement('h1');

    titleContainer.appendChild(h1Title);

    return titleContainer;
}

function createSearchContainer() {
    const searchContainer = document.createElement('div');
    searchContainer.setAttribute('class', 'search-container');

    app.inputSearch = document.createElement('input');
    app.inputSearch.setAttribute('type', 'text');
    app.inputSearch.setAttribute('id', 'categoryInput');
    app.inputSearch.setAttribute('placeholder', 'Search Books...');

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.addEventListener('click', searchBooks);

    searchContainer.appendChild(app.inputSearch);
    searchContainer.appendChild(searchButton);

    return searchContainer;
}

function createLoader() {
    app.loader = document.createElement('div');
    app.loader.setAttribute('class', 'loader');
    return app.loader;
}

function createResultList() {
    app.resultList = document.createElement('ul');
    app.resultList.setAttribute('id', 'resultList');
    return app.resultList;
}

function main() {
    app.body.appendChild(createTitle());
    app.body.appendChild(createHeader());
    app.body.appendChild(createSearchContainer());
    app.body.appendChild(createLoader());
    app.body.appendChild(createResultList());
}

async function searchBooks() {
    try {
        const category = app.inputSearch.value.toLowerCase();
        if (!category) return;
        app.resultList.innerHTML = '';
        app.loader.style.display = 'block';

        const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
        const data = await response.json();

        if (data.works.length == 0) {
            app.resultList.innerHTML = 'No result found';
        } else {
            data.works.forEach((work) => {
                const bookItem = document.createElement('li');
                bookItem.textContent = `${work.title} - ${work.authors ? work.authors.map((a) => a.name).join(', ') : 'Autore sconosciuto'}`;
                app.resultList.appendChild(bookItem);
                bookItem.addEventListener('click', () => {
                    window.location.href = `bookDetails.html?bookId=${work.key}`;
                });
            });
        }
    } catch (error) {
        app.resultList.innerHTML = 'Failed to fetch request';
    } finally {
        app.loader.style.display = 'none';
    }
}

main();
