import {client} from "../../api/client.js";

class BaseService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async handleRequest(request) {
        try {
            const response = await request();
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    get(path, config = {}) {
        return this.handleRequest(() => client.get(`${this.endpoint}${path}`, config));
    }

    post(path, data = {}, config = {}) {
        return this.handleRequest(() => client.post(`${this.endpoint}${path}`, data, config));
    }

    put(path, data = {}, config = {}) {
        return this.handleRequest(() => client.put(`${this.endpoint}${path}`, data, config));
    }

    delete(path, config = {}) {
        return this.handleRequest(() => client.delete(`${this.endpoint}${path}`, config));
    }
}

export default BaseService;
