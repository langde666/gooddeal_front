import React, { useState } from 'react';

const HelloForm = ({ onSubmit = () => { } }) => {
    const [helloContent, setHelloContent] = useState('');

    const handleInputChange = (e) => {
        setHelloContent(e.target.value.trim());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit && helloContent != '') {
            onSubmit(helloContent);
        }
    };

    return (
        <form className="hello-form row m-3 mt-4" onSubmit={handleSubmit}>
            <h1>Hello Form</h1>
            <div className="col-4 cus-input-group">
                <input
                    type="text"
                    className="form-control cus-input-group-input"
                    id="inputHello"
                    placeholder=""
                    required
                    onChange={handleInputChange}
                />
                <label htmlFor="inputHello" className="cus-input-group-label">
                    Say Something
                </label>
                <span className="cus-input-group-bar"></span>
            </div>
            <div className="col-2 mt-4">
                <button
                    type="submit"
                    className="btn btn-primary ripple"
                    onClick={handleSubmit}
                >
                    Say Hello
                </button>
            </div>
        </form>
    );
};

export default HelloForm;
