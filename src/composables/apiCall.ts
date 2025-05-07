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

    return {
        getUserInfo,
        apiCheckUserPassword,
        apiLogout,
    };
};
