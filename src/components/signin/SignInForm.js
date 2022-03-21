import { css } from '@emotion/react'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { userContainer } from '../../container'
import firebase from './../../utils/firebase'


const SignInForm = ({ onFailure }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const auth = getAuth(firebase);
    const userCont = userContainer.useContainer();

    const signIn = async () => {
        setBusy(true);
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            userCont.login(user.user);
            console.log('logged in', user.user)
        } catch (error) {
            if (onFailure) onFailure(error);
            console.log(error);
        }
        setBusy(false);
    }

    return (
        <Form
            noValidate
            validated={false}
            className='d-grid'
        >
            <InputGroup className='mb-2' css={styles.inputGroup}>
                <InputGroup.Text id='inputGroupPrepend'>
                    <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                    type='email'
                    placeholder='Email'
                    aria-describedby='inputGroupPrepend'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </InputGroup>
            <InputGroup className='mb-2' css={styles.inputGroup}>
                <InputGroup.Text id='inputGroupPrepend'>
                    <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    aria-describedby='inputGroupPrepend'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </InputGroup>
            <Button
                variant='outline-light'
                //css={styles.button}
                onClick={signIn}
                disabled={busy}
            >
                {
                    busy && <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                    />
                }
                Sign in
            </Button>
        </Form >
    )

}

const styles = {
    inputGroup: css({
        margin: '1 0'
    }),
}

export default SignInForm