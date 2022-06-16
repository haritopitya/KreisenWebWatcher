import { getDatabase, off, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import firebase from '../../utils/firebase'
import UserListItem from './UserListItem'


const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const usersRef = ref(getDatabase(firebase), '/users')
    onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val())
    })
    return () => { off(usersRef) }
  }, [])

  const onUpdate = (key, val) => {
    set(ref(getDatabase(firebase), key), val)
  }
  return (
    <Table responsive striped hover variant="dark">
      <thead>
        <tr>
          <th>登録者名</th>
          <th>立場</th>
          <th>Email</th>
          <th>管理者</th>
          <th>パイロット</th>
          <th>TF観戦者</th>
          <th>鳥コン観戦者</th>
        </tr>
      </thead>
      <tbody>
        {
          users && Object.keys(users).map(uid => {
            const { permissions = {}, profile = {} } = users[uid]
            return (
              <UserListItem
                key={uid}
                uid={uid}
                permissions={permissions}
                profile={profile}
                onUpdate={onUpdate}
              />
            )
          })
        }
      </tbody>
    </Table>
  )
}

export default UserList