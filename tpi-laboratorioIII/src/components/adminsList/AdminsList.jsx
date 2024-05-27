
import EachAdmin from '../eachAdmin/EachAdmin'
import { Container, ListGroup } from 'react-bootstrap'

const AdminsList = ({usersArray}) => {
    const filteredAdmins = usersArray.filter((user) => user.rol === 'admin')

    return (
        <Container style={{maxWidth: '400px'}}>
            <h4>Administrators</h4>
            <ListGroup>
                {filteredAdmins.map((user) => (
                    <EachAdmin key={user.id} name={user.username}></EachAdmin>
                ))}
            </ListGroup>
        </Container>
    )
}

export default AdminsList