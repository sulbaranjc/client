import React,{useEffect} from 'react'
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Clientes() {
const [datos,setDatos] = React.useState([])  
//const [client_id,setClient_id] = React.useState(0)  
const [first_name,setFirst_name] = React.useState("")  
const [last_name,setLast_name] = React.useState("")  
const [phone_number,setPhone_number] = React.useState("")  
const [email,setEmail] = React.useState("")  
const [address,setAddress] = React.useState("")  

useEffect(() =>{
  cargarDatos()
},[])

const cargarDatos = async() => {
  const respuesta = await axios.get("http://192.168.1.219:3300/api/clients/")
  setDatos(respuesta.data)
 
}


const addClient = async () => {
  await axios.post("http://192.168.1.219:3300/api/clients/",{
    first_name,
    last_name,
    phone_number,
    email,
    address
  })
  cargarDatos()
}

const delClient = async(id) => {
  await axios.delete(`http://192.168.1.219:3300/api/clients/${id}`) 
  cargarDatos()
}

  return (
    <Container className="w-lg" fluid={false}>
        <h1 className='text-center'>CRUD CLIENTES</h1>
        <Row>
        <Col xs={12} lg={8}>
          <h3 className='text-center'>Lista de Alumnos</h3>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Table bordered hover size="sm" responsive>
            <thead>
              <tr className="text-center">
                <th>Edit</th>
                <th>del</th>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Direcion</th>
              </tr>
            </thead>
            <tbody>
              {
                datos.map(fila => (
                  <tr key={fila.client_id}>
                    <td class="align-middle">
                      <Button className='me-centre' 
                        variant="warning" size="sm">Edit
                      </Button>
                    </td>
                    <td class="align-middle">
                      <Button variant="danger"
                      onClick={()=> delClient(fila.client_id)}  
                      size="sm">Elim
                      </Button>
                    </td>
                    <td>{fila.client_id}</td>
                    <td>{fila.first_name}</td>
                    <td>{fila.last_name}</td>
                    <td>{fila.email}</td>
                    <td>{fila.phone_number}</td>
                    <td style={{minWidth:"200px"}} >{fila.address}</td>
                  </tr>
  
                ))
              }
            </tbody>
          </Table>

        </Col>
        <Col xs={12} lg={4}>
          <h3 className='text-center'>Formulario</h3>
          <Form>

            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Idique Nombres"
              onChange={(e)=>setFirst_name(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="SecondName">
              <Form.Label>Apellido  </Form.Label>
              <Form.Control type="text" placeholder="indique Apellidos"
              onChange={(e)=>setLast_name(e.target.value)} />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Indique el Correo"
              onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Telfono</Form.Label>
              <Form.Control type="tel" 
                placeholder="Enter phone" 
                onChange={(e)=>setPhone_number(e.target.value)} />
            </Form.Group>

            <Form.Group  className="mb-3" controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu dirección"
                onChange={(e)=>setAddress(e.target.value)} />
            </Form.Group>
            <Button className="text-center" 
              variant="success" type="submit" 
              onClick={()=>addClient()}>
              Agregar
            </Button>
    </Form>
        </Col>
      </Row>   
    </Container>
  );
}

export default Clientes