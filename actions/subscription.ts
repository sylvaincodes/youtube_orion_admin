import axios from "axios";

export const getSubscriptions = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/pages"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getSubscription = async (user_id: string | null) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        "/api/user/subscriptions?user_id=" +
        user_id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const countMembers = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/subscriptions?type=paid"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
