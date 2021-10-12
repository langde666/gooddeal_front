import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../../apis/auth';
import { removeAddresses } from '../../apis/user';
import { addUser } from '../../actions/user';
import EditAddressForm from '../user/form/EditAddressForm';
import Modal from './Modal';
import Loading from './Loading';
import Error from './Error';
import Success from './Success';
import ConfirmDialog from './ConfirmDialog';

const AddressesTable = ({ listAddresses }) => {
    const [index, setIndex] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);

    const dispatch = useDispatch();

    const handleRemoveAddress = (index) => {
        setIndex(index);
        setIsConfirming(true);
    }

    const onSubmit = () => {
        const { _id, accessToken } = getToken();
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeAddresses(_id, accessToken, index)
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
                    setSuccess(data.success);
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
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
        <div className="addresses-table-wrap position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success && <Success msg={success} />}
            {isConfirming && (
                <ConfirmDialog
                    title='Remove this address'
                    message={listAddresses[index]}
                    color='danger'
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            <table className="addresses-table table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col-6">Address</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {listAddresses && listAddresses.map((address, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{address}</td>
                            <td>
                                <div className="position-relative d-inline-block me-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary ripple cus-tooltip"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#edit-address-form-${index}`}
                                    >
                                        <i className="fas fa-pen"></i>
                                    </button>

                                    <Modal
                                        id={`edit-address-form-${index}`}
                                        hasCloseBtn={false}
                                        title="Edit address"
                                    >
                                        <EditAddressForm oldAddress={address} index={index} />
                                    </Modal>

                                    <small className="cus-tooltip-msg">Edit Address</small>
                                </div>

                                <div className="position-relative d-inline-block">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger ripple cus-tooltip"
                                        onClick={() => handleRemoveAddress(index)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <small className="cus-tooltip-msg">Remove address</small>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AddressesTable;