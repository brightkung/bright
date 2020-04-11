import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from  'react-redux'
import { Row,Col,Form,Nav,Table} from 'reactstrap';
import { Redirect  } from 'react-router-dom'
import firebase from 'firebase/app'
import { firestoreConnect } from 'react-redux-firebase'
import { compose} from 'redux'



let market = []
let markets = []


const shoppingcart = (props) => {
    const { projects , auth , notification } = props
    
    
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots:true});
    var getDoc = db.collection('Cart').doc(auth.uid).get().then(doc => {
    let carts = doc.data().Cart
    let counts = doc.data().Count
    for(let i = 0 ;i < carts.length;i++){
        db.collection('products').doc(carts[i]).get().then(doc2 =>{
            console.log(doc2.data().title)
      
        market.push(<h1>{doc2.data().title}</h1>)
        market.push(<h1>{doc2.data().balance}</h1>)
        market.push(<h1>{doc2.data().price}</h1>)
        
       
        
        console.log(market)
        
        console.log(2)
        
        })
        console.log(market)
    }
    
    console.log(carts)
    console.log(counts)  
    
    
    })
    console.log(market)
    
    

    //console.log(auth)
    
    
    let eiei = [(<tr><th>asdasdasd</th></tr>)]
 
    return(
        
        
            <div>
                <Table style ={{color:'red'}}>
               {market}
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