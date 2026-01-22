// src/hooks/useManageOrchids.js
import { useState, useEffect, useCallback } from "react";
import {
  fetchOrchids,
  createOrchid,
  updateOrchid,
  deleteOrchid,
} from "../service/OrchidService";

const useManageOrchids = (isAuthenticated) => {
  // --- 1. STATE: Quản lý dữ liệu ---
  const [orchids, setOrchids] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  // State cho form
  const initialOrchidState = {
    orchidName: "",
    category: "",
    description: "",
    image: "",
    price: 0,
    isSpecial: false,
  };
  const [currentOrchid, setCurrentOrchid] = useState(initialOrchidState);

  // --- 2. UI STATE: Quản lý hiển thị (Modal) ---
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" | "edit"

  // --- 3. LOGIC & HANDLERS ---

  // Hàm load dữ liệu từ API
  const loadOrchids = useCallback(async () => {
    try {
      const data = await fetchOrchids();
      setOrchids(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  }, []);

  // Tự động load khi đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      loadOrchids();
    }
  }, [isAuthenticated, loadOrchids]);

  // Các hàm mở/đóng Modal
  const openAddModal = () => {
    setModalType("add");
    setCurrentOrchid(initialOrchidState);
    setShowModal(true);
  };

  const openEditModal = (orchid) => {
    setModalType("edit");
    setCurrentOrchid(orchid);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openConfirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const closeConfirmDelete = () => {
    setShowConfirmModal(false);
    setDeleteId(null);
  };

  // Xử lý thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentOrchid((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Xử lý Submit (Thêm mới hoặc Cập nhật)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        // Logic tự động tạo ID mới (tránh trùng lặp trên JSON Server)
        const maxId =
          orchids.length > 0
            ? Math.max(...orchids.map((o) => parseInt(o.id)))
            : 0;
        const nextId = String(maxId + 1);

        const newOrchidData = { ...currentOrchid, id: nextId };
        await createOrchid(newOrchidData);
      } else {
        await updateOrchid(currentOrchid.id, currentOrchid);
      }

      closeModal();
      loadOrchids(); // Tải lại bảng dữ liệu
    } catch (error) {
      console.error("Lỗi xử lý:", error);
      alert("Đã có lỗi xảy ra!");
    }
  };

  // Xử lý Xóa
  const handleConfirmDelete = async () => {
    try {
      if (deleteId) {
        await deleteOrchid(deleteId);
        closeConfirmDelete();
        loadOrchids();
      }
    } catch (error) {
      console.error("Lỗi xóa:", error);
    }
  };

  // --- RETURN: Trả về dữ liệu đã được gom nhóm ---
  return {
    state: {
      orchids,
      currentOrchid,
    },
    ui: {
      showModal,
      showConfirmModal,
      modalType,
    },
    handlers: {
      openAddModal,
      openEditModal,
      closeModal,
      openConfirmDelete,
      closeConfirmDelete,
      handleInputChange,
      handleSubmit,
      handleConfirmDelete,
    },
  };
};

export default useManageOrchids;
