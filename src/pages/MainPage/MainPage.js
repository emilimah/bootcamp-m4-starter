import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {
    state = {
        searchResult: [],
        favorites: []
    }

    getSearchResult = (result) => {
        this.setState({ searchResult: result ? result : [] });
    }

    setFavorites = (favorite) => {
        const { favorites } = this.state;
        const { imdbID, Title, Year } = favorite;
        if (!favorites.find(i => i.imdbID === imdbID)) {
            this.setState({ favorites: [...this.state.favorites, { imdbID, Title, Year }] })
        }
    }

    deleteFavorite = (favorite) => {
        this.setState(({favorites}) => {
            const index = favorites.findIndex(element => element.imdbID === favorite.imdbID),
                before = favorites.slice(0, index),
                after = favorites.slice(index + 1);
            const updatedFavorites = [...before, ...after];
            return {
                favorites: updatedFavorites
            }
        })
    }
    
    render() { 
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox getSearchResult={this.getSearchResult}/>
                        </div>
                        <div className="main-page__movies">
                            <Movies searchResult={this.state.searchResult} getFavorite={this.setFavorites} />
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites favorites={this.state.favorites} deleteFavorite={this.deleteFavorite} saveList={(title) => this.props.saveList(title, this.state.favorites)} listId={this.props.listId} />
                    </aside>
                </main>
            </div>
        );
    }
}
 
export default MainPage;