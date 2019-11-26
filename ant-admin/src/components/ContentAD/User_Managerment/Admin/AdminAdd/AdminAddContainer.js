import {connect} from "react-redux"
import {onUpAdmin} from "./AdminAdd.action"
import AdminAdd from "./AdminAdd"

const mapStateToProps = state => {
    let {adminAddReducer} = state
    return {
        dataAdmin: adminAddReducer.dataAdmin,
        isLoading: adminAddReducer.isLoading,
        isError: adminAddReducer.isError,
        errorMessage: adminAddReducer.errorMessage
    }
}

const mapDispatchToProps = {onUpAdmin} 
export default connect (mapStateToProps, mapDispatchToProps)(AdminAdd)