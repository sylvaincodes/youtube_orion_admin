import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export const getProduct = async (_id: string) => {
  try {
    const { getToken } = auth();

    const token = await getToken();
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/product",
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
