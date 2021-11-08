import { useState, useEffect } from 'react';

const SortByButton = ({ title = '', currentSortBy = '', sortBy = '', order = 'asc', onSet = () => { } }) => {
    const [flag, setFlag] = useState('');

    useEffect(() => setFlag(() => currentSortBy == sortBy ? order : ''), [currentSortBy])

    const handleClick = () => {
        if (!flag) {
            onSet('asc', sortBy);
            setFlag('asc');
        }
        else {
            const newFlag = flag == 'asc' ? 'desc' : 'asc';
            onSet(newFlag, sortBy);
            setFlag(newFlag);
        }
    }

    return (
        <span
            className="sort-by-button btn btn-sm"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            {title}
            {!flag ?
                <i className="fas fa-sort ms-2"></i> :
                flag == 'asc' ?
                    <i className="fas fa-sort-alpha-down ms-2"></i> :
                    <i className="fas fa-sort-alpha-up-alt ms-2"></i>
            }
        </span>
    )
}

export default SortByButton;