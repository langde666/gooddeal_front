import React from 'react';

const Logo = ({ noBackground = false }) => {
    return (
        <h1
            className={
                !noBackground
                    ? 'logo m-0 p-1 bg-primary text-white rounded noselect'
                    : 'logo m-0 p-1 text-primary rounded noselect'
            }
        >
            <span
                className={
                    !noBackground
                        ? 'bg-light text-primary px-1 me-1 rounded-2'
                        : 'bg-primary text-white px-1 me-1 rounded-2'
                }
            >
                Good
            </span>
            DeaL!
        </h1>
    );
};

export default Logo;
