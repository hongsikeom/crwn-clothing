import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


class SignUp extends React.Component {
    constructor() {
        super();

        // All of information are needed to save user and update firestore
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    // When user enters the information
    handleChange = event => {
        // Get name and value from the event.targer
        const { name, value } = event.target;

        // Set state using those values
        // [name] means = the name value can be changed dynamically
        this.setState({
            [name]: value
        })
    }


    // When user clicks submit button
    handleSubmit = async event => {
        // Don't make it do the default work
        // Since we are not submit form to the server
        event.preventDefault();


        // Get data from the state
        const { displayName, email, password, confirmPassword } = this.state;

        // If password and confirmPassword doesn't match
        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }


        try {
            // Try to crate user with email and password
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            // Update new user to our database
            await createUserProfileDocument(user, { displayName });

            // Clear state
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}


export default SignUp;