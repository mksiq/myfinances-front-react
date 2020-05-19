import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/select-menu'

class SearchTransactions extends React.Component{

    render(){
        const listOfMonths = [
            { label: 'Select', value: ''},
            { label: 'January', value: 1},
            { label: 'February', value: 2},
            { label: 'March', value: 3},
            { label: 'April', value: 4},
            { label: 'May', value: 5},
            { label: 'June', value: 6},
            { label: 'July', value: 7},
            { label: 'August', value: 8},
            { label: 'September', value: 9},
            { label: 'October', value: 10},
            { label: 'November', value: 11},
            { label: 'December', value: 12},
        ];

        const listOfTypes = [
            { label: 'Select', value: ''},
            { label: 'Expense', value: 'EXPENSE'},
            { label: 'Income', value: 'INCOME'}
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
                                    aria-describedby="emailHelp"
                                    placeholder="Insert Year" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMonth" label="Month: ">
                                <SelectMenu id="inputMonth" className="form-control" list={listOfMonths}/>
                            </FormGroup>
                            <FormGroup htmlFor="inputType" label="Type of Transaction: ">
                                <SelectMenu id="inputType" className="form-control" list={listOfTypes}/>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(SearchTransactions);