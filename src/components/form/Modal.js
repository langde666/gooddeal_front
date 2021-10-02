import React, { Fragment } from 'react';

const Modal = ({ id, title = 'Default Title', children = null }) => {

    return (
        <Fragment>
            <div className="cus-modal modal fade" id={id} tabIndex="-1" aria-hidden="true">
                <div className="cus-modal-dialog modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title ms-2 fw-bold">{title.toLocaleUpperCase()}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary ripple" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cus-modal-backdrop fade"></div>
        </Fragment>
    );
}

export default Modal;