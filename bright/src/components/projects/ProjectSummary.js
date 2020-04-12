import React from 'react';
import moment from 'moment';
import {
  Button,
  Row,
  Col,
  Form,
  Nav,
  Card,
  CardBody,
  CardTitle,
  CardImg
} from 'reactstrap';
import { black } from 'color-name';
const ProjectSummary = ({ project }) => {
  return (
    <div style={{height:346,borderRadius: 500}}>
    <Card style={{height:346,borderRadius: 10}}>
      <CardImg
        top width="100%"
        style={{ width: '15rem', height: '10rem', margin:5, borderRadius:10}}
        src={project.avatarURL}
        alt="Card image cap"
      ></CardImg>
      <CardBody style={{marginLeft:10}}>
        <CardTitle style={{color:'black'}}>{project.title}</CardTitle>
       
        
        
      </CardBody> 
      <p style={{position: 'absolute',bottom:35,left:10}}>Price: {project.price} ฿</p>
      <Button style={{marginBottom:10, marginLeft:10, position: 'absolute',bottom:0}} color="secondary">Add</Button>
    </Card>
    </div>
  );
};
export default ProjectSummary;