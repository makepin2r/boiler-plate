import {combineReducers} from 'redux';
import user from './user_reducer';

const  rootReducer = combineReducers({
    // 사용하는 모든 reducer들을 여기에서 병합한다
    user
});

export default rootReducer;