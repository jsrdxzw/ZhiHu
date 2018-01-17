import {connect} from 'react-redux';
import Chat from './component';

const mapStateToProps = state=>{
    return {
        user:state.user
    }
};

const mapDispatchToProps = dispatch=>{
};

const ChatContainer = connect(mapStateToProps,null)(Chat);

export default ChatContainer;