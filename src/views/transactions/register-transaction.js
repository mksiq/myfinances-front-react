import React from 'react'
import Card from '../../components/card'
import FromGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import { withRouter } from 'react-router-dom'
import TransactionService from '../../app/service/transaction-service'
import * as messages from '../../components/toastr'
import LocalStorageService from '../../app/service/localstorage-service'

class RegisterTransaction extends React.Component {
    state = {
        id: null,
        description: "",
        value: "",
        month: "",
        year: "",
        type: "",
        status: "",
        user: null
    }

    constructor() {
        super();
        this.service = new TransactionService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        if(params.id){
            this.service.getById(params.id)
                .then(response => {
                    this.setState( { ...response.data} )
                })
                .catch(error => {
                    messages.errorMessage(error.response.data);
                });
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    submit = () => {
        const loggedUser = LocalStorageService.getItem('_logged_user');
        const { description,
            value,
            month,
            year,
            type } = this.state;

        const transaction = {
            description: description,
            value: value,
            month: month,
            year,
            type,
            userId: loggedUser.id
        }

        this.service
            .insert(transaction).then(response => {
                this.props.history.push('/search-transactions');
                messages.successMessage("Transaction inserted!");
            }).catch(error => {
                messages.errorMessage(error.response.data);
            })
    }

    update =() => {
        const loggedUser = LocalStorageService.getItem('_logged_user');
        const { description,
            value,
            month,
            year,
            type,
            status,
            id,
            userId } = this.state;

        const transaction = {
            description,
            value,
            month,
            year,
            type,
            status,
            id,
            userId: loggedUser.id
        }

        this.service
            .update(transaction).then(response => {
                this.props.history.push('/search-transactions');
                messages.successMessage("Transaction updated!");
            }).catch(error => {
                messages.errorMessage(error.response.data);
            });
    }

    render() {
        const types = this.service.getTypeList();
        const months = this.service.getMonthList();

        return (
            <Card title="Register Transaction">
                <div className="row">
                    <div className="col-md-12">
                        <FromGroup id="inputDescription" label="Description: *">
                            <input id="inputDescription" type="text" className="form-control"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange} />
                        </FromGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FromGroup id="inputYear" label="Year: *">
                            <input id="inputYear" type="text" className="form-control"
                                name="year"
                                value={this.state.year}
                                onChange={this.handleChange} />
                        </FromGroup>
                    </div>
                    <div className="col-md-6">
                        <FromGroup id="inputMonth" label="Month : *">
                            <SelectMenu id="inputMonth" list={months} className="form-control"
                                name="month"
                                value={this.state.month}
                                onChange={this.handleChange} />
                        </FromGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FromGroup id="inputValue" label="Value: *">
                            <input id="inputValue" type="text" className="form-control"
                                name="value"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </FromGroup>
                    </div>
                    <div className="col-md-4">
                        <FromGroup id="inputType" label="Type : *">
                            <SelectMenu id="inputType" list={types} className="form-control"
                                name="type"
                                value={this.state.type}
                                onChange={this.handleChange} />
                        </FromGroup>
                    </div>
                    <div className="col-md-4">
                        <FromGroup id="inputStatus" label="Status : *">
                            <input id="inputStatus" type="text" className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.handleChange}
                                disabled />
                        </FromGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success" onClick={this.submit}>Save</button>
                        <button className="btn btn-primary" onClick={this.update}>Update</button>
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/search-transactions')}>Cancel</button>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(RegisterTransaction);