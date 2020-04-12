import React from 'react'
import moment from 'moment'
import { Button, Row, Col, Form, Nav, Card, CardBody, CardTitle, CardImg } from 'reactstrap';
const ProjectSummary = ({ project }) => {
    return (

        <Card classname='text-center' style={{ width: '15rem', height: '23rem' }}>
            <CardImg classname='center text-center ' style={{ width: '15rem', height: '10rem' }} src={project.avatarURL} ></CardImg>
            <CardBody>
                <CardTitle classname='text-center'>{project.title}</CardTitle>
                <p>฿ {project.price} </p>
              
                <Button>AddtoCard</Button>
            </CardBody>
        </Card>

    )
}

export default ProjectSummary