import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link , useHistory} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";

function Header() {

    const [{basket,user}, dispatch] = useStateValue();
    const history = useHistory();

    const handleOnClick = () => {
        if (user) {
            auth.signOut();
            history.push('/');
            dispatch({
                type:'CLEAR_BASKET'
            })


        }
    }

    return (
        <div className='header'>
            <Link to="/">
                <img
                    className='header_logo'
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                    alt='logo_png'
                />
            </Link>
            <div className='header_search'>
                <input className='header_searchInput' type='text'/>
                <SearchIcon className="header_searchIcon"/>
            </div>

            <div className="header_nav">
                <Link to={ !user && '/login'}>
                    <div onClick={handleOnClick} className="header_option">
                        <span className="header_optionLineOne">Hello { user ? user.email : 'Guest'}</span>
                        <span className="header_optionLineTwo">{!user ? 'Sign In' : 'Sign Out'}</span>
                    </div>
                </Link>
                <Link to={user && '/orders'}>
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>

                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default Header;