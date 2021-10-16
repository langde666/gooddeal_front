import { useState, useEffect } from 'react';
import useToggle from '../../hooks/useToggle';

const DropDownMenu = ({ listItem = [], value = '', setValue = () => { }, side = '', label = '' }) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [showDropDownFlag, toggleShowDropDownFlag] = useToggle(false);

    const handleSelect = (item) => {
        setValue(item.value);
        setSelectedItem(item);
        toggleShowDropDownFlag();
    };

    useEffect(() => {
        const selected = listItem.find((item) => item.value == value) || listItem[0];
        setSelectedItem(selected);
    }, [value]);

    return (
        <div className={`cus-dropdown ${side == 'large' ? 'w-100' : ''} ${label ? 'cus-dropdown--has-label' : ''}`}>
            {label && (
                <label className="cus-dropdown-label">{label}</label>
            )}
            <ul
                className={`list-group cus-dropdown-menu ${showDropDownFlag ? 'show' : ''}`}
            >
                {listItem &&
                    listItem.map((item, index) => (
                        <li
                            key={index}
                            className="list-group-item cus-dropdown-menu-item"
                            onMouseDown={() => handleSelect(item)}
                        >
                            {item && item.icon}
                            <span>{item && item.label}</span>
                        </li>
                    ))}
            </ul>

            <button
                type="button"
                className={`btn cus-dropdown-btn ${side == 'large' ? 'w-100 d-flex justify-content-between align-items-center' : ''} `}
                onClick={toggleShowDropDownFlag}
                onBlur={() => toggleShowDropDownFlag(false)}
            >
                {selectedItem && selectedItem.icon}
                <span className={`${side == 'large' ? 'flex-grow-1 text-start ps-2' : ''} `}
                >{selectedItem && selectedItem.label}</span>
                <i className="fas fa-sort-down"></i>
            </button>
        </div>
    );
};

export default DropDownMenu;
