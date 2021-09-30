import React, { useState } from 'react';

const HelloForm = ({ onSubmit = () => { } }) => {
    const [helloContent, setHelloContent] = useState('');

    const handleInputChange = (e) => {
        setHelloContent(e.target.value.trim());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit && helloContent != '') {
            onSubmit(helloContent)
        }
    }

    return (
        <form className="hello-form row m-3" onSubmit={handleSubmit}>
            <h1>Hello Form</h1>
            <div className="col-4">
                <label htmlFor="inputHello" className="visually-hidden">Hello</label>
                <input type="text" className="form-control" id="inputHello" placeholder="Hello World!" required onChange={handleInputChange} />
                <span className="bar"></span>
            </div>
            <div className="col-2">
                <button type="submit" className="btn btn-primary ripple" onClick={handleSubmit}>Say Hello</button>

            </div>
        </form>
    );
}

export default HelloForm;