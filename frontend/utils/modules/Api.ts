import axios from 'axios';

/**
 * Namespace module that handles API requests
 */
class Api {
    endpoint: string;

    constructor() {
        this.endpoint = 'https://worldpoops.herokuapp.com/api/v1';
    }

    /**
     * Gets stall information
     * @param stallId - stallId to get stall for
     * @returns {Promise} - promise containing result from API call
     */
    getStallInfo(stallId: string): Promise<any> {
        return axios.get(`${this.endpoint}/stall/${stallId}`);
    }

    /**
     * Registers user
     * @param username - username
     * @param password - password
     * @returns {Promise} - promise containing result from API call
     */
    registerUser(username: string, password: string): Promise<any> {
        return axios.post(`${this.endpoint}/user/register`, {
            username,
            password
        });
    }

    /**
     * Submits tale
     * @param taleText - body of tale
     * @param stallId - stale id of the tale
     */
    submitTale(taleText: string, stallId: string): Promise<any> {
        return axios.post(`${this.endpoint}/tale`, {
            taleText,
            stallId
        });
    }
}

export default new Api();
