import { useState, useEffect } from "react";
import { OrchidService } from "../service/OrchidService";

const useManageOrchids = (isAuthenticated) => {
  const [orchids, setOrchids] = useState([]);
  const [categories, setCategories] = useState([]); // State mới cho danh mục
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentOrchid, setCurrentOrchid] = useState({
    orchidName: "",
    orchidURL: "",
    orchidCategory: { categoryID: "" }, // Cấu trúc object cho JPA
    isNatural: false,
    orchidDescription: "",
    isAttractive: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    const [orchidRes, catRes] = await Promise.all([
      OrchidService.getAllOrchids(),
      OrchidService.getAllCategories(),
    ]);
    setOrchids(orchidRes.data);
    setCategories(catRes.data);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "orchidCategory") {
      setCurrentOrchid({
        ...currentOrchid,
        orchidCategory: { categoryID: parseInt(value) },
      });
    } else {
      setCurrentOrchid({
        ...currentOrchid,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === "add") {
      await OrchidService.createOrchid(currentOrchid);
    } else {
      await OrchidService.updateOrchid(currentOrchid.orchidID, currentOrchid);
    }
    setShowModal(false);
    fetchData();
  };

  // Các handlers khác (delete, open modal...) tương tự nhưng dùng orchidID
  return {
    state: { orchids, categories, currentOrchid },
    ui: { showModal, modalType },
    handlers: { handleInputChange, handleSubmit, setShowModal, fetchData },
  };
};

export default useManageOrchids;
