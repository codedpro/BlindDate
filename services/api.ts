import axios from "axios";

const API_BASE_URL = "https://api.blinddatepersian.site/index.php";

export const checkJoin = async (appData: string) => {
  const response = await axios.post(`${API_BASE_URL}/CheckJoin`, JSON.stringify({ app_data: appData }));
  return response.data;
};

export const getProfile = async (chatId: string, appData: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/GetProfile`,
    JSON.stringify({ chat_id: chatId, app_data: appData })
  );
  return response.data;
};
