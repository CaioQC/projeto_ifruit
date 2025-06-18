import api from "../api/axios";

export const listarProdutos = async () => {
  const response = await api.get("/produto");
  return response.data;
};