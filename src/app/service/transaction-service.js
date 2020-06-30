import ApiService from '../apiservice'
import ValidationError from '../exception/validation-error'


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

    updateStatus(id, status){

        return this.put(`/${id}/update-status` ,{status})
    }

    validate(transaction){
        const errors = [];

        if(!transaction.year){
            errors.push("Give it an year");
        }
        if(!transaction.month){
            errors.push("Give it a month");
        }
        if(!transaction.type){
            errors.push("Give it a type");
        }
        if(!transaction.value){
            errors.push("Give it a value");
        }
        if(!transaction.description){
            errors.push("Give it a description");
        }



        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

    insert(transaction){
        return this.post('/',transaction)
    }

    update(transaction){
        return this.put(`/${transaction.id}`,transaction);
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