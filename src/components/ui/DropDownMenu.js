import { useState } from 'react';
import useToggle from '../../hooks/useToggle';
import useUpdateEffect from '../../hooks/useUpdateEffect';

const DropDownMenu = ({ listItem = [], value = '', setValue = () => { }, side = '', label = '', borderBtn = false }) => {
    const selected = listItem.find((item) => item.value == value) || listItem[0];
    const [selectedItem, setSelectedItem] = useState(selected);
    const [showDropDownFlag, toggleShowDropDownFlag] = useToggle(false);

    const handleSelect = (item) => {
        setValue(item.value);
        toggleShowDropDownFlag();
    };

    useUpdateEffect(() => {
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
                className={`btn ${borderBtn ? 'cus-dropdown-btn--border' : 'cus-dropdown-btn'} ${side == 'large' ? 'w-100' : ''} `}
                onClick={toggleShowDropDownFlag}
                onBlur={() => toggleShowDropDownFlag(false)}
            >
                <span
                    className={`d-inline-flex justify-content-start align-items-center ${side == 'large' ? 'flex-grow-1 text-start ps-2' : ''}`}
                >
                    {selectedItem && selectedItem.icon}
                    <span className="ms-2">
                        {selectedItem && selectedItem.label}
                    </span>
                </span>

                <i className="fas fa-sort-down ms-2"></i>
            </button>
        </div>
    );
};

export default DropDownMenu;
