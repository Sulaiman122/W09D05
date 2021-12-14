import { createStore, combineReducers } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import SignIn from './login'
import LogOut from './logout'

const reducers = combineReducers({ SignIn, LogOut })
const store= ()=> {
    return createStore(reducers, composeWithDevTools());
}

export default store();