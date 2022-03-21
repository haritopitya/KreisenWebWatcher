import React from 'react'
import { Card, Col } from 'react-bootstrap'

const DataCard = ({ data }) => {
    if (!data) return null
    const styles = {
        card: {
            marginTop: '5px',
            marginBottom: '5px',
        },
        icon: {
            fontSize: '50px',
        },
        val: {
            fontSize: '30px',
            color: data.color,
        },
        title: {
            fontSize: '15px',
            color: 'white',
        },
    }
    return (
        <Col>
            < Card
                bg='dark'
                style={styles.card} >
                <Card.Body>
                    <div style={styles.title}>
                        {data.title}
                    </div>
                    <div style={styles.val}>
                        {data.value}{data.unit}
                    </div>
                </Card.Body>
            </Card >
        </Col >
    )
}

export default DataCard