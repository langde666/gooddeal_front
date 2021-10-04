const useRegex = () => {
    const regexes = {
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        phone: /^\d{10,11}$/,
        password:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        passwordLess: /^[A-Za-z\d@$!%*?&]+$/,
    };

    const regexTest = (name, value) => regexes[name].test(value);

    return [regexTest];
};

export default useRegex;
