import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfilePage(props) {

  const navigate = useNavigate();

  return (
    <>
      <Logout logout={props.logout} navigate={navigate} />
    </>
  );
}

function Logout(props) {
  return <div className='col-4 d-flex flex-row-reverse'>
    <Button variant="outline-danger" onClick={() => props.logout(props.navigate)}>
      <span className='btn-icon'><i className="bi bi-box-arrow-left"></i></span><span>Logout</span>
    </Button>
  </div>
}

export default ProfilePage;