import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';

const SearchBar = (props) => {
    let location = useLocation();
    const currentQuery =
        new URLSearchParams(location.search).get('keyword') || '';
    const currentOption = location.pathname.split('/')[1] || 'products';

    const [query, setQuery] = useState(currentQuery);
    const [option, setOption] = useState(currentOption);

    let history = useHistory();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (option != 'products' && option != 'stores' && option != 'users')
            return;
        if (query != '') {
            history.push(`/${option}/search?keyword=${query}`);
        }
    };

    return (
        <form
            className="search-bar m-0 input-group"
            onSubmit={handleFormSubmit}
        >
            <DropDownMenu
                listItem={[
                    {
                        value: 'products',
                        label: 'product',
                        icon: <i className="fas fa-box"></i>,
                    },
                    {
                        value: 'stores',
                        label: 'store',
                        icon: <i className="fas fa-store"></i>,
                    },
                    {
                        value: 'users',
                        label: 'user',
                        icon: <i className="fas fa-user-friends"></i>,
                    },
                ]}
                value={option}
                setValue={setOption}
            />

            <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={query}
                onChange={handleChange}
            />

            <button
                className="btn btn-outline-light cus-outline text-white ripple"
                type="button"
                onClick={handleFormSubmit}
            >
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
};

export default SearchBar;
