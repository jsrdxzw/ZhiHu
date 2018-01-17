import User from './component';
import {connect} from 'react-redux';
import {login,logout} from '../actions';

const mapStateToProps = state => {
  return {
      user:state.user
  }
};

const mapStateFromProps = dispatch => {
    return {
        login:(studentID,password)=>dispatch(login(studentID,password)),
        logout:()=>dispatch(logout())
    }
};

export default connect(mapStateToProps,mapStateFromProps)(User)