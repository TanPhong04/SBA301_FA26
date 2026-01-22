// src/service/OrchidService.js
import axios from "axios";

const API_URL = "http://localhost:9999/orchids";

export const fetchOrchids = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchOrchidById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createOrchid = async (orchidData) => {
  const response = await axios.post(API_URL, orchidData);
  return response.data;
};

export const updateOrchid = async (id, orchidData) => {
  const response = await axios.put(`${API_URL}/${id}`, orchidData);
  return response.data;
};

export const deleteOrchid = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
