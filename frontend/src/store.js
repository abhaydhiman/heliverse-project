import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './redux/reducers';
import domainReducer from './redux/domainReducer';
import teamReducer from './redux/teamReducer';

const rootReducer = combineReducers({
    users: userReducer,
    domain: domainReducer,
    team: teamReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
