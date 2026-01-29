import axios from "axios";

// URL của Spring Boot Server
const API_URL = "http://localhost:8080/orchids/";
const CATEGORY_URL = "http://localhost:8080/categories/";

export const OrchidService = {
  getAllOrchids: async () => {
    return await axios.get(API_URL);
  },

  // Lấy danh sách danh mục để đổ vào dropdown
  getAllCategories: async () => {
    return await axios.get(CATEGORY_URL);
  },

  getOrchidById: async (id) => {
    return await axios.get(`${API_URL}${id}`);
  },

  createOrchid: async (orchid) => {
    return await axios.post(API_URL, orchid);
  },

  updateOrchid: async (id, orchid) => {
    return await axios.put(`${API_URL}${id}`, orchid);
  },

  deleteOrchid: async (id) => {
    return await axios.delete(`${API_URL}${id}`);
  },
};
