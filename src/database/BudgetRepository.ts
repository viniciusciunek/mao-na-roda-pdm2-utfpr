import { Budget } from "../types/Budget";
import { IBudgetRepository } from './../interfaces/IBudgetRepository';
import pb from "../services/pocketbase";

export default class BudgetRepository implements IBudgetRepository {
    /**
   * Função genérica para buscar orçamentos com filtros, ordenação, paginação, etc.
   * @param params Objeto contendo os parâmetros da consulta
   * @returns Lista paginada de budgets ou budgets completos
   */
    async fetchBudgets(params: {
        page?: number; // Página atual para paginação
        perPage?: number; // Número máximo de registros por página
        sort?: string; // Ordem dos registros
        filter?: string; // Filtro dos registros
        expand?: string; // Expansão de relações
        fields?: string; // Campos específicos para retorno
        skipTotal?: boolean; // Ignorar contagem total
    }): Promise<{ items: Budget[]; totalPages?: number; totalItems?: number }> {
        const { page = 1, perPage = 30, sort, filter, expand, fields, skipTotal, } = params;

        const query: Record<string, any> = {
            page,
            perPage,
            ...(sort && { sort }),
            ...(filter && { filter }),
            ...(expand && { expand }),
            ...(fields && { fields }),
            ...(skipTotal && { skipTotal: true }),
        };

        try {
            const response = await pb.collection('budgets').getList(page, perPage, query);

            return { items: response.items as Budget[], totalPages: response.totalPages, totalItems: response.totalItems, };
        } catch (error) {
            console.error("Erro ao buscar budgets:", error);
            throw error;
        }
    }

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
