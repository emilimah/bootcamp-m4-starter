import React, { Component } from 'react';
import './MovieItem.css';

class MovieItem extends Component {
    render() {
        const { Title, Year, Poster } = this.props;
        return (
            <article className="movie-item">
                { Poster !== 'N/A' ? (
                    <img className="movie-item__poster" src={Poster} alt={Title} />
                ) : (
                    <div className="movie-item__no-poster"><span>No poster :(</span></div>
                ) }
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={this.props.addToFavorites}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;