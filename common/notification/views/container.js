import {connect} from 'react-redux';
import Notification from './component';
import {set_tab_index} from "../../actions";

const mapStateToProps = state=>{
    return {
        user:state.user
    }
};

const mapDispatchToProps = dispatch=>{
    return{
        setTabIndex:(index)=>dispatch(set_tab_index(index))
    }
};

const NotificationContainer = connect(mapStateToProps,mapDispatchToProps)(Notification);

export default NotificationContainer;