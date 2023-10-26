import { logout } from '../store/auth';
import { setIdentity } from '../store/identity';
import { logoutDashboard } from '../store/examsTypes';
import { logoutStudentSubmission } from '../store/studentSubmission';


const logoutUser = (dispatch, navigate) => {
    localStorage.clear()
    dispatch(logout());
    dispatch(logoutStudentSubmission())
    dispatch(setIdentity(''));
    dispatch(logoutDashboard())
    navigate('/');
}

export default logoutUser