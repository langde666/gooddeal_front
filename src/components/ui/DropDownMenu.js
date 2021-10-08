import { useState } from 'react';
import useToggle from '../../hooks/useToggle';

const DropDownMenu = ({ listItem = null, value = '', setValue = () => { } }) => {
    const selectedItemDefault =
        listItem.find((item) => item.value == value) || listItem[0];
    const [selectedItem, setSelectedItem] = useState(selectedItemDefault);
    const [showDropDownFlag, toggleShowDropDownFlag] = useToggle(false);

    const handleSelect = (item) => {
        setValue(item.value);
        setSelectedItem(item);
        toggleShowDropDownFlag();
    };

    return (
        <div className="cus-dropdown">
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
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
            </ul>

            <button
                type="button"
                className="btn cus-dropdown-btn"
                onClick={toggleShowDropDownFlag}
                onBlur={() => toggleShowDropDownFlag(false)}
            >
                {selectedItem.icon}
                <span>{selectedItem.label}</span>
                <i className="fas fa-sort-down"></i>
            </button>
        </div>
    );
};

export default DropDownMenu;
