import React from 'react';
import '../../css/Hello.css';
import HelloList from './HelloList';
import HelloForm from '../form/HelloForm';
import { useSelector, useDispatch } from 'react-redux';
import { addNewHello, setActiveHello } from '../../actions/hello';
import faker from 'faker';

const Hello = (props) => {
    const helloList = useSelector(state => state.hello.list);
    const activeId = useSelector(state => state.hello.activeId);

    const dispatch = useDispatch();

    const handleAddHello = (helloContent) => {
        const newhello = {
            id: faker.datatype.uuid(),
            content: helloContent,
        }

        const action = addNewHello(newhello);
        dispatch(action);
    }

    const handleActiveHello = (hello) => {
        const action = setActiveHello(hello);
        dispatch(action);
    }

    return (
        <div className="hello">
            <HelloForm
                onSubmit={handleAddHello}
            />

            <HelloList
                helloList={helloList}
                activeId={activeId}
                onClick={handleActiveHello}
            />
        </div>
    );
};

export default Hello;
