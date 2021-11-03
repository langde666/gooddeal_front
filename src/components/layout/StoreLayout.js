import MainLayout from './MainLayout';
import StoreNav from './menu/StoreNav';
import Cover from '../image/Cover';
import Avatar from '../image/Avatar';
import StoreStatusLabel from '../label/StoreStatusLabel';
import StoreLevelInfo from '../info/StoreLevelInfo';

const StoreLayout = ({ store = {}, children = null }) => (
    <MainLayout container="container" navFor="user">
        <div
            className="store-layout row"
            style={{ maxWidth: '990px', margin: '0 auto' }}
        >
            <div className="col-12 position-relative shadow">
                <Cover cover={store.cover} alt={store.name} />
                <div className="avatar-absolute avatar-absolute--store">
                    <Avatar
                        avatar={store.avatar}
                        name={
                            <span className="d-inline-flex justify-content-center align-items-center">
                                {store.name}
                                <small className="ms-2">
                                    <StoreStatusLabel isOpen={store.isOpen} />
                                </small>
                            </span>
                        }
                        alt={store.name}
                        bodername={true}
                    />
                </div>
                <div className="level-group-absolute">
                    <StoreLevelInfo store={store} />
                </div>
            </div>

            <StoreNav store={store} />

            <div className="store-page-main mt-4">{children}</div>
        </div>
    </MainLayout>
);

export default StoreLayout;

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../../actions/store';

// function mapStateToProps(state) {
//     return { store: state.store.store }
// }

// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators({ actionCreators }, dispatch) }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StoreLayout);
