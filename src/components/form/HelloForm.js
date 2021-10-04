import { useState } from 'react';
import Input from '../other/Input';

const HelloForm = ({ onSubmit = () => {} }) => {
    const [helloContent, setHelloContent] = useState('');

    const handleInputChange = (e) => {
        setHelloContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit && helloContent != '') {
            onSubmit(helloContent.trim());
        }
    };

    return (
        <form className="hello-form row m-3 mt-4" onSubmit={handleSubmit}>
            <h1>Hello Form</h1>
            <div className="col-4">
                <Input
                    type="text"
                    label="Say Something"
                    value={helloContent}
                    onChange={handleInputChange}
                />
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
