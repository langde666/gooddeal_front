import Modal from '../ui/Modal';
import CreateTransactionFormForUser from './form/CreateTransactionFormForUser';

const CreateTransactionItemForUser = ({ eWallet = 0, onRun }) => (
    <div className="position-relative d-inline-block">
        <div className="cus-tooltip">
            <button
                type="button"
                disabled={eWallet <= 0 ? true : false}
                className="btn btn-primary ripple text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#create-transaction-form-for-user"
            >
                <i className="fas fa-comment-dollar"></i>
                <span className="ms-2 res-hide">Withdraw</span>
            </button>

            {eWallet > 0 && (
                <Modal
                    id="create-transaction-form-for-user"
                    hasCloseBtn={false}
                    title="Withdraw"
                >
                    <CreateTransactionFormForUser
                        eWallet={eWallet}
                        onRun={onRun}
                    />
                </Modal>
            )}
        </div>
        {eWallet <= 0 && (
            <small className="cus-tooltip-msg">your wallet is empty</small>
        )}
    </div>
);

export default CreateTransactionItemForUser;
