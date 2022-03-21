import { css } from '@emotion/react'
import { faEnvelope, faKey, faUser, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import firebase from './../../utils/firebase'


const SignUpForm = ({ onFailure }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [position, setPosition] = useState('OBOG');
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        position: false,
    });
    const [isValidated, setIsValidated] = useState(false);
    const [busy, setBusy] = useState(false);


    const validate = () => {
        const valid = isValid;
        valid.email = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email)
        valid.password = password && password.length >= 6
        valid.confirmPassword = password === confirmPassword
        valid.name = name && name.length > 0
        valid.position = position && position.length > 0
        setIsValid(valid);
        console.log(valid);
        return valid.email && valid.password && valid.confirmPassword && valid.name && valid.position
    }

    const auth = getAuth(firebase);
    const createAccount = () => {
        setBusy(true);
        createUserWithEmailAndPassword(auth, email, password)
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then((e) => {
        //         const uid = firebase.auth().currentUser.uid

        //         firebase.database().ref(`users/${uid}/profile`).set({
        //             email, name, position,
        //         })
        //     })
        //     .catch((e) => {
        //         if (onFailure) {
        //             onFailure(e)
        //         } else {
        //             console.log(e)
        //         }
        //         setBusy(false);
        //     })
    }

    // const onChange = (key, val) => {
    //     this.setState({ [key]: val, isValidated: false })
    // }

    const onSubmit = () => {
        setIsValidated(true);
        const isValid = validate()

        if (isValid) {
            createAccount()
        }
    }
    console.log(isValid)
    return (
        <Form
            noValidate
            validated={isValidated}
            className='d-grid'
        >
            <InputGroup className='mb-2' css={styles.inputGroup}>
                <InputGroup.Text id='inputGroupPrepend'>
                    <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                    type='text'
                    placeholder='Name'
                    aria-describedby='inputGroupPrepend'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isValid={isValidated && !isValid.name}
                    isInvalid={isValidated && isValid.name}
                />
            </InputGroup>
            <InputGroup className='mb-2' css={styles.inputGroup}>
                <InputGroup.Text id='inputGroupPrepend'>
                    <FontAwesomeIcon icon={faWrench} />
                </InputGroup.Text>
                <Form.Control
                    as='select'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    isValid={isValidated && isValid.position}
                    isInvalid={isValidated && !isValid.position}
                >
                    <option>現役</option>
                    <option>OBOG</option>
                    <option>その他</option>
                </Form.Control>
            </InputGroup>
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
                    isValid={isValidated && isValid.email}
                    isInvalid={isValidated && !isValid.email}
                />
                <Form.Control.Feedback type='invalid'>
                    メールアドレスが正しくありません
                </Form.Control.Feedback>
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
                    isValid={isValidated && isValid.password}
                    isInvalid={isValidated && !isValid.password}
                />
                <Form.Control.Feedback type='invalid'>
                    パスワードは6文字以上で入力してください
                </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className='mb-2' css={styles.inputGroup}>
                <InputGroup.Text id='inputGroupPrepend'>
                    <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
                <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    aria-describedby='inputGroupPrepend'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isValid={isValidated && isValid.confirmPassword}
                    isInvalid={isValidated && !isValid.confirmPassword}
                />
                <Form.Control.Feedback type='invalid'>
                    パスワードが異なっています
                </Form.Control.Feedback>
            </InputGroup>
            <Button variant='outline-light' onClick={onSubmit} disabled={busy}>
                {
                    busy && <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                    />
                }
                Sign up
            </Button>
        </Form>
    )

}

const styles = {
    inputGroup: css({
        margin: '1 0'
    }),
}

export default SignUpForm
