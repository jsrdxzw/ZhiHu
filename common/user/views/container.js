import User from './component';
import {connect} from 'react-redux';
import {login,logout,getUserFromLocal} from '../actions';
import {set_tab_index} from "../../actions";

const mapStateToProps = state => {
  return {
      user:state.user
  }
};

const mapStateFromProps = dispatch => {
    return {
        login:(email,password)=>dispatch(login(email,password)),
        logout:()=>dispatch(logout()),
        getUserFromLocal:()=>dispatch(getUserFromLocal()),
        setTabIndex:(index)=>dispatch(set_tab_index(index))
    }
};

export default connect(mapStateToProps,mapStateFromProps)(User)