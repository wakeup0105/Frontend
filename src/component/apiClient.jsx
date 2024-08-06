import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://15.165.207.222:8080', // API 기본 URL 설정
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
         if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
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
                const response = await axios.post('http://15.165.207.222:8080/api/member/refresh', {
                    refreshToken // 서버가 이 형태를 기대하는지 확인
                });

                // 응답에서 올바른 데이터 추출
                const { access_token, refresh_token } = response.data;
                
                // 새로 갱신된 토큰으로 로컬 저장소 업데이트
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);

                // 새로 갱신된 토큰으로 헤더 업데이트
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token error:', refreshError);
                // 토큰 갱신 실패 시 추가 로직 (예: 로그아웃)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/'; // 로그인 페이지로 리디렉션
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
