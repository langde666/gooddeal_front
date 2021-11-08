import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import { createStore } from '../../../apis/store';
import { listActiveCommissions as getlistCommissions } from '../../../apis/commission';
import { regexTest } from '../../../helper/test';
import Input from '../../ui/Input';
import InputFile from '../../ui/InputFile';
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
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error1, setError1] = useState('');
    const [error, setError] = useState('');

    const [listActiveCommissions, setListActiveCommissions] = useState([]);
    const [shop, setShop] = useState({
        name: '',
        bio: '',
        commissionId: '',
        avatar: '',
        cover: '',
        isValidName: true,
        isValidBio: true,
        isValidAvatar: true,
        isValidCover: true,
    });

    const history = useHistory();

    const init = () => {
        getlistCommissions()
            .then((data) => {
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
            .catch((error) => setError1('Server Error'));
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = (name, isValidName, value) => {
        setShop({
            ...shop,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        setShop({
            ...shop,
            [isValidName]: flag,
        });
    };

    const handleSelect = (value) => {
        setShop({
            ...shop,
            commissionId: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!shop.name || !shop.bio || !shop.avatar || !shop.cover) {
            setShop({
                ...shop,
                isValidName: regexTest('name', shop.name),
                isValidBio: regexTest('bio', shop.bio),
                isValidAvatar: !!shop.avatar,
                isValidCover: !!shop.cover,
            });
            return;
        }

        if (
            !shop.isValidName ||
            !shop.isValidBio ||
            !shop.avatar ||
            !shop.cover
        )
            return;

        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();

        const formData = new FormData();
        formData.set('name', shop.name);
        formData.set('bio', shop.bio);
        formData.set('commissionId', shop.commissionId);
        formData.set('avatar', shop.avatar);
        formData.set('cover', shop.cover);

        setError('');
        setIsLoading(true);
        createStore(_id, accessToken, formData)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    history.push(`/vendor/${data.storeId}`);
                }
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="create-shop-form-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Create shop"
                    message={
                        <small>
                            By Creating your shop, you agree to GoodDeal's{' '}
                            <Link to="/legal/termsOfUse" target="_blank">
                                Terms of Use
                            </Link>{' '}
                            and{' '}
                            <Link to="/legal/privacy" target="_blank">
                                Privacy Policy
                            </Link>
                            . How you'll get paid? Set up billing?{' '}
                            <Link to="/legal/sellOnGoodDeal" target="_blank">
                                Sell on GoodDeal
                            </Link>
                            .
                        </small>
                    }
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form className="create-shop-form row mb-2" onSubmit={handleSubmit}>
                <div className="col-12">
                    <InputFile
                        label="Shop avatar"
                        size="avatar"
                        value={shop.avatar}
                        isValid={shop.isValidAvatar}
                        feedback="Please provide a valid shop avatar."
                        accept="image/jpg, image/jpeg, image/png, image/gif"
                        onChange={(value) =>
                            handleChange('avatar', 'isValidAvatar', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidAvatar', flag)
                        }
                    />
                </div>

                <div className="col-12">
                    <InputFile
                        label="Shop cover"
                        size="cover"
                        value={shop.cover}
                        isValid={shop.isValidCover}
                        feedback="Please provide a valid shop cover."
                        accept="image/jpg, image/jpeg, image/png, image/gif"
                        onChange={(value) =>
                            handleChange('cover', 'isValidCover', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidCover', flag)
                        }
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Shop name"
                        value={shop.name}
                        isValid={shop.isValidName}
                        feedback="Please provide a valid shop name."
                        validator="name"
                        onChange={(value) =>
                            handleChange('name', 'isValidName', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidName', flag)
                        }
                    />
                </div>

                <div className="col-12">
                    <TextArea
                        type="text"
                        label="Shop bio"
                        value={shop.bio}
                        isValid={shop.isValidBio}
                        feedback="Please provide a valid shop bio."
                        validator="bio"
                        onChange={(value) =>
                            handleChange('bio', 'isValidBio', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidBio', flag)
                        }
                    />
                </div>

                <div className="col-12 mt-2">
                    {error1 && <Error msg={error1} />}
                    {!error1 && (
                        <DropDownMenu
                            listItem={
                                listActiveCommissions &&
                                listActiveCommissions.map((c, i) => {
                                    const newC = {
                                        value: c._id,
                                        label:
                                            c.name +
                                            ' (' +
                                            (
                                                c.cost.$numberDecimal * 100
                                            ).toFixed(2) +
                                            '% / order)',
                                        icon: commissionIcons[i],
                                    };
                                    return newC;
                                })
                            }
                            value={shop.commissionId}
                            setValue={handleSelect}
                            side="large"
                            label="Commission"
                        />
                    )}
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
                        <span className="text-muted"> and </span>
                        <Link to="/legal/privacy" target="_blank">
                            Privacy Policy
                        </Link>
                        .{' '}
                        <span className="text-muted">
                            How you'll get paid? Set up billing?{' '}
                        </span>
                        <Link to="/legal/sellOnGoodDeal" target="_blank">
                            Sell on GoodDeal
                        </Link>
                        .
                    </small>
                </div>

                <div className="col-12 d-grid mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary ripple"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateShopForm;
