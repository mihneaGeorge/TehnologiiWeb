import axios from 'axios'
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8081/api/';

class PartialDeliverableService {
    static getAllPartialDeliverables() {
        return axios.get(API_URL + 'partialDeliverables', { headers: authHeader() });
    }

    static getPartialDeliverableById(partialDeliverableId) {
        return axios.get(API_URL + `partialDeliverables/${partialDeliverableId}`, { headers: authHeader() })
    }

    static createNewPartialDeliverable(partialDeliverableBody) {
        console.log(partialDeliverableBody)
        return axios.post(API_URL + `partialDeliverables`, partialDeliverableBody, { headers: authHeader() });
    }

    static updatePartialDeliverable(partialDeliverableId, partialDeliverableBody) {
        return axios.put(API_URL + `partialDeliverables/${partialDeliverableId}`, partialDeliverableBody, { headers: authHeader() });
    }

    static deletePartialDeliverableById(partialDeliverableId) {
        return axios.delete(API_URL + `partialDeliverables/${partialDeliverableId}`, { headers: authHeader() })
    }

    static deleteAllPartialDeliverables() {
        return axios.delete(API_URL + `partialDeliverables`, { headers: authHeader() })
    }
}

export default PartialDeliverableService;