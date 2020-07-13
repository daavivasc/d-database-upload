import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    let [income, outcome, total] = [0, 0, 0];
    const transactions = await this.find();

    transactions.forEach(transaction => {
      income += transaction.type === 'income' ? transaction.value : 0;
      outcome += transaction.type === 'outcome' ? transaction.value : 0;
    });

    total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
