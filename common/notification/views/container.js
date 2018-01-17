import {connect} from 'react-redux';
import Notification from './component';

const mapStateToProps = state=>{
    return {
        user:state.user
    }
};

const mapDispatchToProps = dispatch=>{
};

const NotificationContainer = connect(mapStateToProps,null)(Notification);

export default NotificationContainer;