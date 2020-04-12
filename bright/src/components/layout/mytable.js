import React from 'react';
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

let rows = [];
let num
num = 0

const SimpleTable = (props) => {

  const { auth } = props
  

  const classes = useStyles();
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  getDoc = db.collection('Cart').doc(auth.uid).get().then(doc => {
    carts = doc.data().Cart
    counts = doc.data().Count
     
    carts.map((cart, i) => {
      db.collection('products').doc(cart).get().then(doc2 => {
        console.log(doc2.data().title)
        if(num < carts.length)
          rows.push(createData(doc2.data().title,counts[i],doc2.data().price,<Button>Edit</Button>))
        num++
        console.log(rows)
      })
    }
    )
  
  })

  {console.log(rows)}

  return (
    <TableContainer component={Paper}>
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



         
          {rows.map((row) => (
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