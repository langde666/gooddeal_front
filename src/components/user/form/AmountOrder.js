import { useSelector } from "react-redux";
import Input from "../../ui/Input";

const AmountOrder = (props) => {
    const { point, number_of_successful_orders, number_of_failed_orders } = useSelector(state => state.user.user);

    return (
        <div className="profile-form row py-2 border border-primary rounded-3">
            <div className="col-6">
                <Input
                    type="text"
                    label="Point"
                    value={point}
                    isDisabled={true}
                />
            </div>

            <div className="col-6 mt-2">
                <span className='badge bg-info'>
                    <i className="fas fa-shield-alt me-2"></i>
                    call api user level...
                </span>
            </div>

            <div className="col-12">
                <Input
                    type="text"
                    label="Sucessful / failed orders"
                    value={number_of_successful_orders + ' / ' + number_of_failed_orders}
                    isDisabled={true}
                />
            </div>
        </div>
    );
}

export default AmountOrder;