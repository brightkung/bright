import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editProfile } from '../../store/actions/authAction'
import firebase from 'firebase/app'
import { Button} from 'reactstrap';
class profileBuild extends Component {
   constructor(props){
       super(props)
       const { auth } = this.props
        this.state.authid  = auth.uid
        this.start()
   }

    state = {
        
        authid:'',
        firstName: '',
        lastName: '',
        address:'',
        phone:'',
        initials:''

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.editProfile(this.state)
        this.props.history.push('/')
    }
     start = () => {
        const db = firebase.firestore();
        db.settings({timestampsInSnapshots:true});
        const getDoc = db.collection('users').doc(this.state.authid).get().then(doc => {
            this.state.firstName = doc.data().firstName
            console.log(this.state.firstName)
            this.state.lastName = doc.data().lastName
            this.state.address = doc.data().address
            this.state.phone = doc.data().phone
            this.state.initials = doc.data().initials
            
        })
       
    }
    setprofile = () => 
{
    const db = firebase.firestore();
        db.settings({timestampsInSnapshots:true});
        console.log(this.state.address)
        console.log(this.state.firstName)
        console.log(this.state.address)
        const getDoc = db.collection('users').doc(this.state.authid).set({
        address:this.state.address,
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        phone:this.state.phone,
        initials:this.state.firstName[0] + this.state.lastName[0]
        })

}


    render() {
        console.log(this.props)
        
        
        
        
        return (
            
            <div className='container'>
             
                <form className='white'>
                    <h5 className='grey-text text-darken-2'>Edit Your Profile</h5>
                    
                    <div >
                    
                        <label>Firstname</label>
                        <input type='text' defaultValue = {this.state.firstName|| ''} id='firstName' onChange={this.handleChange} />
                    </div>
                    <div >
                    <label>Lasttname</label>
                        <input type='text' defaultValue = {this.state.lastName|| ''} id='lastName' onChange={this.handleChange}/>
                    </div>
                    <div >
                    <label>Phone_Number</label>
                        <input type='text' defaultValue = {this.state.phone|| ''} id='phone' onChange={this.handleChange}/>
                    </div>
                    <div >
                    <label>Address</label>
                        <input type='text'defaultValue = {this.state.address|| ''}  id='address' onChange={this.handleChange}/>
                    </div>


                    <div className='input-field'>
                        {/* <button className='btn red lighten-1 z-depth-0'>cancel</button> */}
                        <Button onClick ={this.setprofile} >save</Button>
                    </div>

                </form>
            </div>
        )
        
       
        
    }
}


const mapStateToProps = state => {
    console.log("nices",state)
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
  
};


const mapDispatchToProps = dispatch => {
     return {
        editProfile : (pro)  => dispatch(editProfile(pro))
     }
}


export default connect(mapStateToProps, mapDispatchToProps)(profileBuild)
