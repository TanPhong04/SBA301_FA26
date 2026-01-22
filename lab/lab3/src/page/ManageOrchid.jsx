// src/page/ManageOrchid.jsx
import React, { useEffect } from "react";
import { Table, Button, Container, Modal, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useManageOrchids from "../hooks/useManageOrchids";

const ManageOrchid = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect nếu chưa đăng nhập
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // SỬ DỤNG HOOK: Lấy dữ liệu đã được gom nhóm
  const { state, ui, handlers } = useManageOrchids(isAuthenticated);

  if (!isAuthenticated) return null;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Orchids</h2>
        <Button variant="primary" onClick={handlers.openAddModal}>
          + Add New Orchid
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Special</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Lặp qua danh sách orchid từ state */}
          {state.orchids.map((orchid) => (
            <tr key={orchid.id}>
              <td>{orchid.id}</td>
              <td>
                <Image
                  src={orchid.image}
                  alt={orchid.orchidName}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  rounded
                />
              </td>
              <td>
                <Link
                  to={`/detail/${orchid.id}`}
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  {orchid.orchidName}
                </Link>
              </td>
              <td>{orchid.category}</td>
              <td>{orchid.price}</td>
              <td>
                {orchid.isSpecial ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handlers.openEditModal(orchid)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handlers.openConfirmDelete(orchid.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form Thêm/Sửa */}
      <Modal show={ui.showModal} onHide={handlers.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {ui.modalType === "add" ? "Add New Orchid" : "Edit Orchid"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlers.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Orchid Name</Form.Label>
              <Form.Control
                type="text"
                name="orchidName"
                value={state.currentOrchid.orchidName}
                onChange={handlers.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={state.currentOrchid.image}
                onChange={handlers.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={state.currentOrchid.category}
                onChange={handlers.handleInputChange}
                required
              >
                {/* set cứng category */}
                <option value="">Select Category</option>
                <option value="Dendrobium">Dendrobium</option>
                <option value="Oncidium">Oncidium</option>
                <option value="Phalaenopsis">Phalaenopsis</option>
                <option value="Cattleya">Cattleya</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={state.currentOrchid.price}
                onChange={handlers.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={state.currentOrchid.description}
                onChange={handlers.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Special?"
                name="isSpecial"
                checked={state.currentOrchid.isSpecial}
                onChange={handlers.handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {ui.modalType === "add" ? "Create" : "Update"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Xác nhận Xóa */}
      <Modal show={ui.showConfirmModal} onHide={handlers.closeConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this orchid?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlers.closeConfirmDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handlers.handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageOrchid;
