import { useState, useEffect } from 'react';
import ValueSelectorItem from './ValueSelectorItem';

const StyleValueSelector = ({ listValues = [], isEditable = true, onSet }) => {
    const [values, setValues] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    const init = () => {
        let defaultList = [];

        listValues.forEach((value) => {
            let flag = true;
            defaultList.forEach((list) => {
                if (value.styleId._id === list[0].styleId._id) {
                    list.push(value);
                    flag = false;
                }

                list.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
            });

            if (flag) defaultList.push([value]);
        });

        // console.log(defaultList);
        setValues(defaultList);
    };

    useEffect(() => {
        init();
    }, [listValues]);

    const handleSet = (oldValue, newValue) => {
        if (isEditable) {
            const newArray = selectedValues;
            const index = newArray.map((v) => v._id).indexOf(oldValue._id);
            if (index !== -1) {
                newArray.splice(index, 1);
                newArray.push(newValue);
            } else {
                newArray.push(newValue);
            }

            // console.log(newArray);
            setSelectedValues(newArray);
            if (onSet) onSet(newArray);
        }
    };

    return (
        <div className="d-flex flex-column">
            {values.map((list, index) => (
                <ValueSelectorItem
                    key={index}
                    listValues={list}
                    isEditable={isEditable}
                    onSet={(oldValue, newValue) =>
                        handleSet(oldValue, newValue)
                    }
                />
            ))}
        </div>
    );
};

export default StyleValueSelector;