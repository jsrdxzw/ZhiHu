import {connect} from 'react-redux';
import WelcomePage from "./component";
import {actions} from '../../user';

const mapDispatchToProps = dispatch => {
    return {
        getUserFromLocal:()=>dispatch(actions.getUserFromLocal())
    }
};

export default connect(null,mapDispatchToProps)(WelcomePage);