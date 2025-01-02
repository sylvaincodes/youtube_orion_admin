import axios from "axios";

export const getPmethods = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/pmethods"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getPmethod = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/pmethods?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
