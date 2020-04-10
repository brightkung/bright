import { combineReducers } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";


const initState = {
    projects: [
        {id: '1', title: 'help me find peach', content: 'eieieiei'},
        {id: '2', title: 'hello Bro', content: 'eieieiei'},
        {id: '3', title: 'egg hunt with Me', content: 'eieieiei'}
    ]
}

const projectReducer = (state = initState, action) => {
    switch( action.type){
        case 'CREATE_PORJECT':
            console.log('create project',action.project)
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error',action.err);
            return state;
        default:
            return state;
    }
    
}

export default projectReducer