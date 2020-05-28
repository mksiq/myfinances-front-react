import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import TransactionsTable from './transactions-table'

import TransactionService from '../../app/service/transaction-service'
import LocalStorageService from '../../app/service/localstorage-service'

import * as messages from '../../components/toastr'

class SearchTransactions extends React.Component {

    state = {
        year: '',
        month: '',
        type: '',
        description: '',
        transactions: []

    }

    constructor() {
        super();
        this.service = new TransactionService();
    }

    select = () => {
        if(!this.state.year){
            messages.errorMessage("Please fill the Year field");
            return false;
        }

        const loggedUser = LocalStorageService.getItem('_logged_user');

        const transactionFilter = {
            year: this.state.year,
            month: this.state.month,
            type: this.state.type,
            description: this.state.description,
            user: loggedUser.id
        };

        this.service.select(transactionFilter)
            .then(response => {
                this.setState({ transactions: response.data });
            }).catch(e => {
                console.log(e);
            })
    }

    edit(id){
        console.log("Editing: ", id);
    }

    delete(id){
        console.log("Removing: ", id);
    }


    render() {
        const listOfMonths = this.service.getMonthList();
        const listOfTypes = this.service.getTypeList();

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
                            <FormGroup htmlFor="inputDescription" label="Description: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputDescription"
                                    value={this.state.description}
                                    onChange={event => this.setState({ description: event.target.value })}
                                    placeholder="Insert Description" />
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
                            <TransactionsTable transactions={this.state.transactions}
                                deleteAction={this.delete}
                                editAction={this.edit}/>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(SearchTransactions);