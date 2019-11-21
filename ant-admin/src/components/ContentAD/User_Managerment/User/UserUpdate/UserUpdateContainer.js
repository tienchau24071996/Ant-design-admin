import {connect} from 'react-redux'
import {onGetUser, onUpdateUser} from './UserUpdate.action'
import userUpdate from './UserUpdate'

const mapStateToProps = state => {
    let {userUpdateReducer} = state
    return {
        userDetail: userUpdateReducer.userDetail,
        isLoading: userUpdateReducer.isLoading,
        isError: userUpdateReducer.isError,
        errorMessage: userUpdateReducer.errorMessage
    }
}

const mapDispatchToProps = {onGetUser, onUpdateUser}

export default connect(mapStateToProps, mapDispatchToProps)(userUpdate)