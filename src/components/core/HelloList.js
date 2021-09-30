import React from 'react';

const HelloList = ({ helloList = [], activeId = null, onClick = () => { } }) => {
    const handlerClick = (hello) => {
        if (onClick) {
            onClick(hello);
        }
    }

    return (
        <ul className="hello-list row list-group m-4">
            {helloList.map(hello => (
                <li
                    key={hello.id}
                    className={hello.id == activeId ? 'col-6 list-group-item active' : 'col-6 list-group-item'}
                    aria-current={hello.id == activeId ? 'true' : 'false'}
                    onClick={() => handlerClick(hello)}
                >
                    {hello.content}
                </li>
            ))}
        </ul>
    );
};

export default HelloList;
