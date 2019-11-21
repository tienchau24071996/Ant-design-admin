import {connect} from 'react-redux'
import {onGetListUser,onDeleteUser} from './UserTable.action'
import userTable from './UserTable'

const mapStateToProps = state => {
    let {userTableReducer} = state  
    console.log(userTableReducer.user);
    
    return {
        user: userTableReducer.user,
        isLoading: userTableReducer.isLoading,
        isError: userTableReducer.isError,
        errorMessage: userTableReducer.errorMessage
    }
}

const mapDispatchToProps = {onGetListUser,onDeleteUser}

export default connect(mapStateToProps, mapDispatchToProps)(userTable)