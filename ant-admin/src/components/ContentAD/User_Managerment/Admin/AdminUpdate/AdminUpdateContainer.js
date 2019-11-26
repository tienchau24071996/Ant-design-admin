import { connect } from "react-redux";
import { onGetAdmin, onUpdateAdmin } from "./AdminUpdate.action";
import adminUpdate from "./AdminUpdate";

const mapStateToProps = state => {
  let { adminUpdateReducer } = state;
  return {
    dataAdmin: adminUpdateReducer.dataAdmin,
    isLoading: adminUpdateReducer.isLoading,
    isError: adminUpdateReducer.isError,
    errorMessage: adminUpdateReducer.errorMessage
  };
}

const mapDispatchToProps = { onGetAdmin, onUpdateAdmin };
export default connect(mapStateToProps, mapDispatchToProps)(adminUpdate);
