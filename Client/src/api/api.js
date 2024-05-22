import axios from "axios";

//process.env.REACT_APP_API_BASE_URL ||
const BASE_URL =  "http://localhost:3000";

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

    static async signup(data) {
        let res = await this.request(`users`, data, "post");
        return res;
    }
}

export default ProjectPulseApi;

