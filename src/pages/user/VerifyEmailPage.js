import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { verifyEmail } from '../../apis/user';
import Loading from '../../components/ui/Error';
import Error from '../../components/ui/Error';

const VerifyEmailPage = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { emailCode } = useParams();

    const init = () => {
        setError('');
        setIsLoading(true);
        verifyEmail(emailCode)
            .then((data) => {
                if (data.error) {
                    setError('Verify email failed');
                    setIsLoading(false);
                }
                else {
                    setSuccess(data.success);
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="d-flex m-5 w-100 h-100 position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success &&
                <Redirect type="button" className="btn btn-priamry ripple"
                    to={{
                        pathname: '/user/profile',
                        state: { from: props.location },
                    }}
                />}
        </div>
    );
};

export default VerifyEmailPage;