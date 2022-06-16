import { css } from '@emotion/react';
import { browserLocalPersistence, getAuth, onIdTokenChanged, setPersistence } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import { userContainer } from './container';
import firebase from './utils/firebase';
import { AdminView, HomeView } from './views';
import SignInSignUpView from './views/SignInSignUpView';

function App() {
  const auth = getAuth(firebase);
  const database = getDatabase(firebase);
  const user = userContainer.useContainer();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      onIdTokenChanged(auth, nextUser => {
        user.login(nextUser)
        if (nextUser) {
          const uid = nextUser.uid;
          onValue(ref(database, `users/${uid}`), (snapshot) => {
            user.setPermission(snapshot.val().permissions);
            user.setProfile(snapshot.val().profile);
          }, {
            onlyOnce: true
          })
        }
      })
    })
  }, [])
  return (
    <div css={appCSS}>
      <Header />
      {user.user
        ?
        <Routes>
          <Route path={'/'} element={<HomeView />} />
          <Route path={'/admin'} element={<AdminView permissions={user.permission} />} />
        </Routes>
        : <div />}
      <SignInSignUpView />
    </div >
  );
}

const appCSS = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#142137',
  textAlign: 'center'
})

export default () => (
  <userContainer.Provider>
    <App />
  </userContainer.Provider>
)
