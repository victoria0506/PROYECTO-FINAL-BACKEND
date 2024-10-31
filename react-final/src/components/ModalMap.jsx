import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Map from '../components/Map';

function ModalMap() {
  const [show, setShow] = useState(false);
   
  return (
    <>
      {/* Modal que se abre al hacer clic en el mapa */}
      <Modal show={show} onHide={() => setShow(false)} fullscreen>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
         <Map/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalMap;

