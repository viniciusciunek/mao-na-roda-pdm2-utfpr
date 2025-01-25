import PocketBase from "pocketbase";
import axios from "axios";

const pb = new PocketBase('http://192.168.1.110:8090'); /* casa */
// const pb = new PocketBase('http://192.168.2.209:8090'); /* dalpozzo */

export const impersonateCustomer = async (customerId: string) => {
    try {
        const superuserAuth = await pb.collection("_superusers").authWithPassword("dev@dev.com", "developing@123");

        const response = await axios.post(
            `${pb.baseUrl}/api/collections/customers/impersonate/${customerId}`,
            { duration: 3600 },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${superuserAuth.token}`,
                },
            }
        );

        if (!response.data || !response.data.token) {
            throw new Error("Erro ao gerar token de impersonate.");
        }

        return response.data.token;
    } catch (error) {
        throw error;
    }
};

export default pb;
