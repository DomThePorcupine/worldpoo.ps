import axios, { AxiosInstance } from 'axios';

/**
 * Namespace module that handles API requests
 */
class Api {
    endpoint: string;
    transport: AxiosInstance

    constructor() {
        // Use location.host for testing
        this.endpoint = (location.host.indexOf('xyz') >= 0) ? 'https://api.worldpoops.xyz/v1' : 'http://0.0.0.0:5000/v1';

        this.transport = axios.create({
            withCredentials: true, // Needed for the token
        });
    }

    /**
     * Get a rnadom stall
     * @returns {Promise} - Contains the random stall id
     */
    getRandomStall(): Promise<any> {
        return this.transport.get(`${this.endpoint}/stall/random`);
    }

    /**
     * Gets stall information
     * @param stallId - stallId to get stall for
     * @returns {Promise} - promise containing result from API call
     */
    getStallInfo(stallId: number): Promise<any> {
        return this.transport.get(`${this.endpoint}/stall/${stallId}`);
    }

    /**
     * Registers user
     * @param username - username
     * @param password - password
     * @returns {Promise} - promise containing result from API call
     */
    registerUser(username: string, password: string): Promise<any> {
        return this.transport.post(`${this.endpoint}/user/register`, {
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
        return this.transport.post(`${this.endpoint}/auth/login`, {
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
        return this.transport.post(`${this.endpoint}/tale`, {
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
        return this.transport.post(`${this.endpoint}/rating`, {
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
        return this.transport.post(`${this.endpoint}/vote`, {
            taleId,
            vote
        });
    }

    // TODO: remove
    createStall(address: string, name: string): Promise<any> {
        return this.transport.post(`${this.endpoint}/stall`, {
            address,
            name
        });
    }
}

export default new Api();
