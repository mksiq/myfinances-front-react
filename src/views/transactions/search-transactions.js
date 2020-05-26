import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import TransactionsTable from './transactions-table'

import TransactionService from '../../app/service/transaction-service'
import LocalStorageService from '../../app/service/localstorage-service'

class SearchTransactions extends React.Component {

    state = {
        year: '',
        month: '',
        type: '',
        transactions : []

    }

    constructor(){
        super();
        this.service = new TransactionService();
    }

    select = () => {
        const loggedUser = LocalStorageService.getItem('_logged_user');
        
        const transactionFilter = {
            year: this.state.year,
            month: this.state.month,
            type: this.state.type,
            user: loggedUser.id
        };

        this.service.select(transactionFilter)
            .then( response => {
                this.setState({ transactions: response.data});
            }).catch( e => {
                console.log(e);
            })
    }

    render() {
        const listOfMonths = [
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

        const listOfTypes = [
            { label: 'Select', value: '' },
            { label: 'Expense', value: 'EXPENSE' },
            { label: 'Income', value: 'INCOME' }
        ];



        return (
            <Card title="List of Transactions">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputYear" label="Year: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputYear"
                                    value={this.state.year}
                                    onChange={event => this.setState({ year: event.target.value })}
                                    placeholder="Insert Year" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMonth" label="Month: ">
                                <SelectMenu id="inputMonth"
                                    value={this.state.month}
                                    onChange={event => this.setState({ month: event.target.value })}
                                    className="form-control" list={listOfMonths} />
                            </FormGroup>
                            <FormGroup htmlFor="inputType" label="Type of Transaction: ">
                                <SelectMenu id="inputType"
                                    value={this.state.type}
                                    onChange={event => this.setState({ type: event.target.value })}
                                    className="form-control" list={listOfTypes} />
                            </FormGroup>
                            <button type="button" onClick={this.select} className="btn btn-success">Search</button>
                            <button type="button" className="btn btn-danger">Add</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <TransactionsTable transactions={this.state.transactions} />
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(SearchTransactions);