import React,{ useState } from 'react'

import {  connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
//import {firebase} from '../../config/fbConfig';
import { Row,Col,Form,Nav, Card,CardBody,CardTitle, CardImg, Button} from 'reactstrap';
const AddItem = (props) => {
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots:true});
    db.collection('Cart').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data())
            doc.data().Cart.push(props)
        })
    })
    
}
const ProjectDetails = (props) => {
    const [num, setnum] = useState(1);
    const { project,auth } = props;
    if(!auth.uid) return <Redirect to='/signin' />
  
    if(project){
        return(
        <Row  style = {{backgroundColor:'white'}} >
           
        <Col className = 'center' >
                <div >
                    <br />
                    <br />
                    <br />
                     <img style = {{width :'300px',height:'200px'}} src= {project.avatarURL} alt ="Logo" />
                
                    </div>
        </Col>
        <Col style = {{width:'500px',height:'500px'}}>
        <div className='contianer section project-details'>
        <div className='card z-depth-0'>
            <div className='card-content'>
                <span className='card-title'>{project.title}</span>
                <p>{project.content}</p>
                <div>Price฿ {project.price}</div>
            </div>
            <div className='card-action gret lighten-4 grey-text'>
            <Button disabled = {num == 1} onClick = {() =>{if(num > 1) setnum(num-1)}}>-</Button>
            &nbsp;&nbsp;&nbsp;{num}&nbsp;&nbsp;&nbsp;
            <Button onClick = {() =>{setnum(num+1)}}>+</Button><br />
            <br />
           
           
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick = {(props) => {AddItem(props)}}>สั่งซื้อ</Button>
                
            </div>

        </div >
    </div>
        </Col>
    </Row>
    )
    }else{
        return (
            <div className='container center'>
                <p>Loading project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    // console.log(state)
    const id = ownProps.match.params.id
    const projects = state.firestore.data.products
    const project = projects ? projects[id] : null

    return{
        project: project,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'products' }
    ])
)(ProjectDetails)
