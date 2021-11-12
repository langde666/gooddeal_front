import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import { removeAddresses } from '../../apis/user';
import useUpdateDispatch from '../../hooks/useUpdateDispatch';
import UserEditAddressForm from '../item/form/UserEditAddressForm';
import UserAddAddressItem from '../item/UserAddAddressItem';
import Modal from '../ui/Modal';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';

const UserAddressesTable = ({ heading = true }) => {
    const [editAddress, setEditAddress] = useState({});
    const [deleteAddress, setDeleteAddress] = useState({});

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);

    const { addresses } = useSelector((state) => state.account.user);
    const [updateDispatch] = useUpdateDispatch();

    const handleEditAddress = (address, index) => {
        setEditAddress({
            index: index,
            address: address,
        });
    };

    const handleRemoveAddress = (address, index) => {
        setDeleteAddress({
            index: index,
            address: address,
        });
        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeAddresses(_id, accessToken, deleteAddress.index)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    updateDispatch('account', data.user);
                    setSuccess(data.success);
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
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
        <div className="addresses-table-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove this address"
                    message={deleteAddress.address}
                    color="danger"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            {heading && <h4 className="mb-3">Your addresses</h4>}

            {error && <Error msg={error} />}
            {success && <Success msg={success} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap">
                    <UserAddAddressItem
                        count={(addresses && addresses.length) || 0}
                    />
                </div>
                <span className="me-2">
                    {(addresses && addresses.length) || 0} results
                </span>
            </div>

            <table className="addresses-table table align-middle table-hover mt-2 text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Address</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {addresses &&
                        addresses.map((address, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td className="text-start ps-4">{address}</td>
                                <td>
                                    <div className="position-relative d-inline-block me-2">
                                        <button
                                            type="button"
                                            className="btn btn-primary ripple cus-tooltip"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit-address-form"
                                            onClick={() =>
                                                handleEditAddress(
                                                    address,
                                                    index,
                                                )
                                            }
                                        >
                                            <i className="fas fa-pen"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Edit Address
                                        </small>
                                    </div>

                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ripple cus-tooltip"
                                            onClick={() =>
                                                handleRemoveAddress(
                                                    address,
                                                    index,
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Remove address
                                        </small>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Modal
                id="edit-address-form"
                hasCloseBtn={false}
                title="Edit address"
            >
                <UserEditAddressForm
                    oldAddress={editAddress.address}
                    index={editAddress.index}
                />
            </Modal>
        </div>
    );
};

export default UserAddressesTable;
