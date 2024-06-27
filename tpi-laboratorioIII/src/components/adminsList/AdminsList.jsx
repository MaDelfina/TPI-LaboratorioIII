
import EachAdmin from '../eachAdmin/EachAdmin'
import { Container, ListGroup } from 'react-bootstrap'

const AdminsList = ({usersArray, onDeleteUser}) => {
    const filteredAdmins = usersArray.filter((user) => user.rol === 'Admin')

    return (
        <Container style={{width: '400px', padding: "15px"}}>
            <h4>Administrators</h4>
            <ListGroup>
                {filteredAdmins.map((user, index) => (
                    <EachAdmin key={index} name={user.userName} onDelete={onDeleteUser} id={user.id} />
                ))}
            </ListGroup>
        </Container>
    )
}

export default AdminsList