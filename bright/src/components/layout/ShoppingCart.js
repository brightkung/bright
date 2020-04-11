import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from  'react-redux'
import { Card,Row,Col,Form,Nav,Table} from 'reactstrap';
import { Redirect  } from 'react-router-dom'
import firebase from 'firebase/app'
import { firestoreConnect } from 'react-redux-firebase'
import { compose} from 'redux'


let market = []
    let markets = []
    let getDoc


const show = (props) => {
    
    
    
   
    
    
}
const shoppingcart = (props) => {

    const { projects , auth , notification } = props
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots:true});
    getDoc = db.collection('Cart').doc(auth.uid).get().then(doc => {
    let carts = doc.data().Cart
    let counts = doc.data().Count
     carts.map((cart,i) =>{

        
        
            db.collection('products').doc(cart).get().then(doc2 =>{
            market.push(doc2.data)
                       
                
       
            
        
        
        })
      
    }
    
    )
    
    console.log(market)
    console.log(counts)  
    
    
    console.log(carts)
    })
    
    

    //console.log(auth)
    
    
    let eiei = [market]

    
    const a = show(auth)
    console.log(market)
    return(<div>
        <Table>
    <h2>{eiei}</h2>
       
       </Table>
        </div>

    )
    
   
    
}




const mapStateToProps = state => {
    console.log(state)
    return{
        auth: state.firebase.auth,
        profile : state.firebase.profile
  }
}; 


export default connect(mapStateToProps)(shoppingcart)