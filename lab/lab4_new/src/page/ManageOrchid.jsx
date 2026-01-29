// src/page/ManageOrchid.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useManageOrchids from "../hooks/useManageOrchids";
import { OrchidService } from "../service/OrchidService";

const ManageOrchid = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State bổ sung để quản lý danh sách Category từ Server
  const [categories, setCategories] = useState([]);

  // Redirect nếu chưa đăng nhập
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Lấy danh sách category khi component mount
      const fetchCats = async () => {
        try {
          const res = await OrchidService.getAllCategories();
          setCategories(res.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCats();
    }
  }, [isAuthenticated, navigate]);

  // SỬ DỤNG HOOK: Lấy dữ liệu và các hàm xử lý
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
            <th>Natural</th>
            <th>Special (Attractive)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sửa các trường dữ liệu theo Entity Spring Boot: orchidID, orchidURL, orchidCategory */}
          {state.orchids.map((orchid) => (
            <tr key={orchid.orchidID}>
              <td>{orchid.orchidID}</td>
              <td>
                <Image
                  src={orchid.orchidURL}
                  alt={orchid.orchidName}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  rounded
                />
              </td>
              <td>
                <Link
                  to={`/detail/${orchid.orchidID}`}
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  {orchid.orchidName}
                </Link>
              </td>
              {/* Hiển thị tên từ object Category */}
              <td>{orchid.orchidCategory?.categoryName || "N/A"}</td>
              <td>{orchid.isNatural ? "Yes" : "No"}</td>
              <td>
                {orchid.isAttractive ? (
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
                  onClick={() => handlers.openConfirmDelete(orchid.orchidID)}
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
                value={state.currentOrchid.orchidName || ""}
                onChange={handlers.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="orchidURL"
                value={state.currentOrchid.orchidURL || ""}
                onChange={handlers.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="orchidCategory"
                // Gắn value với ID của object orchidCategory
                value={state.currentOrchid.orchidCategory?.categoryID || ""}
                onChange={(e) => {
                  // Cần xử lý riêng cho object categoryID
                  const catId = e.target.value;
                  handlers.handleInputChange({
                    target: {
                      name: "orchidCategory",
                      value: catId,
                    },
                  });
                }}
                required
              >
                <option value="">Select Category</option>
                {/* Lấy danh sách category động từ Server */}
                {categories.map((cat) => (
                  <option key={cat.categoryID} value={cat.categoryID}>
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="orchidDescription"
                value={state.currentOrchid.orchidDescription || ""}
                onChange={handlers.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Natural?"
                name="isNatural"
                checked={state.currentOrchid.isNatural || false}
                onChange={handlers.handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Attractive (Special)?"
                name="isAttractive"
                checked={state.currentOrchid.isAttractive || false}
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
