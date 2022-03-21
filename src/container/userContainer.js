import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useUserContainer = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({ name: '', email: '', position: '' });
    const [permission, setPermission] = useState({ isAdmin: null, isTFSpectator: null, isBRSpectator: null });

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        setProfile(null)
        setPermission(null)
    }
    return { user, login, logout, permission, setPermission, profile, setProfile };
}

export default createContainer(useUserContainer);