import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from  'react-redux'
import { Row,Col,Form,Nav} from 'reactstrap';

const Navbar = (props) => {
    const { auth , profile } = props 
    //console.log(auth)

    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
    
    return(
        <nav className="nav-wrapper grey darken-3">
            
            <div className="container">
                  
                      
            <Link to='/' className="brand-logo">E-Commerce &nbsp;&nbsp;&nbsp; </Link>

                   
                        { links }
                       
                    
                        
                    
                
            </div>
           


        </nav>

    )
}

const mapStateToProps = state => {
    console.log(state)
    return{
        auth: state.firebase.auth,
        profile : state.firebase.profile
  }
}; 


export default connect(mapStateToProps)(Navbar)