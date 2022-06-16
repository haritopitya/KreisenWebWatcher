import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';


const PermissionStatus=({ kind, val, onClick, disabled }) =>{
  return (
    <FontAwesomeIcon
      icon={val ? faToggleOn : faToggleOff}
      size='lg'
      onClick={disabled ? null : () => { onClick(kind, !val) }}
      color={val ? 'green' : 'gray'}
    />
  )
}
const UserListItem = ({ profile = {}, permissions = {}, onUpdate, uid}) => {

  const onClick = (kind, val) => {
    const key = `/users/${uid}/permissions/${kind}`
    onUpdate(key, val)
  }

  return (
    <tr key={profile.name}>
      <td>{profile.name}</td>
      <td>{profile.position}</td>
      <td>{profile.email}</td>
      <td>
        <PermissionStatus
          kind='isAdmin'
          val={permissions.isAdmin}
          onClick={onClick}
          disabled={true}
        />
      </td>
      <td>
        <PermissionStatus
          kind='isPilot'
          val={permissions.isPilot}
          onClick={onClick}
        />
      </td>
      <td>
        <PermissionStatus
          kind='isTFSpectator'
          val={permissions.isTFSpectator}
          onClick={onClick}
        />
      </td>
      <td>
        <PermissionStatus
          kind='isBRSpectator'
          val={permissions.isBRSpectator}
          onClick={onClick}
        />
      </td>
    </tr>
  )
}

export default UserListItem