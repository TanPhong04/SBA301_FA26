import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Orchid({ orchidList }) {
  return (
    <div>
      <Container className="py-5">
        <Row>
          {orchidList.map((orchid) => (
            <Col md={3} key={orchid.id} className="mb-4">
              <Card className="h-100 position-relative">
                {" "}
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
                <Card.Body>
                  <Card.Title>{orchid.orchidName}</Card.Title>
                  <Card.Text>
                    <strong>Category:</strong> {orchid.category}
                  </Card.Text>
                  <Button variant="primary">Detail</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Orchid;
