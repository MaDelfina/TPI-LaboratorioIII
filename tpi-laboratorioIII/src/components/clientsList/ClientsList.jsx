
import EachClient from '../eachClient/EachClient'
import { Container, ListGroup } from 'react-bootstrap'

const ClientsList = ({usersArray, onDeleteUser}) => {
    const filteredClients = usersArray.filter((user) => user.rol === 'client')

    return (
        <Container style={{width: '400px', padding: "15px"}}>
            <h4>Clients</h4>
            <ListGroup>
                {filteredClients.map((user) => (
                    <EachClient key={user.id} name={user.username} onDelete={onDeleteUser} id={user.id} />
                ))}
            </ListGroup>
        </Container>
    )
}

export default ClientsList