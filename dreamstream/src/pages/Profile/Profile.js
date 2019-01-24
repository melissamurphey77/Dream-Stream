import React, { Component } from 'react';
import { Row, Modal, Button } from 'react-materialize';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            income: [],
            expense: []
        };

        this.addValue = this.addValue.bind(this);
    }
    componentWillMount() {
        this.setState({ profile: {}});
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }

    render() {
        const sum = (a, b) => a + b;
        const income = this.state.income;
        const expense = this.state.expense;
        const total = income.reduce(sum, 0) - expense.reduce(sum, 0);
        const { profile } = this.state;
        return (
            <div>
                <div className="container col l12">
                    <Row>
                        <h5 className="light-blue-text">{profile.nickname}'s DreamStream</h5>
                    </Row>
                    <Row className="white-text">
                        <img id="profile-pic" src={profile.picture} alt="profile" />
                        Hi, {profile.nickname}! Welcome to your personal DreamStream page. 
                        This is where you can add or remove streaming services to your monthly budget. 
                    </Row>

                    <Modal
                      header="My Monthly Subscription Costs"
                      className="grey lighten-4"
                      fixedFooter
                      trigger={<Button btn-large className="waves-effect waves-light light-blue white-text"><i className="material-icons medium">attach_money</i>My Monthly Budget</Button>}>
                        <div className="input-field col l4">
                            <input type="text" id="service-name" placeholder="Streaming Service (Netflix, Hulu, HBO Now, etc." ref="service" />
                        </div>
                        <div className="input-field col l4 offset-l2">
                            <input type="number" id="service-cost" placeholder="Monthly Subscription Cost" step="0.01" min="1.00" max="99.99" ref="value" />
                        </div>
                        <div className="input-field addValue">
                            <select className="browser-default col 6" ref="valueType">
                                <option value="" disabled selected>Would You Like to Add or Remove This Service?</option>
                                <option value="income">Add</option>
                                <option value="expense">Remove</option>
                            </select>    
                        </div>
                        <Button type="button" className="waves-effect waves-light center btn btn-small light-blue white-text calculate" onClick={ this.addValue }>Calculate</Button>
                        
                        <div className="monthly-budget">
                            <h6>My Streaming Services: <Values values={ this.state.income } /></h6>
                            <h6>Canceled Services: <Values values={ this.state.expense } /></h6>
                            <h6>Monthly Streaming Expenses: ${ total }</h6>
                        </div>
                    </Modal>

                </div>
            </div>
        );
    }
    addValue() {
        const valueType = this.refs.valueType.value;

        // Validate the value here
        const value = parseInt(this.refs.value.value, 10);

        this.setState({
            [valueType]: this.state[valueType].concat(value)
        });
    }
}

const Values = ({
    values
}) => {
    return (
        <ul>
            { values.map((value, i) =>
                <li key={`value-${i}`}>
                    { value } 
                </li>
            )}
        </ul>
    );
}

export default Profile;
