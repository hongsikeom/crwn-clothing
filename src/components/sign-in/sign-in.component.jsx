import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        // Email and password Needed
        this.state =
        {
            email: '',
            password: ''
        }
    }


    // When user enters an information
    handleChange = (event) => {
        // Get name and value from event.target
        const { name, value } = event.target;

        // Set state using those values
        // [name] means = the name value can be changed dynamically
        this.setState({ [name]: value })
    }


    // When submit
    handleSubmit = async (event) => {
        // Don't make it do the default work
        // Since we are not submit form to the server
        event.preventDefault();

        // Get email and password from the state
        const { email, password } = this.state;


        try {
            // Use signInWithEmailAndPassword method - provided by firebase
            await auth.signInWithEmailAndPassword(email, password);

            // Empty email and password
            this.setState({
                email: '',
                password: ''
            })

        } catch (error) {
            alert("Email and password are not valid");
            console.error(error);
        }
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='Email'
                        required />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        label='Password'
                        handleChange={this.handleChange}
                        required />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton
                            // Google Sign in button
                            type="button"
                            // When clicking the button call signInWithGoogle function
                            onClick={signInWithGoogle}
                            isGoogleSignIn>
                            Sign In with Google {' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;