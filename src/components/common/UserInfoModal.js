import React from 'react'
import { Modal, Table } from 'react-bootstrap'

const UserInfoModal = ({ show, onClose, profile, permissions }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered={true}
        >
            <Modal.Header closeButton>
                <h4>アカウント情報</h4>
            </Modal.Header>
            <Modal.Body>
                <Table responsive striped>
                    <tbody>
                        <tr>
                            <td> 名前 </td>
                            <td> {profile && profile.name} </td>
                        </tr>
                        <tr>
                            <td> email </td>
                            <td> {profile && profile.email} </td>
                        </tr>
                        <tr>
                            <td> 立場 </td>
                            <td> {profile && profile.position} </td>
                        </tr>
                        <tr>
                            <td> TF閲覧権限 </td>
                            <td> {permissions && permissions.isTFSpectator ? 'あり' : 'なし'} </td>
                        </tr>
                        <tr>
                            <td> 鳥コン閲覧権限 </td>
                            <td> {permissions && permissions.isBRSpectator ? 'あり' : 'なし'} </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default UserInfoModal