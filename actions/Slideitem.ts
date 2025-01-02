import axios from "axios";

export const getSlideitems = async (storeId?: string) => {
  try {
    if (storeId) {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/admin/slideitems?storeId=" +
          storeId
      );
      return response.data.data;
    }
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/slideitems"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getSlideitem = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/slideitems?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
