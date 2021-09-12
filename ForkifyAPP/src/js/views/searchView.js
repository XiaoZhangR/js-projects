import icons from 'url:../../img/icons.svg';

class SearchView {
    _parentElement = document.querySelector('.search');
    _errorMessage = 'We could not found this recipe. Please try another one!';

    getQuery() {
        const query =  this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            // when we submit a form, we need to first prevent the default action
            // otherwise the page will going to reload
            e.preventDefault();
            handler();
        });
    }

}

export default new SearchView();