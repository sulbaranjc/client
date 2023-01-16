import React,{useEffect} from 'react'
import axios from 'axios';
import "../Styles/components/Clientes.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Clientes() {
const [datos,setDatos] = React.useState([])  
const [first_name,setFirst_name] = React.useState("")  
const [last_name,setLast_name] = React.useState("")  
const [phone_number,setPhone_number] = React.useState("")  
const [email,setEmail] = React.useState("")  
const [address,setAddress] = React.useState("")  
const [validacionModificar,setvalidacionModificar] = React.useState(false)  
const [idModificar,setIdModificar] = React.useState(0)  


useEffect(() =>{
  cargarDatos()
},[])

const cargarDatos = async() => {
  const respuesta = await axios.get("http://192.168.1.219:3300/api/clients/")
  respuesta.data.sort((a, b) => (a.client_id - b.client_id));
  setDatos(respuesta.data)
 
}


const addClient = async (e) => {
  e.preventDefault()
  await axios.post("http://192.168.1.219:3300/api/clients/",{
    first_name,
    last_name,
    phone_number,
    email,
    address
  })
  LimpiarFormulario()
  cargarDatos()
}

const delClient = async(id) => {
  await axios.delete(`http://192.168.1.219:3300/api/clients/${id}`) 
  cargarDatos()
}

const activarModificacion = async(id) => {
  const respuesta = await axios.get(`http://192.168.1.219:3300/api/clients/${id}`)
  setFirst_name(respuesta.data[0].first_name)
  setLast_name(respuesta.data[0].last_name)
  setPhone_number(respuesta.data[0].phone_number)
  setEmail(respuesta.data[0].email)
  setAddress(respuesta.data[0].address)
  setvalidacionModificar(true)
  setIdModificar(id)
}

const LimpiarFormulario= () => {
  setFirst_name("")
  setLast_name("")
  setPhone_number("")
  setEmail("")
  setAddress("")
}
const modificarAlumno = async(e) => {
  e.preventDefault()
  await axios.patch(`http://192.168.1.219:3300/api/clients/${idModificar}`,{
    first_name,
    last_name,
    phone_number,
    email,
    address  
  }) 
  setvalidacionModificar(false)
  LimpiarFormulario()
  cargarDatos()
}
  return (
    <Container className=" clientes " 
      fluid={true}>
        <h1 className='text-center'>CRUD CLIENTES</h1>
        <Row className='bg-light mx-3 border border-5 rounded-3' >
        <Col className='' xs={12} lg={8}>
          <h3 className='text-center'>Lista de Clientes</h3>
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
                        variant="warning" size="sm" onClick={()=>activarModificacion(fila.client_id)}>
                          <ion-icon name="create-outline"></ion-icon>
                      </Button>
                    </td>
                    <td class="align-middle">
                      <Button variant="danger"
                      onClick={()=> delClient(fila.client_id)}  
                      size="sm"><ion-icon name="trash-outline"></ion-icon>
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
          <Form className='bg-light'>

            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombres" 
              onChange={(e)=>setFirst_name(e.target.value)}
              value={first_name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="SecondName">
              <Form.Label>Apellido  </Form.Label>
              <Form.Control type="text" placeholder="Apellidos"
              onChange={(e)=>setLast_name(e.target.value)} 
              value={last_name}/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Correo Electronico"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Telfono</Form.Label>
              <Form.Control type="tel" 
                placeholder="Numero de Telefono" 
                onChange={(e)=>setPhone_number(e.target.value)} 
                value={phone_number}/>
            </Form.Group>

            <Form.Group  className="mb-3" controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" placeholder="dirección"
                onChange={(e)=>setAddress(e.target.value)}
                value={address}/>
            </Form.Group>
            <div className="d-grid">
              {validacionModificar ? (
                <Button className="text-center" variant="warning" type="submit" size="lg" onClick={(e)=>modificarAlumno(e)}>Modificar</Button>
                  ) : (
                <Button className="text-center btn-block " variant="success" type="submit" size="lg" onClick={(e)=>addClient(e)}>Agregar</Button>
              ) }
    </div>


    </Form>
        </Col>
      </Row>   
    </Container>
  );
}

export default Clientes