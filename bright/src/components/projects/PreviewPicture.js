import React from 'react'

const PreviewPicture = (props) => {
    const { avatarURL } = props
    return(
        <img className='img-fluid mb-2 mt-2' src={ avatarURL } />
    )
}

export default PreviewPicture
