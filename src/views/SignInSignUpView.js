import React, { useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap';
import SignInSignUpModalIcon from '../components/signin/SignInSignUpIcon';
import { userContainer } from '../container';
import SignUpForm from '../components/signin/SignUpForm';
import SignInForm from '../components/signin/SignInForm';
import styles from './SignInSignUpView.module.css'
import classNames from 'classnames'
import 'animate.css';


const SignInSignUpView = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [invalidated, setInvalidated] = useState(false);
    const user = userContainer.useContainer();
    const onFailure = (e) => {
        setInvalidated(true);
        setTimeout(() => { setInvalidated(false) }, 1 * 1000)
    }
    const shakeClass = 'animate__animated animate__shakeX'
    return (
        <Modal centered show={!user.user} className={classNames(styles.modal, invalidated && shakeClass)}>
            <Modal.Header>
                <Container>
                    <Row>
                        <SignInSignUpModalIcon />
                    </Row>
                    <Row>
                        <Modal.Title
                            as={Col}
                            className={classNames('mx-auto', !showSignup ? styles.title : styles.unactiveTitle)}
                            onClick={() => { setShowSignup(false) }}
                        >
                            SignIn
                        </Modal.Title>
                        <Modal.Title
                            as={Col}
                            className={classNames('mx-auto', showSignup ? styles.title : styles.unactiveTitle)}
                            onClick={() => { setShowSignup(true) }}
                        >
                            SignUp
                        </Modal.Title>
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body>
                {
                    showSignup ? (
                        <SignUpForm
                            onLogin={user.login}
                            onFailure={onFailure}
                        />
                    ) : (
                        <SignInForm
                            onLogin={user.login}
                            onFailure={onFailure}
                        />
                    )
                }
            </Modal.Body>
        </Modal>
    )
}


export default SignInSignUpView;