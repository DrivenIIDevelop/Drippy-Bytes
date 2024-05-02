import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5432";

class ProjectPulseApi {
    // the token for interaction with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ProjectPulseApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            const result = await axios({ url, method, data, params, headers });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    
}

export default ProjectPulseApi;

