import axios from 'axios'
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8081/api/';

class ProjectService {
  static getAllProjects() {
    return axios.get(API_URL + 'projects', { headers: authHeader() });
  }

  static getProjectById(projectId) {
    return axios.get(API_URL + `projects/${projectId}`, { headers: authHeader() })
  }

  static createNewProject(projectBody) {
    console.log(projectBody)
    return axios.post(API_URL + `projects`, projectBody, { headers: authHeader() });
  }

  static updateProject(projectId, projectBody) {
    return axios.put(API_URL + `projects/${projectId}`, projectBody, { headers: authHeader() });
  }

  static deleteProjectById(projectId) {
    return axios.delete(API_URL + `projects/${projectId}`, { headers: authHeader() })
  }

  static deleteAllProjects() {
    return axios.delete(API_URL + `projects`, { headers: authHeader() })
  }
}

export default ProjectService;