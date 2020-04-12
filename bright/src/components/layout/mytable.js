import React,{useState} from 'react';
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
let rows = [];
let rows2 = [];



const Editt = (props) => {
  
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
    db.collection('Cart').doc(props[0].uid).set({
      Cart:cart2,Count:count2
    })
})

}
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}
const SimpleTable = (props) => {
  
  let num = 0
  const [roweiei,setrow] = useState([])
  const { auth } = props
  
  
  const classes = useStyles();
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  getDoc = db.collection('Cart').doc(auth.uid).get().then(doc => {
    carts = doc.data().Cart
    counts = doc.data().Count
    
    carts.map((cart, i) => {
      
      db.collection('products').doc(cart).get().then(doc2 => {
        
        if(rows.length < carts.length && cart == doc2.data().title){
          console.log(doc2.data().title)
          rows.push(createData(doc2.data().title,counts[i],doc2.data().price,<Button onClick = {() => {Editt([auth,doc2.data().title])}}>Delete</Button>))
          num++
        
        }

          
       console.log(rows)
        
      })
      setrow(rows)
      
    }
    
    )
    
  
  })
  
  
  useForceUpdate()
  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price (THB)&nbsp;</TableCell>
            <TableCell align="right">Edit</TableCell>
          
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        
        <TableBody>



         
          {roweiei.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>

              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
          


        </TableBody>
      </Table>
    </TableContainer>
  );
}



const mapStateToProps = state => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
};


export default connect(mapStateToProps)(SimpleTable)