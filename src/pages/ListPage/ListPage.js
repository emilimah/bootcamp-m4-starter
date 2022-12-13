import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    componentDidMount() {
        // const id = this.props.match.params;
        // console.log(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    }

    render() { 
        const { title, favorites } = this.props.listData;
        return (
            <div className="list-page">
                <h1 className="list-page__title">{title}</h1>
                <ul>
                    {favorites.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}`} target="_blank" rel="noopener noreferrer">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;