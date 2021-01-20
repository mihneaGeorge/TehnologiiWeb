import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/test/';

export default class UserService {
  static getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  static getPMBoard() {
    return axios.get(API_URL + 'pm', { headers: authHeader() });
  }

  static getTeacherBoard() {
    return axios.get(API_URL + 'teacher', { headers: authHeader() });
  }

  static getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}