import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export const getSellers = async () => {
  //get user token
  const { getToken } = await auth();
  const token = await getToken();

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/stores",
      {
        // headers
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//members
export const getSubscriptions = async () => {
  //get user token
  const { getToken } = await auth();
  const token = await getToken();

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/subscriptions",
      {
        // headers
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//earnings
export const getEarnings = async () => {
  //get user token
  const { getToken } = await auth();
  const token = await getToken();

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/payments",
      {
        // headers
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //params
        params: {
          type: "subscription",
        },
      }
    );

    return response.data.data[0].totalEarning;
  } catch (error) {
    console.log(error);
  }
};
