import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';

import './reset.css';
import './common.css';

class App extends React.Component {
  state = {
    title: '',
    favorites: [],
    id: '',
    screenWidth: window.innerWidth
  }

  // отправка запроса для сохранения избранных фильмов и получение идентификатора списка
  getListData = async (title, favorites) => {
    this.setState({ title: title, favorites: favorites });

    const data = { 
      title: this.state.title,
      movies: this.state.favorites.map(favorite => favorite.imdbID) 
    }

    const url = 'https://acb-api.algoritmika.org/api/movies/list';
    const response = await fetch(url, {method: 'POST',body:JSON.stringify(data), headers:{'content-type': 'application/json'}})
      .then(r => r.json());

    this.setState({ id: await response.id });
  }

  updateDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  // отслеживание изменения ширины экрана
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact><MainPage saveList={this.getListData} listId={this.state.id} screenWidth={this.state.screenWidth} /></Route>
        <Route path={`/list/${this.state.id}`} exact><ListPage listData={this.state} /></Route>
      </div>
    );
  }
}

export default App;
