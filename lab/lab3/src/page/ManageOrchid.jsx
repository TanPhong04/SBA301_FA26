import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { useAuth } from "../contexts/AuthContext"; // Thêm useAuth
import {
  fetchOrchids,
  createOrchid,
  updateOrchid,
  deleteOrchid,
} from "../service/OrchidService";

const ManageOrchid = () => {
  // --- MỚI: Logic bảo vệ trang ---
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu chưa đăng nhập => đá về trang login ngay
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  // ------------------------------

  const [orchids, setOrchids] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState("add");

  const [currentOrchid, setCurrentOrchid] = useState({
    orchidName: "",
    category: "",
    description: "",
    image: "",
    price: 0,
    isSpecial: false,
  });
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Chỉ load dữ liệu nếu đã đăng nhập (tránh lỗi call API không cần thiết)
    if (isAuthenticated) {
      loadOrchids();
    }
  }, [isAuthenticated]);

  const loadOrchids = async () => {
    try {
      const data = await fetchOrchids();
      setOrchids(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  // ... (Phần code xử lý modal, handleOpenModal, handleSubmit, handleChange giữ nguyên như cũ) ...
  // Để tiết kiệm không gian, tôi giữ nguyên logic form ở dưới, bạn copy lại phần thân hàm từ câu trả lời trước nhé.

  // (Copy lại các hàm handleOpenModal, handleSubmit, handleOpenConfirm, handleConfirmDelete, handleChange từ code cũ)
  // VÍ DỤ NGẮN GỌN CHO CÁC HÀM ĐÓ:
  const handleOpenModal = (type, orchid = null) => {
    setModalType(type);
    if (type === "edit" && orchid) {
      setCurrentOrchid(orchid);
    } else {
      setCurrentOrchid({
        orchidName: "",
        category: "",
        description: "",
        image: "",
        price: 0,
        isSpecial: false,
      });
    }
    setShowModal(true);
  };

  // src/page/ManageOrchid.jsx

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        // --- BẮT ĐẦU ĐOẠN CODE TÍNH ID MỚI ---

        // 1. Tìm ID lớn nhất hiện có trong danh sách
        // Lưu ý: orchids.map lấy ra mảng id, parseInt để chuyển chuỗi "1" thành số 1
        const maxId =
          orchids.length > 0
            ? Math.max(...orchids.map((o) => parseInt(o.id)))
            : 0;

        // 2. Cộng thêm 1 và chuyển về dạng chuỗi (để giống format trong db.json)
        const nextId = String(maxId + 1);

        // 3. Gán ID vừa tạo vào object cần gửi đi
        const newOrchidData = { ...currentOrchid, id: nextId };

        // 4. Gọi API với dữ liệu đã có ID
        await createOrchid(newOrchidData);

        // --- KẾT THÚC ĐOẠN CODE TÍNH ID MỚI ---

        navigate("/manage");
      } else {
        await updateOrchid(currentOrchid.id, currentOrchid);
        navigate("/manage");
      }
      setShowModal(false);
      loadOrchids();
    } catch (error) {
      console.error("Lỗi xử lý:", error);
      alert("Đã có lỗi xảy ra!");
    }
  };

  const handleOpenConfirm = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteOrchid(deleteId);
      setShowConfirmModal(false);
      loadOrchids();
    } catch (error) {
      console.error("Lỗi xóa:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentOrchid((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Nếu chưa đăng nhập, có thể return null để không hiển thị gì trong tích tắc trước khi redirect
  if (!isAuthenticated) return null;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Orchids</h2>
        <Button variant="primary" onClick={() => handleOpenModal("add")}>
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
          {orchids.map((orchid) => (
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
                  onClick={() => handleOpenModal("edit", orchid)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleOpenConfirm(orchid.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form Thêm/Sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add New Orchid" : "Edit Orchid"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Orchid Name</Form.Label>
              <Form.Control
                type="text"
                name="orchidName"
                value={currentOrchid.orchidName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={currentOrchid.image}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={currentOrchid.category}
                onChange={handleChange}
                required
              >
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
                value={currentOrchid.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentOrchid.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Special?"
                name="isSpecial"
                checked={currentOrchid.isSpecial}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {modalType === "add" ? "Create" : "Update"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Xác nhận Xóa */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this orchid?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageOrchid;
