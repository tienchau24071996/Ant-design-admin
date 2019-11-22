import {combineReducers} from 'redux'
import {userTableReducer} from '../../components/ContentAD/User_Managerment/User/UserTable/UserTable.reducer'
import {userUpdateReducer} from '../../components/ContentAD/User_Managerment/User/UserUpdate/UserUpdate.reducer'

export const rootReducer = combineReducers({
    userTableReducer,
    userUpdateReducer
})