const useRegex = () => {
    const regexes = {
        anything: /.+/,
        name: /^[A-Za-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịúùủũụưứừửữựýỳỷỹỵđÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÍÌỈĨỊÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ\d\s_'-]+$/,
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        phone: /^\d{10,11}$/,
        password:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        id_card: /(^\d{9}$|^\d{12}$)/,
        address: /^[^,]+$/,
        bio: /.+/,
    };

    const regexTest = (name, value) => regexes[name].test(value);

    return [regexTest];
};

export default useRegex;
