import PocketBase from "pocketbase";

// const pb = new PocketBase('http://192.168.1.110:8090'); /* casa */
const pb = new PocketBase('http://192.168.2.209:8090'); /* dalpozzo */

export const impersonateCustomer = async (customerId: string) => {
    try {
        const superuserAuth = await pb.collection("_superusers").authWithPassword("dev@dev.com", "developing@123");

        const response = await fetch(pb.baseUrl + "/api/collections/customers/impersonate/" + customerId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: superuserAuth.token,
            },
            body: JSON.stringify({
                duration: 3600,
            }),
        });

        if (!response.ok) {
            throw new Error("Erro ao gerar token de impersonate.");
        }

        // console.log(response, 'penisaod', response.json(), response.text());

        const data = await response.json();

        return data.token;
    } catch (error) {
        console.error("Erro:", error);
    }
};

export default pb;
