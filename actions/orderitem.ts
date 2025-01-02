import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export const getOrderitems = async (_id: string) => {
  try {
    const { getToken } = auth();
    const token = await getToken();

    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/orderitems",
      {
        params: { _id: _id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getEarnings = async (store: string) => {
  try {
    const { getToken } = auth();
    const token = await getToken();

    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/orderitems",
      {
        params: { storeId: store, action: "earning" },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
