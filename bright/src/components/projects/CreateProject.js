import React, { Component } from 'react'
import FileUpload from './FileUpload'
import { createProject } from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { storage } from '../../config/fbConfig.js';
import 'firebase/storage';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import PreviewPicture from './PreviewPicture'





class CreateProject extends Component {

    state = {
        title: '',
        content: '',
        price: '',
        balance: 0,
        url: '', progress: 0,
        avatarURL: "",
        catValue: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        //console.log(this.state)
        this.props.createProject(this.state)
        this.props.history.push('/')
    }
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ avatarURL: url }));
    };

    render() {
        console.log(this.state)
        const { auth, value } = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} className='white'>

                    <h5 className='grey-text text-darken-3'>Upload New Product</h5>

                    <FileUploader
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                    <PreviewPicture avatarURL={this.state.avatarURL} />

                    <div className='input-field'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' id='title' onChange={this.handleChange} />
                    </div>

                    <div className='input-field'>
                        <label htmlFor='content'>Product Detail</label>
                        <textarea id='content' className='materialize-textarea' onChange={this.handleChange}></textarea>
                    </div>



                    <div className='input-field'>
                        <label htmlFor='price'>Price (THB)</label>
                        <input type='number' id='price' onChange={this.handleChange} />
                    </div>

                    <div className='input-field'>
                        <label htmlFor='balance'>Balance</label>
                        <input type='number' id='balance' onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        {/* <FormControl component="fieldset">
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={this.handleChange}>
                                <FormControlLabel id='catvalue' value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                            </RadioGroup>
                        </FormControl> */}
                        <fieldset>
                            <legend>Category</legend>
                            <p>
                                <label>
                                    <input class="with-gap" name="gender" type="radio" id='catValue' value='PC' onChange={this.handleChange} />
                                    <span>PC</span>
                                </label><br/>
                                <label>
                                    <input class="with-gap" name="gender" type="radio" id='catValue' value='Accessory' onChange={this.handleChange} />
                                    <span>Accessory</span>
                                </label><br/>
                                <label>
                                    <input class="with-gap" name="gender" type="radio" id='catValue' value='Notebook' onChange={this.handleChange} />
                                    <span>Notebook</span>
                                </label>
                            </p>
                        </fieldset>

                    </div>



                    <div className='input-field'>
                        <button className='btn pink lighten-1 z-depth-0'>Upload</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
