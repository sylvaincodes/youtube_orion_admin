import axios from "axios";

export const getSlides = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/slides"
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getSlide = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/admin/slides?_id=" + id
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
