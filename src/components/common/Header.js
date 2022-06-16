import { css } from '@emotion/react';
import { faSignOutAlt, faUserAlt, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Navbar, NavbarBrand } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { NavLink } from 'react-router-dom';
import { userContainer } from '../../container';
import firebase from '../../utils/firebase';
import UserInfoModal from './UserInfoModal';

const Header = () => {
    const userCont = userContainer.useContainer();
    const user = userCont.user;
    const permissions = userCont.permission;
    const isAdmin = permissions && permissions.isAdmin;
    const profile = userCont.profile;
    const userData = { permissions, profile };
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const onClickUserIcon = () => {
        setShowUserInfoModal(true)
    };
    const signout = () => {
        userCont.logout();
        const auth = getAuth(firebase);
        signOut(auth)
        console.log('signout')
    }
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <NavLink to={'/'}>
                    <NavbarBrand css={css({ paddingLeft: 10 })}>
                        <img
                            alt='logo'
                            src='./images/logo_simple.png'
                            className='d-inline-block align-top'
                            height={'30vh'}
                        />
                        Kreisen Watcher
                    </NavbarBrand>
                </NavLink>
                <NavbarCollapse className='justify-content-end'>
                    {
                        isAdmin && (
                            <NavLink to={'/admin'}>
                                <Button variant='dark'>
                                    <FontAwesomeIcon
                                        icon={faUsersCog}
                                    />
                                </Button>
                            </NavLink>
                        )
                    }
                    {user && (
                        <>
                            <Button variant='dark'>
                                <FontAwesomeIcon
                                    icon={faUserAlt}
                                    onClick={onClickUserIcon}
                                />
                            </Button>
                            <Button variant='dark'>
                                <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                    onClick={signout}
                                />
                            </Button>
                        </>
                    )}
                </NavbarCollapse>
            </Navbar>
            <UserInfoModal
                show={showUserInfoModal}
                onClose={() => { setShowUserInfoModal(false) }}
                {...userData}
            />
        </>
    )
}

export default Header
