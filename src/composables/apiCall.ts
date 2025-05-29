import axiosInstance from '@/composables/useAxios';

export const useApi = () => {

  const apiCheckUserPassword = async (user: string, password: string) => {
    const response = await axiosInstance.post('login/', {
      username: user,
      password: password,
    });
    return response.data;
  }

  const apiLogout = async () => {
    await axiosInstance.get('logout/');
  };

  const getUserInfo = async () => {
    const response = await axiosInstance.get('user/');
    return response.data;
  };

  const getUserLocalisations = async () => {
    const response = await axiosInstance.get('user-localisations/');
    return response.data;
  };

  const getLocalisationWifis = async (localisationId: number) => {
    const response = await axiosInstance.get(`localisations/${localisationId}/wifis/`);
    return response.data;
  };

  const getQrCodeUrl = async (wifiId: number) => {
    const response = await axiosInstance.get(`qr/?wifi_id=${wifiId}`);
    return response.data.qrcode_url; // On extrait le champ "qrcode_url"
  };

  return {
    getUserInfo,
    apiCheckUserPassword,
    apiLogout,
    getUserLocalisations,
    getLocalisationWifis,
    getQrCodeUrl,
  };
};
