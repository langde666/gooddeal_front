import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../actions/user';
import { getToken } from '../../../apis/auth';
import { addAddress } from '../../../apis/user';
import useRegex from '../../../hooks/useRegex';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const AddAddressForm = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [address, setAddress] = useState({
        street: '',
        ward: '',
        district_city: '',
        city_province: '',
        country: 'Việt Nam',
        isValidStreet: true,
        isValidWard: true,
        isValidDistrict: true,
        isValidProvince: true,
        isValidCountry: true,
    });

    const [regexTest] = useRegex();
    const dispatch = useDispatch();

    const handleChange = (e, name) => {
        switch (name) {
            case 'street': {
                setAddress({
                    ...address,
                    [name]: e.target.value,
                    isValidStreet: true,
                });
                return;
            }
            case 'ward': {
                setAddress({
                    ...address,
                    [name]: e.target.value,
                    isValidWard: true,
                });
                return;
            }
            case 'district_city': {
                setAddress({
                    ...address,
                    [name]: e.target.value,
                    isValidDistrict: true,
                });
                return;
            }
            case 'city_province': {
                setAddress({
                    ...address,
                    [name]: e.target.value,
                    isValidProvince: true,
                });
                return;
            }
            case 'country': {
                setAddress({
                    ...address,
                    [name]: e.target.value,
                    isValidCountry: true,
                });
                return;
            }
        }
    }

    const handleValidate = (name) => {
        switch (name) {
            case 'street': {
                setAddress({
                    ...address,
                    isValidStreet: regexTest('address', address[name]),
                });
                return;
            }
            case 'ward': {
                setAddress({
                    ...address,
                    isValidWard: regexTest('address', address[name]),
                });
                return;
            }
            case 'district_city': {
                setAddress({
                    ...address,
                    isValidDistrict: regexTest('address', address[name]),
                });
                return;
            }
            case 'city_province': {
                setAddress({
                    ...address,
                    isValidProvince: regexTest('address', address[name]),
                });
                return;
            }
            case 'country': {
                setAddress({
                    ...address,
                    isValidCountry: regexTest('address', address[name]),
                });
                return;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { street, ward, district_city, city_province, country } = address;
        if (!street || !ward || !district_city || !city_province || !country) {
            setAddress({
                ...address,
                isValidStreet: regexTest('address', street),
                isValidWard: regexTest('address', ward),
                isValidDistrict: regexTest('address', district_city),
                isValidProvince: regexTest('address', city_province),
                isValidCountry: regexTest('address', country),
            });
            return;
        }

        const { isValidStreet, isValidWard, isValidDistrict, isValidProvince, isValidCountry } = address;
        if (!isValidStreet || !isValidWard || !isValidDistrict || !isValidProvince || !isValidCountry) {
            return;
        }

        setIsConfirming(true);
    }

    const onSubmit = () => {
        const addressString = address.street + ', ' + address.ward + ', ' + address.district_city
            + ', ' + address.city_province + ', ' + address.country;
        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        addAddress(_id, accessToken, { address: addressString })
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addUser(data.user));
                    setAddress({
                        street: '',
                        ward: '',
                        district_city: '',
                        city_province: '',
                        country: 'Việt Nam',
                        isValidStreet: true,
                        isValidWard: true,
                        isValidDistrict: true,
                        isValidProvince: true,
                        isValidCountry: true,
                    });
                    setSuccess(data.success);
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                }
            })
            .catch((error) => {
                setError('Sever error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="add-address-form-wrap position-relative">
            {isloading && <Loading />}

            {isConfirming && <ConfirmDialog
                title='Add new address'
                onSubmit={onSubmit}
                onClose={() => setIsConfirming(false)}
            />}

            <form className="add-address-form row mb-2" onSubmit={handleSubmit}>
                <div className="col-12">
                    <Input
                        type="text"
                        label="Street address"
                        value={address.street}
                        isValid={address.isValidStreet}
                        feedback='Please provide a valid street address ("," is not allowed).'
                        onChange={(e) => handleChange(e, 'street')}
                        onBlur={() => handleValidate('street')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Ward"
                        value={address.ward}
                        isValid={address.isValidWard}
                        feedback='Please provide a valid ward ("," is not allowed).'
                        onChange={(e) => handleChange(e, 'ward')}
                        onBlur={() => handleValidate('ward')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="City / district"
                        value={address.district_city}
                        isValid={address.isValidDistrict}
                        feedback='Please provide a valid city / district ("," is not allowed).'
                        onChange={(e) => handleChange(e, 'district_city')}
                        onBlur={() => handleValidate('district_city')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Province / city"
                        value={address.city_province}
                        isValid={address.isValidProvince}
                        feedback='Please provide a valid province / city ("," is not allowed).'
                        onChange={(e) => handleChange(e, 'city_province')}
                        onBlur={() => handleValidate('city_province')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Country"
                        value={address.country}
                        isValid={address.isValidCountry}
                        feedback='Please provide a valid country ("," is not allowed).'
                        onChange={(e) => handleChange(e, 'country')}
                        onBlur={() => handleValidate('country')}
                    />
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                {success && (
                    <div className="col-12">
                        <Success msg={success} />
                    </div>
                )}

                <div className="col-12 d-grid mt-4">
                    <button type="submit" className="btn btn-primary ripple"
                        onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddAddressForm;