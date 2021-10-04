const Error = ({ error = 'Something is wrong!' }) => (
    <p className="text-danger" role="alert">
        {error}
    </p>
);

export default Error;
