import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { listCategories, listActiveCategories } from '../../apis/category';
import SearchInput from '../ui/SearchInput';
import Error from '../ui/Error';
import Loading from '../ui/Loading';

const MultiCategorySelector = ({
    defaultValue = '',
    isActive = false,
    onSet = () => {},
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [lv1Categories, setLv1Categories] = useState([]);
    const [lv2Categories, setLv2Categories] = useState([]);
    const [lv3Categories, setLv3Categories] = useState([]);
    const [lv1Filter, setLv1Filter] = useState({
        search: '',
        categoryId: null,
        sortBy: 'name',
        order: 'asc',
        limit: 100,
        page: 1,
    });
    const [lv2Filter, setLv2Filter] = useState({
        search: '',
        categoryId: '',
        sortBy: 'name',
        order: 'asc',
        limit: 100,
        page: 1,
    });
    const [lv3Filter, setLv3Filter] = useState({
        search: '',
        categoryId: '',
        sortBy: 'name',
        order: 'asc',
        limit: 100,
        page: 1,
    });

    const [nonSelectedCategories, setNonSelectedCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(defaultValue);

    const loadCategories = (filter, setCategories) => {
        setError('');
        setIsLoading(true);
        if (isActive) {
            listActiveCategories(filter)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setCategories(data.categories);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        } else {
            const { _id, accessToken } = getToken();
            listCategories(_id, accessToken, filter)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setCategories(data.categories);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        setSelectedCategories(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        loadCategories(lv1Filter, setLv1Categories);
    }, [lv1Filter]);

    useEffect(() => {
        if (lv2Filter.categoryId) loadCategories(lv2Filter, setLv2Categories);
        else setLv2Categories([]);
    }, [lv2Filter]);

    useEffect(() => {
        if (lv3Filter.categoryId) loadCategories(lv3Filter, setLv3Categories);
        else setLv3Categories([]);
    }, [lv3Filter]);

    useEffect(() => {
        setNonSelectedCategories(
            lv3Categories.filter((c) => selectedCategories.indexOf(c) === -1),
        );
    }, [lv3Categories]);

    const handleChangeKeyword = (keyword) => {
        setLv1Filter({
            ...lv1Filter,
            search: keyword,
        });

        setLv2Filter({
            ...lv2Filter,
            categoryId: '',
        });

        setLv3Filter({
            ...lv3Filter,
            categoryId: '',
        });
    };

    const handleClick = (filter, setFilter, category) => {
        if ((setFilter, filter))
            setFilter({
                ...filter,
                categoryId: category._id,
            });

        if (filter === lv2Filter)
            setLv3Filter({
                ...lv3Filter,
                categoryId: '',
            });
    };

    const handleAdd = (category) => {
        setSelectedCategories([...selectedCategories, category]);
        setNonSelectedCategories(
            nonSelectedCategories.filter((c) => c._id !== category._id),
        );

        if (onSet) onSet([...selectedCategories, category]);
    };

    const handleRemove = (category) => {
        if (lv3Categories.indexOf(category) !== -1)
            setNonSelectedCategories([...nonSelectedCategories, category]);

        setSelectedCategories(
            selectedCategories.filter((c) => c._id !== category._id),
        );

        if (onSet)
            onSet(selectedCategories.filter((c) => c._id !== category._id));
    };

    return (
        <div className="row">
            <div className="col">
                <SearchInput onChange={handleChangeKeyword} />
            </div>

            <div className="col-12 position-relative">
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <div className="d-flex border p-1 mt-2">
                    <div
                        className="list-group m-1"
                        style={{
                            width: '33.33333%',
                            overflowY: 'auto',
                        }}
                    >
                        {lv1Categories &&
                            lv1Categories.map((category, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center ${
                                        category._id == lv2Filter.categoryId &&
                                        'active'
                                    }`}
                                    onClick={() =>
                                        handleClick(
                                            lv2Filter,
                                            setLv2Filter,
                                            category,
                                        )
                                    }
                                >
                                    {category.name}
                                    <i className="fas fa-angle-right"></i>
                                </button>
                            ))}
                    </div>

                    <div
                        className="list-group m-1"
                        style={{
                            width: '33.33333%',
                            overflowY: 'auto',
                        }}
                    >
                        {lv2Categories &&
                            lv2Categories.map((category, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center  ${
                                        category._id == lv3Filter.categoryId &&
                                        'active'
                                    }`}
                                    onClick={() =>
                                        handleClick(
                                            lv3Filter,
                                            setLv3Filter,
                                            category,
                                        )
                                    }
                                >
                                    {category.name}
                                    <i className="fas fa-angle-right"></i>
                                </button>
                            ))}
                    </div>

                    <div
                        className="list-group m-1"
                        style={{
                            width: '33.33333%',
                            overflowY: 'auto',
                        }}
                    >
                        {selectedCategories &&
                            selectedCategories.map((category, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="list-group-item ripple list-group-item-action active d-flex justify-content-between align-items-center"
                                    onClick={() => handleRemove(category)}
                                >
                                    {category.name}
                                    <i className="fas fa-check-square"></i>
                                </button>
                            ))}

                        {nonSelectedCategories &&
                            nonSelectedCategories.map((category, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => handleAdd(category)}
                                >
                                    {category.name}
                                    <i className="far fa-check-square"></i>
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiCategorySelector;
