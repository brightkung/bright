import React,{useState, Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button} from 'reactstrap';
import PreviewPicture from '../projects/PreviewPicture'
import FileUploader from "react-firebase-file-uploader";



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs,a) {
  return { name, calories, fat, carbs,a };
}


let market = []
let getDoc
let counts 
let carts
let num

let rows2 = [];

function refreshPage(){ 
  window.location.reload(); 
}


const Editt = (props) => {
  let check = false
  let cart2 = []
  let count2 = []
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  getDoc = db.collection('Cart').doc(props[0].uid).get().then(doc => {
    carts = doc.data().Cart
    counts = doc.data().Count
     
    for(let j = 0 ; j <carts.length;j++){
     
      console.log(carts[j])
      console.log(props[1])
      if(carts[j] == props[1]){
        if(counts[j] > 1){
          cart2.push(carts[j])
          count2.push(counts[j]-1)
        }
      }
      else{
        cart2.push(carts[j])
        count2.push(counts[j])
      }
    }
    check = true
    db.collection('Cart').doc(props[0].uid).set({
      Cart:cart2,Count:count2
    })
    
   
    
})


}


const componentDidUpdate = () =>{
  {this.setState({rowss:[]})}
}

const run = (props) => {
  Editt([props[0],props[1]]) 
 /* setTimeout(function() { //Start the timer
    refreshPage()
}.bind(this), 1500)*/
  
}
const sendslip = () => {
  return(
  <div>
   
                   
    </div>)
  
}
class SimpleTable extends Component {
  
  constructor(props){
    super(props)
    const { auth } = this.props
    
    let num = 0
    let rows = [];
    this.setState({rowss:[]})
    this.setState({au:auth})
   
  
  
    let check = 0
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  getDoc = db.collection('Cart').doc(auth.uid).get().then(doc => {
    carts = doc.data().Cart
    counts = doc.data().Count
    
    carts.map((cart, i) => {
      check = 0
      
      db.collection('products').doc(cart).get().then(doc2 => {
        console.log(cart)
        console.log(doc2.data().title)
        if(rows.length < carts.length && cart == doc2.data().title  ){
          console.log(doc2.data().title)
          this.setState({sum:this.state.sum+=(counts[i]*doc2.data().price)})
          rows.push(createData(doc2.data().title,counts[i],doc2.data().price,<Button onClick = {() => {run([auth,doc2.data().title])}}>ลบ</Button>))
          num++
          check++
        
        }

          
       console.log(rows)
        this.setState({rowsss:rows})
        this.setState({rowss:this.state.rowsss})
        this.setState({rowsss:[]})

        
      })
      

      
    }
    
    )
    
  
  })
 
  db.collection('Cart').doc(auth.uid).get().then(doc => {
    
    this.setState({c1:doc.data().Cart})
      this.setState({c2:doc.data().Count})
     
  })
  
  }
  
  
  state = {
    rowss:[],
    rowsss:[],
    sum:0,
    au:'',
    c1:[],C2:[],cnt1:[],cnt2:[],ul:[],
    avatarURL:'',ans:''
};
handleUploadSuccess = filename => {
  this.setState({ avatar: filename, progress: 100, isUploading: false });
  firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
};

checkout (props) {
let answer = ''
let num = 0
 

const db = firebase.firestore();
  setTimeout(function() {
    console.log(2)
  }.bind(this), 2500)
  console.log(this.state.c1)
  this.state.c1.map((product,i) => {
    if(num <this.state.c2.length)
    answer+= product+"  :  "+this.state.c2[i]+','
    this.setState({ans:this.state.ans+'  '+product+"  :  "+this.state.c2[i]})
    console.log(this.state.ans)
    num++
  })
   
  
      
      
  


  
    db.collection('Order').doc(props.uid).set({
      Cart:answer,url:this.state.avatarURL
  
    })
    db.collection('Cart').doc(props.uid).set({
      Cart:[],Count:[]
  
    })

  
  setTimeout(function() {//Start the timer
    
   setTimeout(function() { //Start the timer
     refreshPage()
  }.bind(this), 1500)
}.bind(this), 3000)
  
  
}

  render () {
    const { auth } = this.props
    
  
  
  return (
    <TableContainer component={Paper} >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price (THB)&nbsp;</TableCell>
            <TableCell align="right">ลบ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
          
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        
        <TableBody>


          
         
          {this.state.rowss.map((row) => (
            
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>

              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              
              <TableCell align="right">{row.carbs}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
            <TableCell align="right">ราคารวม {this.state.sum}</TableCell>
          
          <TableCell  align="right"><Button disabled = {this.state.avatarURL == '' || this.state.rowss.length == 0} onClick = {() =>{ this.checkout(auth)}}>สั่งซื้อ</Button></TableCell>
          
          
          

        </TableBody>
      </Table>
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
    </TableContainer>
    
    
  );
            }
          
}



const mapStateToProps = state => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
};


export default connect(mapStateToProps)(SimpleTable)