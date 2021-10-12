import Input from "./Input";

const ProfileVisit = ({ firstname, lastname, email, phone, id_card }) => {
    return (
        <div className="profile-form row py-2 border border-primary rounded-3">
            <div className="col-6">
                <Input
                    type="text"
                    label="First name"
                    value={firstname}
                    isDisabled={true}
                />
            </div>

            <div className="col-6">
                <Input
                    type="text"
                    label="Last name"
                    value={lastname}
                    isDisabled={true}
                />
            </div>

            <div className="col-6">
                <Input
                    type="text"
                    label="Email"
                    value={email || '-'}
                    isDisabled={true}
                />
            </div>

            <div className="col-6">
                <Input
                    type="text"
                    label="Phone"
                    value={phone || '-'}
                    isDisabled={true}
                />
            </div>

            <div className="col-6">
                <Input
                    type="text"
                    label="Id card"
                    value={id_card || '-'}
                    isDisabled={true}
                />
            </div>

        </div>
    );
}

export default ProfileVisit;