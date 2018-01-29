import {connect} from 'react-redux';
import Chat from './component';
import {clear_unread} from "../actions";
import {set_tab_index} from "../../actions";

const mapStateToProps = state=>{
    return {
        user:state.user,
        messages:state.messages.messages
    }
};

const mapDispatchToProps = dispatch=>{
    return{
        setTabIndex:(index)=>dispatch(set_tab_index(index)),
        clearUnread:()=>dispatch(clear_unread())
    }
};

const ChatContainer = connect(mapStateToProps,mapDispatchToProps)(Chat);

export default ChatContainer;