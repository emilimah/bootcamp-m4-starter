import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: '',
        currentSearchValue: '',
        searchResult: []
    }

    // при вводе в поле ввода поиска меняется значение в state
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }

    // при нажатии на пнопку Искать или Enter (при фокусе на поле ввода) идет запрос на сервер
    // и приходит ответ в виде массива объектов, который в дальнейшем передается в компонент
    // Movies и отображается в нем в ввиде списка фильмов
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        const getMovies = async () => {
            const url = `http://www.omdbapi.com/?apikey=ae1f0875&s=${this.state.searchLine}`;
            const response = await fetch(url).then(r => r.json());

            this.setState({searchResult: await response.Search});
            this.props.getSearchResult(this.state.searchResult);
        }
        
        if (this.state.searchLine !== this.state.currentSearchValue) {
            this.setState({ currentSearchValue: this.state.searchLine });
            getMovies();
        }
    }
    
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;