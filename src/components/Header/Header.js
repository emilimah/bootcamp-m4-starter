import React, { Component } from 'react';
import './Header.css';
import Favorites from '../Favorites/Favorites';

class Header extends Component {
    state = {
        text: 'Избранные'
    }

    // * мобильная версия *
    //  при клике на кнопку Избранные меняется текст кнопки и отображается/скрывается блок с избранными фильмами
    FavoritesClickHandler = (e) => {
        e.preventDefault();
        const btnText = this.state.text;
        this.props.favSwitcher();
        this.setState({ text: btnText === 'Избранные' ? 'Закрыть' : 'Избранные' });
    }

    render() { 
        const { screenWidth } = this.props;
        return (
            <header className="header">
                <h1 className="header__title">
                    MustSee
                </h1>
                { screenWidth < 650 && 
                    <div className="header__favorites" onClick={this.FavoritesClickHandler}>{this.state.text}</div>
                }
            </header>
        );
    }
}
 
export default Header;