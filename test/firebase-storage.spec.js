// Now mock 'firebase`:
import firebasemock from 'firebase-mock';

// import getStatus from '../src/firestore-controller/firestore.js';

const mockauth = new firebasemock.MockAuthentication();
global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

// eslint-disable-next-line import/first
import { uploadImagePost } from '../src/firestore-controller/firebase-storage.js';
// eslint-disable-next-line import/first
// import { getStatus } from '../src/firestore-controller/firestore.js';

const img = {
  file: {
    name: 'hola.png',
  },
  uid: '38cj4',
};


it('Deberia poder subir una img al storage', (done) => {
  const response = uploadImagePost(img.file, img.uid);
  // console.log(response.fullPath);

  try {
    // console.log(response);
    expect(response.fullPath).toEqual(`imgPost/${img.uid}/${img.file.name}`);
    done();
  } catch (error) {
    done(error);
    console.log(error.message);
  }
});
