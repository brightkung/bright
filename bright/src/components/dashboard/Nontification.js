import React from 'react'
import moment from 'moment'

const Nontifications = (props) => {
    const {nontification} = props;
    return(
        <div className='section'>
            <div className='card z-depth-0'>
               <div className='card-content'>
                   <span className='card-title'>
                        Nontifications
                   </span>
                   <ul className='notifications'>
                       { nontification && nontification.map(item => {
                           return (
                               <li key={item.id}>
                                   <span className="pink-text">{item.user}</span>
                                   <span>{item.content}</span>
                                   <div className="grey-text note-date">
                                       {moment(item.time.toDate()).fromNow()}
                                   </div>
                               </li>
                           )
                       })}
                   </ul>
               </div>
            </div>
        </div>
    )
}

export default Nontifications