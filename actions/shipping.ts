import axios from "axios";

export const getShippings = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/shippings"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getShipping = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/shippings?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
