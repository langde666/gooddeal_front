import { formatPrice } from '../../helper/formatPrice';

const EWalletInfo = ({ eWallet = 0 }) => (
    <div className="d-inline-flex justify-content-start align-items-center link-golden fs-2">
        <i className="fas fa-coins me-3"></i>
        <span>{formatPrice(eWallet)} VND</span>
    </div>
);

export default EWalletInfo;
