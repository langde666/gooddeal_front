import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import { createStore } from '../../../apis/store';
import { listActiveCommissions as getlistCommissions } from '../../../apis/commission';
import useRegex from '../../../hooks/useRegex';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import DropDownMenu from '../../ui/DropDownMenu';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import ConfirmDialog from '../../ui/ConfirmDialog';

const commissionIcons = [
    <i className="fas fa-cash-register"></i>,
    <i className="fas fa-building"></i>,
    <i className="far fa-building"></i>,
];

const CreateShopForm = (props) => {
    const [listActiveCommissions, setListActiveCommissions] = useState([]);
    const [shop, setShop] = useState({
        name: '',
        bio: '',
        commissionId: '',
        isValidName: true,
        isValidBio: true,
    });
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error1, setError1] = useState('');
    const [error, setError] = useState('');
    const [regexTest] = useRegex();
    const history = useHistory();

    const init = () => {
        getlistCommissions()
            .then(data => {
                if (data.error) {
                    setError1(data.error);
                } else {
                    setListActiveCommissions(data.commissions);
                    setShop({
                        ...shop,
                        commissionId: data.commissions[0]._id,
                    });
                }
            })
            .catch(error => setError1('Server Error'));
    }

    useEffect(() => {
        init();
    }, []);

    const handleChange = (e, name) => {
        switch (name) {
            case 'name': {
                setShop({
                    ...shop,
                    name: e.target.value,
                    isValidName: true,
                });
                return;
            }
            case 'bio': {
                setShop({
                    ...shop,
                    bio: e.target.value,
                    isValidName: true,
                });
                return;
            }
        }
    }

    const handleSelect = (value) => {
        setShop({
            ...shop,
            commissionId: value,
        });
    }
    const handleValidate = (name) => {
        switch (name) {
            case 'name': {
                setShop({
                    ...shop,
                    isValidName: regexTest('name', shop.name),
                });
                return;
            }
            case 'bio': {
                setShop({
                    ...shop,
                    isValidName: regexTest('bio', shop.bio),
                });
                return;
            }
        }
    }

    const handleSubmit = (e) => {
        if (!shop.name || !shop.bio) {
            setShop({
                ...shop,
                isValidName: regexTest('name', shop.name),
                isValidName: regexTest('bio', shop.bio),
            });
            return;
        }

        if (!shop.isValidName || !shop.isValidBio) {
            return;
        }

        setIsConfirming(true);
    }

    const onSubmit = () => {
        const store = { name: shop.name, bio: shop.bio, commissionId: shop.commissionId };
        const { _id, accessToken } = getToken();

        setError('');
        setIsLoading(true);
        createStore(_id, accessToken, store)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    history.push(`/vendor/${data.store._id}/profile`);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="create-shop-form-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && <ConfirmDialog
                title='Create shop'
                message={
                    <small className="">
                        By Creating your shop, you agree to GoodDeal's{' '}
                        <Link to="/legal/termsOfUse" target="_blank">
                            Terms of Use
                        </Link>
                        {' '}and{' '}
                        <Link to="/legal/privacy" target="_blank">Privacy Policy</Link>
                        . How you'll get paid? Set up billing?{' '}
                        <Link to="/legal/sellOnGoodDeal" target="_blank">
                            Sell on GoodDeal
                        </Link>
                        .
                    </small>
                }
                onSubmit={onSubmit}
                onClose={() => setIsConfirming(false)}
            />}

            <form className="create-shop-form row mb-2" onSubmit={handleSubmit}>
                <div className="col-12 mt-2">
                    {error1 && <Error msg={error1} />}
                    {!error1 &&
                        <DropDownMenu
                            listItem={listActiveCommissions && listActiveCommissions.map((c, i) => {
                                const newC = {
                                    value: c._id,
                                    label: c.name + ' (' + (c.cost.$numberDecimal * 100).toFixed(2) + '% / order)',
                                    icon: commissionIcons[i]
                                };
                                return newC;
                            })}
                            value={shop.commissionId}
                            setValue={handleSelect}
                            side='large'
                            label='Commission'
                        />}
                </div>

                <div className="col-12 mt-4">
                    <small className="text-center d-block mx-2">
                        <span className="text-muted">
                            How you'll get paid? Set up billing?{' '}
                        </span>
                        <Link to="/legal/sellOnGoodDeal" target="_blank">
                            Sell on GoodDeal
                        </Link>
                        .
                    </small>
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Shop name"
                        value={shop.name}
                        isValid={shop.isValidName}
                        feedback='Please provide a valid shope name.'
                        onChange={(e) => handleChange(e, 'name')}
                        onBlur={() => handleValidate('name')}
                    />
                </div>

                <div className="col-12">
                    <TextArea
                        type="text"
                        label="Shop bio"
                        value={shop.bio}
                        isValid={shop.isValidBio}
                        feedback='Please provide a valid shope bio.'
                        onChange={(e) => handleChange(e, 'name')}
                        onBlur={() => handleValidate('name')}
                    />
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                <div className="col-12 mt-4">
                    <small className="text-center d-block mx-2">
                        <span className="text-muted">
                            By Creating shop, you agree to GoodDeal's{' '}
                        </span>
                        <Link to="/legal/termsOfUse" target="_blank">
                            Terms of Use
                        </Link>
                        <span className="text-muted">
                            {' '}and{' '}
                        </span>
                        <Link to="/legal/privacy" target="_blank">Privacy Policy</Link>.
                    </small>
                </div>

                <div className="col-12 d-grid mt-4">
                    <button type="submit" className="btn btn-primary ripple"
                        onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateShopForm;