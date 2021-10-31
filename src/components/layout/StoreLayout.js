import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../../actions/store';
import MainLayout from './MainLayout';
import StoreNav from './menu/StoreNav';
import Cover from '../ui/Cover';
import Avatar from '../ui/Avatar';
import StoreStatusLabel from '../ui/label/StoreStatusLabel';
import StoreLevelInfo from '../ui/info/StoreLevelInfo';

const StoreLayout = ({ children = null }) => {
    const store = useSelector(state => state.store.store);

    return (
        <MainLayout container="container">
            <div className="store-layout row" style={{ maxWidth: '990px', margin: '0 auto' }}>
                <div className="col-12 position-relative shadow">
                    <Cover cover={store.cover} />
                    <div className="avatar-absolute avatar-absolute--store">
                        <Avatar
                            avatar={store.avatar}
                            name={
                                <span className="d-inline-flex justify-content-center align-items-center">
                                    {store.name}
                                    <small className="ms-2">
                                        <StoreStatusLabel isOpen={store.isOpen} detail={true} />
                                    </small>
                                </span>
                            }
                            bodername={true}
                        />
                    </div>
                    <div className="level-group-absolute">
                        <StoreLevelInfo store={store} />
                    </div>
                </div>

                <StoreNav storeId={store._id} />

                <div className="store-page-main mt-4">
                    {children}
                </div>
            </div>
        </MainLayout>
    );
}

export default StoreLayout;

// function mapStateToProps(state) {
//     return { store: state.store.store }
// }

// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators({ actionCreators }, dispatch) }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StoreLayout);