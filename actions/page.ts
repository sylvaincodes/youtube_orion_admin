import axios from "axios";

export const getPages = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/pages"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getPage = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/pages?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
