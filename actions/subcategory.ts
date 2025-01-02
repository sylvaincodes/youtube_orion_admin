import axios from "axios";

export const getSubcategories = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/subcategories"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getSubcategory = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/subcategories?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
