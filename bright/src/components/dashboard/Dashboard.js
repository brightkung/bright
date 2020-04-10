import React, { Component} from 'react'
import Nontifications from './Nontification'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose} from 'redux'
import { Redirect } from 'react-router-dom'


import SlideShow from './slides'

class Dashboard extends Component{
    render(){
       // console.log(this.props)
       const { projects , auth , notification } = this.props
       if(!auth.uid) return <Redirect to='/signin' />
       
        return(
            <div className="dashboard container">
                
                <div className="row" >
                    <div className='col s12 m6'>
                    <SlideShow />
                        <ProjectList projects={projects}/>
                        
                    </div>
                    {/* <div className='col s12 m5 offset-m1'> 
                        <Nontifications notification={notification}/>
                    </div> */}
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('oop',state)
    return{
        projects: state.firestore.ordered.products,
        cart: state.firestore.ordered.Cart,
        auth: state.firebase.auth,
        notification: state.firestore.ordered.notification
    }
        
    
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'products'},{collection: 'Cart'},
        {collection: 'notification', limit: 3}
    ])
)(Dashboard)