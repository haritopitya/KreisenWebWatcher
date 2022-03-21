import React from 'react'
import { css } from '@emotion/react'
import { Image, Col, Row, Container } from 'react-bootstrap'

const SignInSignUpModalIcon = () => {
    return (
        <Container>
            <Row>
                <Col xs={{ span: 6, offset: 3 }} sm={{ span: 4, offset: 4 }} >
                    <Image
                        src='./images/logo_icon.png'
                        roundedCircle
                        css={css({ width: '100%', textAlign: 'center' })}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default SignInSignUpModalIcon