import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

class Favorites extends Component {
    state = {
        title: 'Новый список'
    }

    favoritesNameChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ title: e.target.value });
    }

    deleteFavoriteClickHandler = (favorite) => {
        this.props.deleteFavorite(favorite);
    }

    render() { 
        const { title } = this.state;
        const { listId, favorites } = this.props;
        return (
            <div className="favorites">
                <input onChange={this.favoritesNameChangeHandler} value={title} className="favorites__name" disabled={listId} />
                <ul className="favorites__list">
                    {favorites.map((favorite) => {
                        return (
                            <li className="favorites__item" key={favorite.imdbID}>
                                <span>{favorite.Title} ({favorite.Year})</span>
                                <button className="favorites__item_delete" onClick={() => this.deleteFavoriteClickHandler(favorite)}>X</button>
                            </li>
                        );
                    })}
                </ul>
                { listId ? (
                    <Link to={`/list/${listId}`}>Перейти к списку</Link>
                ) : (
                    <button type="button" className="favorites__save" disabled={!this.props.favorites.length || !this.state.title.trim()} onClick={() => this.props.saveList(this.state.title)}>Сохранить список</button>
                ) }
            </div>
        );
    }
}
 
export default Favorites;