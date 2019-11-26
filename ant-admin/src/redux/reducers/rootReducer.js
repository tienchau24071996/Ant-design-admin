import {combineReducers} from 'redux'
import {userTableReducer} from '../../components/ContentAD/User_Managerment/User/UserTable/UserTable.reducer'
import {userUpdateReducer} from '../../components/ContentAD/User_Managerment/User/UserUpdate/UserUpdate.reducer'
import {adminTableReducer} from '../../components/ContentAD/User_Managerment/Admin/AdminTable/AdminTable.reducer'
import {adminUpdateReducer} from '../../components/ContentAD/User_Managerment/Admin/AdminUpdate/AdminUpdate.reducer'
import {adminAddReducer} from '../../components/ContentAD/User_Managerment/Admin/AdminAdd/AdminAdd.reducer'

export const rootReducer = combineReducers({
    userTableReducer,
    userUpdateReducer,
    adminTableReducer,
    adminUpdateReducer,
    adminAddReducer
})