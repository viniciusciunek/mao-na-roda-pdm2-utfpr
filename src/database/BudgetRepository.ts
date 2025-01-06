import { Budget } from "../types/Budget";
import { IBudgetRepository } from './../interfaces/IBudgetRepository';
import pb from "../services/pocketbase";

export default class BudgetRepository implements IBudgetRepository {
    async getAllBudgets(): Promise<Budget[]> {
        return await pb.collection('budgets').getFullList();
    }

    async getBudgetById(id: string): Promise<Budget> {
        return await pb.collection('budgets').getOne(id);
    }

    async createBudget(budget: Budget): Promise<Budget> {
        return await pb.collection('budgets').create(budget);
    }

    async updateBudget(id: string, budget: Budget): Promise<Budget> {
        return await pb.collection('budgets').update(id, budget);
    }

    async deleteBudget(id: string): Promise<boolean> {
        return await pb.collection('budgets').delete(id);
    }
}
