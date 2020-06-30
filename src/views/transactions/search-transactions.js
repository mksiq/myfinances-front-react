import React from 'react'
import { withRouter } from 'react-router-dom'
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
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
        showConfirmDialog: false ,
        transactionToDelete: {},
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
                if(response.data.length < 1 ){
                    messages.alertMessage("No transaction found.");
                }
                this.setState({ transactions: response.data });
            }).catch(e => {
                console.log(e);
            })
    }

    edit = (id) => {
        this.props.history.push(`/register-transactions/${id}`)
    }

    showConfirmDialogBox = ( transaction ) => {
        this.setState({showConfirmDialog: true, transactionToDelete: transaction});
    }

    delete = () => {
        this.service.del(this.state.transactionToDelete.id)
            .then(res => {
                const transactions = this.state.transactions;
                const indexToRemove = transactions.indexOf(this.state.transactionToDelete);
                transactions.splice(indexToRemove, 1);
                this.setState({transactions: transactions, showConfirmDialog: false} );
                messages.successMessage("Transaction removed");
            }).catch( e => {
                messages.errorMessage('Error while deleting transaction:');
            });
    }

    cancelDelete = () => {
        this.setState({showConfirmDialog: false, transactionToDelete: {}});
    }

    setInsertInform = () => {
        this.props.history.push('/register-transactions');
    }

    updateStatus = (transaction, status) => {
        this.service.updateStatus(transaction.id, status)
            .then( response => {
                const transactions = this.state.transactions;

                const index = transactions.indexOf(transaction);

                if(index !== -1){
                    transaction['status'] = status;
                    transactions[index] = transaction;
                    this.setState({transaction});
                }
                messages.successMessage("Status updated.");
            })
    }

    render() {
        const listOfMonths = this.service.getMonthList();
        const listOfTypes = this.service.getTypeList();

        const confirmDialogButtons = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.delete} />
                <Button label="Cancel" icon="pi pi-times" onClick={this.cancelDelete} />
            </div>
        );

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
                            <button type="button" onClick={this.select}
                                className="btn btn-success"><i className="pi pi-search"> </i>  Search</button>
                            <button type="button" className="btn btn-danger" onClick={this.setInsertInform}><i className="pi pi-plus"> </i>  Add</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <TransactionsTable transactions={this.state.transactions}
                                deleteAction={this.showConfirmDialogBox}
                                editAction={this.edit}
                                updateStatus={this.updateStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="Confirm Removal"
                        visible={this.state.showConfirmDialog}
                        style={{width: '40vw'}}
                        footer={confirmDialogButtons}
                        modal={true}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirm removal of this Transaction?
                    </Dialog>
                </div>
            </Card>
        );
    }
}

export default withRouter(SearchTransactions);