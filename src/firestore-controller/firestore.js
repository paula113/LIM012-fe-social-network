
// FUNCION QUE BORRA PUBLICACIONES
// export const deletePublication = (e) => firebase.firestore().collection('post').doc(e).delete();
export const deletePublication = e => firebase.firestore().collection('post').doc(e).delete()
  .catch((error) => {
    console.error('Error removing document: ', error);
  });


export const changeVisibility = (postId, value) => firebase.firestore().collection('post').doc(postId).update({
  visibility: value,
})
  .catch((error) => {
    // The document probably doesn't exist.
    console.error('Error updating document: ', error);
  });
export const likeCounter = (doc, value, user) => firebase.firestore().collection('post').doc(doc.id).update({
  like: firebase.firestore.FieldValue.increment(value),
  arrayUidLikes: doc.data().arrayUidLikes.concat([{ currentUserId: user.uid },
  ]),
});

export const dislikeCounter = (doc, value, user) => firebase.firestore().collection('post').doc(doc.id).update({
  like: firebase.firestore.FieldValue.increment(value),
  arrayUidLikes: doc.data().arrayUidLikes.filter(elem => elem.currentUserId !== user.uid),
});
/*
*  CLOUD FIRESTORE FUNCTIONS create publication
*/ // Create a new collection and a document
// eslint-disable-next-line max-len
export const publishStatus = (userName, userEmail, statusPost, postDate, visibilityPost, imgPost, uid) => firebase.firestore().collection('post').add({
  id: uid,
  name: userName,
  email: userEmail,
  status: statusPost,
  date: postDate,
  visibility: visibilityPost,
  img: imgPost,
  like: 0,
  arrayUidLikes: [],
})
  .catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    // console.error('Error adding document: ', errorCode);
    // console.error('Error errorMessage adding document: ', errorMessage);
    return errorCode;
  });

// FUNCIÓN PARA ACTUALIZAR LOS POSTS
// eslint-disable-next-line max-len
// export const editNote = (idDoc, textarea) => firebase.firestore().collection('post').doc(idDoc).update({status: textarea});
export const editNote = (idDoc, textarea) => firebase.firestore().collection('post').doc(idDoc).update({
  status: textarea,
})
  .catch((error) => {
    // The document probably doesn't exist.
    console.error('Error updating document: ', error);
  });
/*
* READ DATABASE
*/
export const getStatus = (callback) => {
  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapShot) => {
      const data = [];
      querySnapShot.forEach((doc) => {
        data.push(doc);
      });
      callback(data);
    });
};
