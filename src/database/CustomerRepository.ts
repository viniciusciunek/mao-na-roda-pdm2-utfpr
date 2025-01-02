import pb from "../services/pocketbase";
import { Customer } from "../types/Customer";
import { ICustomerRepository } from './../interfaces/ICustomerRepository';

export default class CustomerRepository implements ICustomerRepository {
    async getAllCustomers(): Promise<Customer[]> {
        return await pb.collection('customers').getFullList();
    }

    async getCustomerById(id: string): Promise<Customer> {
        return await pb.collection('customers').getOne(id);
    }

    async createCustomer(product: Customer): Promise<Customer> {
        return await pb.collection('customers').create(product);
    }

    async updateCustomer(id: string, product: Customer): Promise<Customer> {
        return await pb.collection('customers').update(id, product);
    }

    async deleteCustomer(id: string): Promise<boolean> {
        return await pb.collection('customers').delete(id);
    }
}
