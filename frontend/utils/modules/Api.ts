import axios from 'axios';

/**
 * Namespace module that handles API requests
 */
class Api {
    endpoint: string;

    constructor() {
        this.endpoint = 'https://api.worldpoops.xyz/v1';
    }

    /**
     * Gets stall information
     * @param stallId - stallId to get stall for
     * @returns {Promise} - promise containing result from API call
     */
    getStallInfo(stallId: number): Promise<any> {
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
     * Logs in user
     * @param username - username
     * @param password - password
     * @returns {Promise} - promise containing result from API call
     */
    loginUser(username: string, password: string): Promise<any> {
        return axios.post(`${this.endpoint}/auth/login`, {
            username,
            password
        });
    }

    /**
     * Submits tale
     * @param taleText - body of tale
     * @param stallId - stale id of the tale
     */
    submitTale(taleText: string, stallId: number): Promise<any> {
        return axios.post(`${this.endpoint}/tale`, {
            taleText,
            stallId
        });
    }

    /**
     * Rates stall
     * @param stallId - stall to give rating
     * @param score - score to give stall
     */
    rateStall(stallId: number, score: number): Promise<any> {
        return axios.post(`${this.endpoint}/rating`, {
            stallId,
            score
        });
    }

    /**
     * Vote tale
     * @param taleId - tale to vote
     * @param vote - true if upvote, flase if downvote
     */
    voteTale(taleId: number, vote: boolean): Promise<any> {
        return axios.post(`${this.endpoint}/vote`, {
            taleId,
            vote
        });
    }

    // TODO: remove
    createStall(address: string, name: string): Promise<any> {
        return axios.post(`${this.endpoint}/stall`, {
            address,
            name
        }, {
            headers: {
                auth: {
                    username: 'admin',
                    password: 'aish6eehaef3eeZoNo4d'
                }
            }
        });
    }
}

export default new Api();
