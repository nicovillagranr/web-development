const API_URL = "https://01-products-api.vercel.app";

export const apiClient = {
    async get(endpoint) {
        try {
            console.log(`[API GET] ${API_URL}${endpoint}`);
            const response = await fetch(`${API_URL}${endpoint}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`[API SUCCESS] ${endpoint}`, data);
            return data;
        } catch (error) {
            console.error(`[API ERROR] ${endpoint}:`, error);
            throw error;
        }
    },

    async post(endpoint, body) {
        try {
            console.log(`[API POST] ${API_URL}${endpoint}`, body);
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`[API SUCCESS] ${endpoint}`, data);
            return data;
        } catch (error) {
            console.error(`[API ERROR] ${endpoint}:`, error);
            throw error;
        }
    }
};