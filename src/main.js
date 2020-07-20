import { changeTmp } from './view-controller/router.js';
// import logIn from './view/logIn.js';


// educaChat = project = socialNetwork => educhatlim012@gmail.com
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8VlB-iWOQRvOwVFFlkIciTeygM1aEkVU',
  authDomain: 'socialnetwork-59f0d.firebaseapp.com',
  databaseURL: 'https://socialnetwork-59f0d.firebaseio.com',
  projectId: 'socialnetwork-59f0d',
  storageBucket: 'socialnetwork-59f0d.appspot.com',
  messagingSenderId: '661343392066',
  appId: '1:661343392066:web:558cb276d45c2d3916f8db',
  measurementId: 'G-GL7ZK0PFNX',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const storage = firebase.storage();


const init = () => {
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};
window.addEventListener('load', init);

// AGREGAR O ELIMINAR CLASE A <LI>,ACTIVAR AL HACER CLICK
const ul = document.querySelector('ul');
const li = document.querySelectorAll('li');

li.forEach((el) => {
  el.addEventListener('click', () => {
    ul.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  });
});


// const numeroDeEntradas = window.history.length;
// console.log(numeroDeEntradas);
