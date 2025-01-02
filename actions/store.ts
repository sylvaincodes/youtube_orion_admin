import axios from "axios";

export const getStoresByUser = async (userId: string | null) => {
  try {
    if (userId) {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/user/stores",
        {
          params: { userId: userId },
        }
      );
      return response.data.data;
    }
  } catch (error) {
    return error;
  }
};

export const getStoresById = async (_id: string | null) => {
  try {
    if (_id) {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/admin/stores",
        {
          params: { _id: _id },
        }
      );
      return response.data.data;
    }
  } catch (error) {
    return error;
  }
};

export const getStore = async (userId: string | null, storeId: string) => {
  try {
    if (storeId) {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/admin/stores",
        {
          params: { storeId: storeId, userId: userId },
        }
      );
      return response.data.data;
    }
  } catch (error) {
    return error;
  }
};

export const getStores = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/stores"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const countSellers = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/stores?action=getsellers"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
