import React, { Component } from 'react'
import Nontifications from './Nontification'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

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
import SlideShow from './slides'

class Dashboard extends Component {
    componentDidMount() {
        const M = window.M;
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.dropdown-trigger');
            var instances = M.Dropdown.init(elems, {});
            var instance = M.Dropdown.getInstance(instances);
            instance.open();
        })


    }

    render() {
        // console.log(this.props)
        const { projects, auth, notification } = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">

                <div className="row" >
                    <div className='col s12 m6'>
                        {/* <SlideShow /> */}

                        {/* <a class='dropdown-trigger btn' href='#' data-target='dropdown1' style={{ width: 150 }}>Category!</a>

                        <ul id='dropdown1' class='dropdown-content'>
                            <li><a href="#!">one</a></li>
                            <li><a href="#!">two</a></li>
                            <li class="divider" tabindex="-1"></li>
                            <li><a href="#!">three</a></li>
                            <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                            <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                        </ul> */}

                        <ProjectList projects={projects} />

                        {/* footer */}


                    </div>
                    {/* <div className='col s12 m5 offset-m1'> 
                        <Nontifications notification={notification}/>
                    </div> */}

                </div>
                {/* <footer class="page-footer" style={{ width: 1000, backgroundColor: "SlateBlue" }}>
                    <div class="footer-copyright">
                        <div class="container">
                            © 2020 design by Phoom-Bright
            <a class="grey-text text-lighten-4 right" href="https://www.facebook.com/yugi.kung.3">Contact me with FaceBook</a>
                        </div>
                    </div>
                </footer> */}

                <div class="row">
                    <div class="col s12 m12">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <h3 class="card-title">Contract Us</h3>
                                <p>
                                </p>
                            </div>
                            <div class="card-action white-text">
                                <h3 class="card-title">Facebook</h3>
                                <a href="https://www.facebook.com/phoom.osiri">Phoom Osiri</a><br />
                                <a href="https://www.facebook.com/yugi.kung.3">Yanapat Pissanuwattanasak</a><br />
  
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    console.log('oop', state)
    return {
        projects: state.firestore.ordered.products,
        cart: state.firestore.ordered.Cart,
        auth: state.firebase.auth,
        notification: state.firestore.ordered.notification
    }


}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }, { collection: 'Cart' },
        { collection: 'notification', limit: 3 }
    ])
)(Dashboard)