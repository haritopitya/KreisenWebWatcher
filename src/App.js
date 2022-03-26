import { css } from '@emotion/react';
import { browserLocalPersistence, getAuth, onIdTokenChanged, setPersistence } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import Header from './components/common/Header';
import { userContainer } from './container';
import firebase from './utils/firebase';
import { HomeView } from './views';
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
      {user.user ? <HomeView /> : <div />}
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
