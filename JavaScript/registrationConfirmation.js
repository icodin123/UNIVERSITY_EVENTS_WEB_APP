const searchBar = document.querySelector('#searchInput');

const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', executeSearch);

function executeSearch(e){
    e.preventDefault();
    console.log('hello');
    // HARDCODING 'user3' to be search result in PHASE1.
    // WILL CHANGE TO BE DYNAMIC IN PHASE2 ONCE WE HAVE DATABASE
    if (searchBar.value == 'user3'){
        window.location.href = "../HTML/searchResult.html";
    } else {
        window.location.href = "../HTML/emptySearchResult.html";
    }
}