import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {reducer as home} from './home';
import {reducer as user} from './user';
import {reducer as common} from './reducer';
import {reducer as messages} from './chat';

const reducers = combineReducers({
    home,
    user,
    common,
    messages
});

export default createStore(reducers,applyMiddleware(thunkMiddleware));