import {connect} from "react-redux"
import {onGetListAdmin, onDeleteAdmin} from "./AdminTable.action"
import adminTable from "./AdminTable"

const mapStateToProps = state => {
    let {adminTableReducer} = state
    console.log(adminTableReducer.dataAdmin);
    
    return {
        dataAdmin: adminTableReducer.dataAdmin,
        isLoading: adminTableReducer.isLoading,
        isError: adminTableReducer.isError,
        errorMessage: adminTableReducer.errorMessage
    }
}

const mapDispatchToProps = {onGetListAdmin, onDeleteAdmin} 
export default connect (mapStateToProps, mapDispatchToProps)(adminTable)