import { Fragment } from 'react';
import Logo from '../NavComponent/Logo';

const Modal = ({
    id,
    title = '',
    subTitle = '',
    hasCloseBtn = true,
    children = null,
}) => {
    return (
        <Fragment>
            <div
                className="cus-modal modal fade"
                id={id}
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="cus-modal-dialog modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-header-wrap">
                                {title ? (
                                    <h5 className="modal-title ms-2 text-uppercase fw-bold">
                                        {title}
                                    </h5>
                                ) : (
                                    <Logo noBackground={true} />
                                )}

                                {subTitle && (
                                    <p className="modal-title ms-2 fw-light">
                                        {subTitle}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">{children}</div>

                        {hasCloseBtn && (
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary ripple"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="cus-modal-backdrop fade"></div>
        </Fragment>
    );
};

export default Modal;
