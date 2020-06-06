import ApiService from '../apiservice'

export default class TransactionService extends ApiService {

    constructor() {
        super('/api/transactions');
    }

    getMonthList() {
        return [
            { label: 'Select', value: '' },
            { label: 'January', value: 1 },
            { label: 'February', value: 2 },
            { label: 'March', value: 3 },
            { label: 'April', value: 4 },
            { label: 'May', value: 5 },
            { label: 'June', value: 6 },
            { label: 'July', value: 7 },
            { label: 'August', value: 8 },
            { label: 'September', value: 9 },
            { label: 'October', value: 10 },
            { label: 'November', value: 11 },
            { label: 'December', value: 12 },
        ];
    }

    getTypeList() {
        return [
            { label: 'Select', value: '' },
            { label: 'Expense', value: 'EXPENSE' },
            { label: 'Income', value: 'INCOME' }
        ];
    }

    getById(id){
       return this.get(`/${id}`);
    }

    insert(transaction){
        return this.post('/',transaction)
    }

    update(transaction){

        return this.put(`/${transaction.id}`,transaction)
    }

    select(transactionFilter) {
        let params = `?year=${transactionFilter.year}`;

        if(transactionFilter.month) {
            params = `${params}&month=${transactionFilter.month}`;
        }

        if(transactionFilter.type) {
            params = `${params}&type=${transactionFilter.type}`;
        }

        if(transactionFilter.status) {
            params = `${params}&status=${transactionFilter.status}`;
        }
        if(transactionFilter.user) {
            params = `${params}&user=${transactionFilter.user}`;
        }

        if(transactionFilter.description){
            params = `${params}&description=${transactionFilter.description}`;
        }

        return this.get(params);
    }

    del(id){
        return this.delete(`/${id}`);
    }
}