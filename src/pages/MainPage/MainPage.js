import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {
    state = {
        searchResult: [],
        favorites: [],
        screenWidth: window.innerWidth,
        favoritesVisible: false
    }

    // обновление результата поиска в state
    getSearchResult = (result) => {
        this.setState({ searchResult: result ? result : [] });
    }

    // добавление фильма в массив favorites объекта state при условии, что его фильма в списке
    setFavorites = (favorite) => {
        const { favorites } = this.state;
        const { imdbID, Title, Year } = favorite;
        if (!favorites.find(i => i.imdbID === imdbID)) {
            this.setState({ favorites: [...this.state.favorites, { imdbID, Title, Year }] })
        }
    }

    // удаление фильма из списка избранных
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

    // * мобильная версия *
    // отображение/скрытия блока со списком избранных
    favSwitcher = () => {
        this.setState({ favoritesVisible: !this.state.favoritesVisible })
    }
    
    render() { 
        const { screenWidth } = this.props;
        return (
            <div className="main-page">
                <Header screenWidth={screenWidth} favSwitcher={this.favSwitcher} />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox getSearchResult={this.getSearchResult}/>
                        </div>
                        <div className="main-page__movies">
                            <Movies searchResult={this.state.searchResult} getFavorite={this.setFavorites} />
                        </div>
                    </section>
                    { (screenWidth >= 650 || (screenWidth < 650 && this.state.favoritesVisible)) && 
                        <aside className="main-page__favorites">
                            <Favorites favorites={this.state.favorites} deleteFavorite={this.deleteFavorite} saveList={(title) => this.props.saveList(title, this.state.favorites)} listId={this.props.listId} />
                        </aside> 
                    }
                </main>
            </div>
        );
    }
}
 
export default MainPage;