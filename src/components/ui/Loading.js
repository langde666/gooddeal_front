const Loading = ({ size = 'normal' }) => (
    <div className={`cus-loading ${size}`}>
        <div className="cus-loading-circle-animation">
            <div className="cus-loading-circle m-2">
                <div
                    className={
                        size !== 'small'
                            ? 'spinner-border text-primary'
                            : 'spinner-border text-primary spinner-border-sm'
                    }
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
);

export default Loading;
