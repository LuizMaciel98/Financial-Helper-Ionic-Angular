import { Storage } from '@ionic/storage';
import { Income } from '../models/income.model';

export class IncomeService {
    private storage: Storage;

    constructor() {
        this.storage = new Storage({
            // name: 'income_db'
        });
    }

    // async addIncome(income: Income, key: string) {
    //     await this.storage.set(key, income);
    // }

    // async getIncome(key: string): Promise<Income> {
    //     return this.storage.get(key);
    // }
}
