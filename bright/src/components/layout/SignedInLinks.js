import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction'
import { Media } from 'reactstrap';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            
            <li><NavLink to='/createproject'>Upload New Product</NavLink></li>
            {props != null ?(
            <li>{props.profile.firstName + "   " + props.profile.lastName}&nbsp;&nbsp;</li>):(<li> Loading </li>)}
            {/* <li><img  style = {{width:'50px',height:'60px'}} src="https://image.flaticon.com/icons/svg/236/236831.svg" alt="Generic placeholder image" /></li> */}

            <li><NavLink to='/profileBuild' className='btn btn-floating green lighten-1'>
                    {props.profile.initials}
                </NavLink></li>

            <li><a onClick={props.signOut}>Log Out</a></li> 

        </ul>

    )
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)