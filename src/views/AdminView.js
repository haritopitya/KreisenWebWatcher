import React from "react";
import UserList from '../components/admin/UserList';
import { Card } from 'react-bootstrap'
import LogdataGroupForm from '../components/admin/LogdataGroupForm';

const AdminView = ({ permissions }) => {
    return (
        <div>
            <h2>管理者ページ</h2>
            {
                permissions && permissions.isAdmin ? (
                    <div>
                        <Card bg='dark'>
                            <Card.Header as="h5">
                                ロググループ設定
                            </Card.Header>
                            <Card.Body>
                                <LogdataGroupForm />
                            </Card.Body>
                        </Card>
                        <Card bg='dark'>
                            <Card.Header as="h5">
                                ユーザー設定
                            </Card.Header>
                            <Card.Body>
                                <UserList />
                            </Card.Body>
                        </Card>
                    </div>
                ) : (
                    <p>権限がありません</p>
                )
            }
        </div>
    )
}

export default AdminView
