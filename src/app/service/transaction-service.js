import ApiService from '../apiservice'

export default class TransactionService extends ApiService {

    constructor(){
        super('/api/transactions');
    }

    select(transactionFilter){
        let params = `?year=${transactionFilter.year}`;
        
        if(transactionFilter.month){
            params = `${params}&month=${transactionFilter.month}`;
        }

        if(transactionFilter.type){
            params = `${params}&type=${transactionFilter.type}`;
        }

        if(transactionFilter.status){
            params = `${params}&type=${transactionFilter.status}`;
        }
        if(transactionFilter.user){
            params = `${params}&user=${transactionFilter.user}`
        }
        return this.get(params);
    }
}