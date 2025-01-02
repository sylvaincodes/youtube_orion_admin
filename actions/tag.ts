import axios from "axios";

export const getTags = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/tags"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getTag = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/tags?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
