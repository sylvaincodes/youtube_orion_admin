import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/public/categories"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getCategory = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
