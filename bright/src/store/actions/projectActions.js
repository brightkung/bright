export const createProject = (project) => {
    return(dispatch , getState, {getFirebase , getFirestore}) =>{
        //call database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('products').doc(project.title).set({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            create:new Date(),
            
        }).then(() => {
            dispatch({type: 'CREATE_PORJECT', project });
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR',err});
        })
        

    }
    
};
