import {connect} from 'react-redux';
import Home from './component';
import {actions} from '../../user';

const mapStateToProps = state=>{
  return {
      user:state.user
  }
};
const mapDispatchToProps = dispatch=>{
    return {
        login:(studentID,password)=>dispatch(actions.login(studentID,password))
    }
};
const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(Home);
export default HomeContainer;