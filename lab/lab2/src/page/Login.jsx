// src/components/Login.jsx
// login page using userName and password to login and redirect to Orchid page
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import loginReducer, { initialState } from "../stores/login/loginReducer";

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    dispatch({ type: "LOGIN_REQUEST" });
    if (state.username === "admin" && state.password === "123456") {
      login(state.username);
      dispatch({ type: "LOGIN_SUCCESS", payload: state.username });
      navigate("/");
    } else {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Invalid username or password",
      });
    }
  };

  const handleCancel = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Header
                className="bg-primary text-white text-center py-4"
                style={{
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                }}
              >
                <h3 className="mb-0 fw-bold">Welcome Back</h3>
                <p className="mb-0 small">Please sign in to your account</p>
              </Card.Header>
              <Card.Body className="p-4">
                <Form noValidate validated={validated} onSubmit={handleLogin}>
                  <Form.Group className="mb-4" controlId="formBasicUsername">
                    <Form.Label className="fw-semibold">Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter username"
                      value={state.username}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_USERNAME",
                          payload: e.target.value,
                        })
                      }
                      className="form-control-lg rounded-pill"
                      style={{ paddingLeft: "1rem" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a username.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={state.password}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_PASSWORD",
                          payload: e.target.value,
                        })
                      }
                      className="form-control-lg rounded-pill"
                      style={{ paddingLeft: "1rem" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={state.isLoading}
                      className="px-4 py-2 rounded-pill fw-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                        border: "none",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      {state.isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-pill fw-semibold"
                      style={{ border: "2px solid", transition: "all 0.2s" }}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
                {state.error && (
                  <Alert
                    variant="danger"
                    className="mt-4 rounded-pill text-center fw-semibold"
                  >
                    {state.error}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
