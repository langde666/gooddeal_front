const ConfirmDialog = ({
    title = 'Confirm the action',
    message = 'Are you sure about that?',
    color = 'primary',
    onSubmit = () => {},
    onClose = () => {},
}) => {
    const onConfirm = () => {
        onSubmit();
        onClose();
    };

    return (
        <div className="cus-dialog-wrap">
            <div
                className="cus-dialog cus-modal modal fade show"
                tabIndex="-1"
                aria-modal="true"
                role="dialog"
                style={{ display: 'block', paddingLeft: '0px' }}
            >
                <div className="cus-modal-dialog modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={`modal-title text-${color}`}>
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">{message}</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-danger ripple"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary ripple"
                                onClick={onConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cus-modal-backdrop fade"></div>
        </div>
    );
};

export default ConfirmDialog;
