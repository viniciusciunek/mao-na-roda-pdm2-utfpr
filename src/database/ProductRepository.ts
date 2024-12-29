import pb from "../services/pocketbase";
import { Product } from "../types/Product";
import { IProductRepository } from "../interfaces/IProductRepository";

export default class ProductRepository implements IProductRepository {
    async getAllProducts(): Promise<Product[]> {
        return await pb.collection('products').getFullList();
    }

    async getProductById(id: string): Promise<Product> {
        return await pb.collection('products').getOne(id);
    }

    async createProduct(product: Product): Promise<Product> {
        return await pb.collection('products').create(product);
    }

    async updateProduct(id: string, product: Product): Promise<Product> {
        return await pb.collection('products').update(id, product);
    }

    async deleteProduct(id: string): Promise<boolean> {
        return await pb.collection('products').delete(id);
    }
}
