import csvToJson from 'csvtojson';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface JsonBody {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  public async execute(filePath: string): Promise<Transaction[]> {
    const converter = csvToJson();
    const jsonBody: JsonBody[] = await converter.fromFile(filePath);

    const createTransaction = new CreateTransactionService();

    // const transactions = await Promise.resolve(
    //   jsonBody.map(async value => {
    //     const transaction = await createTransaction.execute(value);
    //     return transaction;
    //   }),
    // );
    // const transactions = jsonBody.reduce<Transaction[]>(
    //   async (accumulator, value) => {
    //     const transaction = await createTransaction.execute(value);
    //     accumulator.push(transaction);
    //   },
    //   Promise.resolve([]),
    // );

    const transactions = [];
    for (const value of jsonBody) {
      const transaction = await createTransaction.execute(value);
      transactions.push(transaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
