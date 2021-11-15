import { useState, useEffect } from 'react';
import { listStyleByCategory } from '../../apis/style';
import Error from '../ui/Error';
import Loading from '../ui/Loading';

const StyleSelector = ({
    categoryId = '',
    label = 'Choosed category',
    onSet,
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [styles, setStyles] = useState([]);

    const init = () => {
        setError('');
        setIsLoading(true);
        listStyleByCategory(categoryId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setStyles(data.styles);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (categoryId) init();
        else setStyles([]);
        if (onSet) onSet([]);
    }, [categoryId]);

    return (
        <div className="row position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            {styles.map((style, index) => (
                <div className="col-12 mt-2 mx-3" key={index}>
                    {style.name}
                </div>
            ))}
        </div>
    );
};

export default StyleSelector;
