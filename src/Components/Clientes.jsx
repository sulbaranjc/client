
import React,{useEffect} from 'react'
import axios from 'axios';
import "../Styles/components/Clientes.css"


import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useState } from 'react';

const NUM_OF_ITEMS = 10;

//const API_URL_SERVER = "http://sulbaranjc.com:3300/";
//const API_URL_SERVER = "http://192.168.1.147:3300/";
const API_URL_SERVER = "http://localhost:3150/";
const API_TABLA_CONTROLLER = "api/clients/";
const API_TOTAL_CONTROLLER = API_URL_SERVER+API_TABLA_CONTROLLER;




function Clientes() {
const [datos,setDatos] = React.useState([])  
// const [datos_Filtrados,setDatosFiltrados] = React.useState([])  
const [first_name,setFirst_name] = React.useState("")  
const [last_name,setLast_name] = React.useState("")  
const [phone_number,setPhone_number] = React.useState("")  
const [email,setEmail] = React.useState("")  
const [address,setAddress] = React.useState("")  
const [validacionModificar,setvalidacionModificar] = React.useState(false)  
const [idModificar,setIdModificar] = React.useState(0)  
const [search, setSearch] = React.useState("")  
const [currentPage, setCurrentPage] = React.useState(0);

const handleSearch = (event) => {
  setCurrentPage(0)
  setSearch(event.target.value)
}

const filteredUser = datos.filter((user) => user.last_name.toLowerCase().includes(search.toLowerCase())
|| user.first_name.toLowerCase().includes(search.toLowerCase())
|| user.email.toLowerCase().includes(search.toLowerCase())
|| user.phone_number.toLowerCase().includes(search.toLowerCase())
|| user.address.toLowerCase().includes(search.toLowerCase())
|| user.client_id === parseInt(search)).slice(currentPage,currentPage+NUM_OF_ITEMS);


useEffect(() =>{
  cargarDatos()
},[])

const cargarDatos = async() => {
  const respuesta = await axios.get(API_TOTAL_CONTROLLER)
  respuesta.data.sort((a, b) => (a.client_id - b.client_id));
  setDatos(respuesta.data)
 
}


const addClient = async (e) => {
  e.preventDefault()
  await axios.post(API_TOTAL_CONTROLLER,{
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
  await axios.delete(`${API_TOTAL_CONTROLLER}${id}`) 
  cargarDatos()
}

const nexpPage = () =>{
  if (filteredUser.length === NUM_OF_ITEMS) setCurrentPage( currentPage + NUM_OF_ITEMS );
  // setCurrentPage( currentPage + NUM_OF_ITEMS );
}

const prevPage = () =>{
  if ( currentPage > 0 )  setCurrentPage( currentPage - NUM_OF_ITEMS );
}

// const firstPage = () =>{ setCurrentPage(0);}

const activarModificacion = async(id) => {
  const respuesta = await axios.get(`${API_TOTAL_CONTROLLER}${id}`)
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
  await axios.patch(`${API_TOTAL_CONTROLLER}${idModificar}`,{
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
    <Container className=" clientes mt-3 "  
      fluid={true} >
        <Row className='bg-light mx-3 border border-5 rounded-4'>
        <Col className='' xs={12} lg={8}>
          <h3 className='text-center'>Lista de Clientes</h3>
          <Form className="d-flex m-1">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 ms-1"
              aria-label="Search"
              value={search}
              onChange={handleSearch}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Pagination size="lg" className=' mt-2 ms-2 d-flex flex-row' >
            {/* <Pagination.Item>{}</Pagination.Item>  
            <Pagination.Item>{currentPage}</Pagination.Item>  
            <Pagination.Item>{filteredUser.length}</Pagination.Item>  
            <Pagination.First onClick={firstPage}/> */}
            <Pagination.Prev onClick={prevPage} />
            <Pagination.Next onClick={nexpPage} />
            {/* <Pagination.Last /> */}
          </Pagination>

          <div className='border border-5 rounded-4 ms-2 '>
            <Table className='' hover size="sm" responsive>
              <thead className=' table-primary'>
                <tr className="text-center">
                  <th colSpan={2}>Accion</th>
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
                  
                  filteredUser.map(fila => (
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

          </div>

        </Col>
        <Col className='my-4 pt-1' xs={12} lg={4}>
          <h3 className='text-center'>Formulario</h3>
          <Form className='bg-light mx-2 p-2 border border-5 rounded-4'>
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
                <Button className="text-center btn-block " variant="primary"  type="submit" size="lg" 
                  onClick={(e)=>addClient(e)}>Agregar
                </Button>
              ) }
    </div>


    </Form>
        </Col>
  
      </Row>   
    </Container>
  );
}

export default Clientes