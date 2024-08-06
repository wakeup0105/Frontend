// 토큰관리
// apiClient.js
import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://your-api-url.com', // API 기본 URL 설정
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const response = await axios.post('/api/member/refresh', { refreshToken });
                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token error:', refreshError);
                // 토큰 갱신 실패 시 추가 로직 (예: 로그아웃)
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
