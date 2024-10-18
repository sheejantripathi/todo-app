import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddGroupButton = () => {
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    // Add logic to save the group (you can use axios to send a request)
    console.log("Group Name:", groupName);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a Group
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddGroupButton;
