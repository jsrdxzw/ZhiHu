import {connect} from 'react-redux';
import Home from './component';
import {actions} from '../../user';
import {set_tab_index} from "../../actions";

const mapStateToProps = state=>{
  return {
      user:state.user
  }
};
const mapDispatchToProps = dispatch=>{
    return {
        login:(studentID,password)=>dispatch(actions.login(studentID,password)),
        setTabIndex:(index)=>dispatch(set_tab_index(index))
    }
};
const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(Home);
export default HomeContainer;