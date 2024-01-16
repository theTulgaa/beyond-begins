import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaExternalLinkAlt } from "react-icons/fa";

export const HistoryUser = ({ handleClose, show, historyList, deleteFromHistory }) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>YOUR SEARCH HISTORY</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {historyList.length === 0 ? (
          <p>Why did you delete your search history?</p>
        ) : (
          <div className='outer-his'>
            {historyList.map((user) => (
              <div key={user.id} className='inner-his'>
                {user.login}
                <button onClick={() => deleteFromHistory(user.id)}><RiDeleteBin5Line size={30}/></button>
                <button><a href={user.link} target='_blank'><FaExternalLinkAlt  size={30}/></a></button>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};