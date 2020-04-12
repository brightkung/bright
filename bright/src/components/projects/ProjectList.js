// import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
// import ProjectSummary from './ProjectSummary'
// import { Link } from 'react-router-dom'
// import { Row, Col, Navbar, Form, Nav, Label, InputGroup, Input, InputGroupAddon, Table, FormGroup, Button, Card, Container, NavItem } from 'reactstrap';
// const ProjracList = ({ projects }) => {
//     const [finds, setfinds] = useState('');
//     const [gofinds, setgofinds] = useState('');
//     console.log(projects)
//     let big = []
//     let arrayss = []
//     let num = 0
//     const renderCards = projects != null && projects.map((project, i) => {
//         console.log(project.title.toLowerCase().indexOf('a'))
//         if (project.title.toLowerCase().indexOf(gofinds) > -1) {
//             console.log(project.id)
//             arrayss.push(<td>
//                 <Col >
//                     <Card
//                     >
//                         <Link to={'/project/' + project.id} key={project.id} >
//                             <ProjectSummary project={project} />
//                         </Link>
//                     </Card>
//                 </Col>

//             </td>)
//             num++
//         }
//         console.log(i)
//         console.log(project)
//         console.log(projects[i])
//         if (projects[i + 1] == null) {

//             big.push(<tr>{arrayss}</tr>)
//             return big
//         }
//         else if (num % 4 == 0 && num != 0) {

//             big.push(<tr>{arrayss}</tr>)
//             arrayss = [];
//             console.log(arrayss)
//             num = 0

//         }


//     }





//     )






//     return (

//         <div style={{ width: '1200px' }} >
//             <Row >
//                 <Col>
//                     <Navbar >
//                         <Nav  >



//                             <NavItem className='text-center' style={{ backgroundColor: '#B3ADAC', width: '200px' }}>Category</NavItem><br />
//                             <NavItem style={{ backgroundColor: '#B3ADAC', width: '200px' }}><Link>EiEI</Link></NavItem><br />
//                             <NavItem style={{ backgroundColor: '#B3ADAC', width: '200px' }}><Link>EiEI</Link></NavItem><br />

//                         </Nav>
//                     </Navbar>
//                 </Col>
//                 <Col style={{ width: '300px' }}>
//                     <div>
//                         <br />

//                         <InputGroup >
//                             <td>
//                                 <Input value={finds} onChange={(e) => setfinds(e.target.value)} style={{ backgroundColor: '#ffffff', width: '700px' }} type="text" name="search" id="s" placeholder="Search..." />
//                             </td>

//                             <td>
//                                 <Link onClick={() => { setgofinds(finds); setfinds('') }} ><img style={{ width: '50px', height: '50px' }} src='https://image.flaticon.com/icons/svg/428/428556.svg' alt="Logo" /></Link>
//                             </td>
//                             <td>
//                                 <Link to='/cart' ><img style={{ width: '50px', height: '50px' }} src='https://image.flaticon.com/icons/svg/1069/1069102.svg' alt="Logo" /></Link>
//                             </td>
//                         </InputGroup>

//                         <br />


//                         <Table>



//                             {renderCards}

//                         </Table>
//                     </div>
//                 </Col>

//             </Row>
//         </div>




//     )
// }

// export default ProjracList


import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Navbar,
  Form,
  Nav,
  Label,
  InputGroup,
  Input,
  InputGroupAddon,
  Table,
  FormGroup,
  Button,
  Card,
  Container,
  NavItem,
  CardTitle, CardText, Jumbotron, CardBody, CardLink, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import SlideShow from '../dashboard/slides'
import { black } from 'color-name';
import { Component } from 'react';





const ProjracList = ({ projects }) => {
  const [finds, setfinds] = useState('');
  const [gofinds, setgofinds] = useState('');
  const [category,setcategory] = useState('')
  console.log(projects);
  let big = [];
  let arrayss = [];
  let num = 0;
  const renderCards =
    projects != null &&
    projects.map((project, i) => {
      console.log(project.title.toLowerCase().indexOf('a'));
      if (project.title.toLowerCase().indexOf(gofinds) > -1 && project.catValue.indexOf(category) >-1) {
        console.log(project.id);
        arrayss.push(
          <td>
            <Col>
              <Card>
                <Link to={'/project/' + project.id} key={project.id}>
                  <ProjectSummary project={project} />
                </Link>
              </Card>
            </Col>
          </td>
        );
        num++;
      }
      console.log(i);
      console.log(project);
      console.log(projects[i]);
      if (projects[i + 1] == null) {
        big.push(<tr>{arrayss}</tr>);
        return big;
      } else if (num % 4 == 0 && num != 0) {
        big.push(<tr>{arrayss}</tr>);
        arrayss = [];
        console.log(arrayss);
        num = 0;
      }
    });





  return (
    <Row>

      {/* <Card style={{ width: 1000, height: 230, borderRadius: 10 }}>
        <Jumbotron style={{ margin: 10 }}>
          <h1 className="display-3">Shopping Online</h1>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="lead"></p>
        </Jumbotron>

      </Card> */}
      <Col style={{}}>
        <div>
          <br />
          <InputGroup>
            <td>

              <Col>
                <div>
                  <Card style={{ width: 220, height: 280, backgroundColor: 'white' }}>
                    <CardTitle style={{ position: 'absolute', top: 15, left: 50 }}>
                      Category
      </CardTitle>
                    <CardBody style={{ marginLeft: 10 }}>
                      <Button onClick = {() => setcategory("PC")}style={{ position: 'absolute', top: 65, left: 50 }} color="secondary">PC   </Button><br />
                      <Button onClick = {() => setcategory("Notebook")}style={{ position: 'absolute', top: 115, left: 50 }} color="secondary">Notebook</Button><br />
                      <Button onClick = {() => setcategory("Accessory")}style={{ position: 'absolute', top: 165, left: 50 }} color="secondary">Accessory</Button>
                      <Button onClick = {() => setcategory("")}style={{ position: 'absolute', top: 215, left: 50 }} color="secondary">All   </Button><br />
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </td>
            <td>
              <Input
                value={finds}
                onChange={e => setfinds(e.target.value)}
                style={{ backgroundColor: '#ffffff', width: '700px', borderRadius: 5, height: 39, }}
                type='text'
                name='search'
                id='s'
                placeholder='   Search...'
              />
            </td>
            <td>
              <Link
                onClick={() => {
                  setgofinds(finds);
                  setfinds('');
                }}
              >
                <img
                  style={{ width: '40px', height: '40px' }}
                  src='https://image.flaticon.com/icons/svg/428/428556.svg'
                  alt='Logo'
                />
              </Link>
            </td>
            <td style={{ width: 20 }}>
              <Link to='/cart'>
                <img
                  style={{ width: '40px', height: '40px' }}
                  src='https://image.flaticon.com/icons/svg/1069/1069102.svg'
                  alt='Logo'
                />
              </Link>



            </td>

          </InputGroup>

          <br />
          <Table>{renderCards}</Table>
        </div>
      </Col>
    </Row>
  );
};

export default ProjracList;