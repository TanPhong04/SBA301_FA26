import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Orchid({ orchidList }) {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  return (
    <div>
      <Container className="py-5">
        <Row>
          {orchidList.map((orchid) => (
            <Col md={3} key={orchid.id} className="mb-4 d-flex">
              <Card className="h-100 w-100 position-relative shadow-sm">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={orchid.image}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  {orchid.isSpecial && (
                    <div
                      className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1"
                      style={{ borderBottomLeftRadius: "10px" }}
                    >
                      Special
                    </div>
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center">
                    {orchid.orchidName}
                  </Card.Title>
                  <Card.Text className="text-center">
                    <strong>Category:</strong> {orchid.category}
                  </Card.Text>

                  <Button
                    variant="primary"
                    onClick={() => handleShow(orchid)}
                    className="mt-auto w-100"
                  >
                    Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedOrchid?.orchidName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrchid && (
              <div>
                <img
                  src={selectedOrchid.image}
                  alt={selectedOrchid.orchidName}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    marginBottom: "15px",
                  }}
                />
                <p>
                  <strong>Category:</strong> {selectedOrchid.category}
                </p>
                <p>
                  <strong>Description:</strong> {selectedOrchid.description}
                </p>
                {selectedOrchid.isSpecial && (
                  <p className="text-danger fw-bold">★ Special Item</p>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Orchid;
