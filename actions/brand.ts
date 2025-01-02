"use server";
import axios from "axios";

export const getBrands = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/brands"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getBrand = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/brands?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
