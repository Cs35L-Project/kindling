import http from "./http-header";
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/users';

class UserService {

    getAllUsers() {
        return http.get(API_URL, { headers: authHeader() });
    }

    getUser(id) {
        return http.get(API_URL + `/${id}`, { headers: authHeader() });
    }

    updateUser(id) {
        return http.put(API_URL + `/${id}`, { headers: authHeader() });
    }

    uploadAvatar(id, data) {
        return http.put(API_URL + `/${id}/upload`, data, { headers: authHeader() });
    }

}

export default new UserService();
