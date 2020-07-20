import { signOut } from '../firestore-controller/firebase.js';
import { authentification } from '../firestore-controller/authenticationRouter.js';
import { publishStatus } from '../firestore-controller/firestore.js';
import { uploadImagePost } from '../firestore-controller/firebase-storage.js';
import { posts } from './components/post.js';
// import { deleteNoteOnClick } from '../firestore-controller.js';
// import { posts } from './components/post.js';

const perfil = () => {
  const perfilModal = `
  <div id="miModal" class="modal">
  <div class="flex" id="flex">
    <div class="contenido-modal">
      <div class="modal-header flex">
        <h2>Modifica tu Perfil</h2>
        <span class="close" id="close">&times;</span>
      </div>
      <div class="modal-body">

        <div>
          <img src="http://icons.iconarchive.com/icons/artcore-illustrations/artcore-4/128/github-icon.png">
        </div>
        <div>
          <span for="displayName">Display name</span> <br>
          <input type="text" id="displayName" name="displayName"/> <br>
        </div>
        <div>
          <span for="newPhotoProfile">Url of picture</span> <br>
          <input type="url" id="newPhotoProfile"/> <br>
        </div>

      </div>
      <div class="footer">
        <button id="btnEditProfile">Confirm Change</button>
        <span>... Sus datos de perfil actualizados solo se visualizaran una vez recargada la pagina</span>
      </div>
    </div>
  </div>
</div>
`;
  const profile = document.createElement('div');
  profile.innerHTML = perfilModal;
  // modal del perfil
  const modal = profile.querySelector('#miModal');
  const flex = profile.querySelector('#flex');
  const cerrar = profile.querySelector('#close');

  modal.style.display = 'block';

  cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target === flex) {
      modal.style.display = 'none';
    }
  });
  // Inicio de funciones para editar nombre y foto del user
  const auth = firebase.auth();
  auth.onAuthStateChanged((user) => {
    console.log(user);
  });

  const displayNameField = profile.querySelector('#displayName');
  const photoField = profile.querySelector('#newPhotoProfile');
  const editButton = profile.querySelector('#btnEditProfile');


  const changeNameAndPhoto = (user, newNameAndPhoto) => {
    const { newDisplayName, newPhotoURL } = newNameAndPhoto;
    // Changes displayName and photoURL properties
    if (newDisplayName && newPhotoURL) {
      user.updateProfile({
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      })
        .then(() => {
          console.log('Profile updated successfully !');
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (newDisplayName) {
      // Changes the displayName only
      user.updateProfile({
        displayName: newDisplayName,
      })
        .then(() => {
          console.log('DisplayName updated successfully !');
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (newPhotoURL) {
      // Changes photoURL only
      user.updateProfile({
        photoURL: newPhotoURL,
      })
        .then(() => {
          console.log('PhotoURL updated successfully !');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  // funcion que edita el nombre y foto del user
  const editInformation = () => {
    const newNameAndPhoto = {
      newDisplayName: displayNameField.value,
      newPhotoURL: photoField.value,
    };
    // Holds all the information about the current signed in user
    const user = firebase.auth().currentUser;
    changeNameAndPhoto(user, newNameAndPhoto);
  };
  // btn para editar nombre y foto del user
  editButton.addEventListener('click', () => {
    // event.preventDefault();
    editInformation();
    // window.location.reload();
    const user = firebase.auth().currentUser;
    if (displayNameField.value && photoField.value) {
      // console.log('name & foto');
      document.querySelector('#displayNameHolder').innerHTML = displayNameField.value;
      document.querySelector('#photoHolder').src = photoField.value;
    } else if (displayNameField.value) {
      // console.log('solo name');
      document.querySelector('#displayNameHolder').innerHTML = displayNameField.value;
      document.querySelector('#photoHolder').src = user.photoURL;
    } else if (photoField.value) {
      // console.log('solo foto');
      document.querySelector('#displayNameHolder').innerHTML = user.displayName;
      document.querySelector('#photoHolder').src = photoField.value;
    } else {
      // console.log('Ocurrio un error cargando la foto y/o nombre cambiado');
    }
  });
  return profile;
};

const navMenu = () => {
  const menu = `
  <input type="checkbox" id="btn-menu">
  <label class="labelbtnmenu" for="btn-menu">
    <img src="../img/icono-menu.png" alt="">
  </label>

        <h1 class="EducaChat" >EducaChat</h1>

    <nav class="nav-home">
        <ul>
            <li>
                <a id="abrir" >Perfil</a>
            </li>
            <li>
                <a id="SignOut" href="#/">Cerrar Sesion</a>
            </li>
        </ul>
    </nav>
    `;

  const headerMenu = document.createElement('header');
  headerMenu.classList.add('divNav');
  headerMenu.innerHTML = menu;
  const abrir = headerMenu.querySelector('#abrir');
  abrir.addEventListener('click', (event) => {
    event.preventDefault();
    headerMenu.appendChild(perfil());
  });
  const anchorSignOut = headerMenu.querySelector('#SignOut');
  anchorSignOut.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('SignOut Ok');
    signOut();
    authentification();
  });
  return headerMenu;
};


const avatarProfile = () => {
  const avatar = `    
      <p class="headerHomeAvatar"></p>       
      <label id="myUserName">Nombre</label>
      <div>  
        <p id="displayNameHolder"></p>
        <div><img id ="photoHolder" class="imageAvatar" src="img/avatar.png" alt="Profile picture">
        </div>
      </div>       
    `;
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('homeAvatarContainer');
  sectionProfile.innerHTML = avatar;
  // const userEmail = myCurrentUser();
  // console.log(userEmail);
  sectionProfile.querySelector('#myUserName').innerHTML = `Bienvenid@ usuari@:${window.localStorage.getItem('email')}`;

  // show edit profile

  firebase.auth().onAuthStateChanged((user) => {
    // display the displayName and photoURL of the user on the page
    if (user.displayName || user.photoURL) {
      sectionProfile.querySelector('#displayNameHolder').innerHTML = user.displayName;
      sectionProfile.querySelector('#photoHolder').src = user.photoURL;
    } else {
      console.log('Ocurrio un error cargando la foto y nombre cambiado');
    }
  });
  return sectionProfile;
};

export const mainPublicationForm = () => {
  const publication = `
    <div class="sharePublicationBox">
      <div class="">
        <textarea  class="textComent" placeholder="¿Que quieres compartir?"></textarea>
        <button id="cancelUpload" class="displayNone">X</button>
        <img id="showPicture" >
      </div>
      <div class="footerHomePublication">
        <div class="circle">
            <label for="selectImage">          
              <input type="file" id="selectImage" class="displayNone"/>
              <img src="img/icons/images.svg"/>
            </label>
        </div>
        <select id="optionsPublic" class="selectPublic publicationBtn">
          <option  selected value="public">Publico</option>
          <option value="private">Privado</option>
        </select>
        <button id="share" class="compartirBtn publicationBtn">Compartir</button>
      </div>  
    </div>      
  `;
  const publicationMainSection = document.createElement('section');
  const sectionPublication = document.createElement('form');
  publicationMainSection.appendChild(sectionPublication);
  publicationMainSection.classList.add('publicationMainSection');
  sectionPublication.innerHTML = publication;
  sectionPublication.classList.add('homePublicationContainer');
  // BOTON IMG CONST
  const selectImage = sectionPublication.querySelector('#selectImage');
  const showPicture = sectionPublication.querySelector('#showPicture');
  const cancelUpload = sectionPublication.querySelector('#cancelUpload');
  // B/C FILE NEEDS TO BE CALL IN UPLOAD AS PARAMETER IN SHAREBUTTON
  let file = '';
  // B/C WE WANT TO SEE A IMG PREVIEW
  selectImage.addEventListener('change', (e) => {
    e.preventDefault();
    const input = e.target;
    const reader = new FileReader();
    // B/C WILL DISPLAY THE SELECTED IMG
    reader.onload = () => {
      // the file's img will be printed here
      const dataURL = reader.result;
      showPicture.src = dataURL;
      localStorage.setItem('image', dataURL);
    };
    reader.readAsDataURL(input.files[0]);
    // B/C USER WANTS TO CANCEL IMG UPLOAD
    cancelUpload.classList.remove('displayNone');
    cancelUpload.classList.add('showCircle');
    cancelUpload.addEventListener('click', () => {
      localStorage.removeItem('image');
      showPicture.classList.add('displayNone');
      cancelUpload.classList.add('displayNone');
      // localStorage.setItem('image', '');
    });

    file = e.target.files[0];
  });

  // constantes de nodos
  const shareButton = sectionPublication.querySelector('#share');
  const textarea = sectionPublication.querySelector('[placeholder="¿Que quieres compartir?"]');

  // boton de compartir publicacion

  shareButton.addEventListener('click', (event) => {
    event.preventDefault();
    const optionsPublic = document.getElementById('optionsPublic');
    const currentUserUid = firebase.auth().currentUser.uid;
    const userEmail = firebase.auth().currentUser.email;
    const postDate = firebase.firestore.Timestamp.fromDate(new Date());
    const visivility = sectionPublication.querySelector('#optionsPublic').value;
    const userName = firebase.auth().currentUser.displayName;
    const status = textarea.value;
    // B/C USER WNATS TO PUBLISH A TEXT RATHER THAN AN IMG || CASE BOTH
    let iPost = '';
    if (file) {
      iPost = localStorage.getItem('image');
      uploadImagePost(file, currentUserUid);
      publishStatus(userName, userEmail, status, postDate, visivility, iPost, currentUserUid);
      textarea.value = '';
      showPicture.src = '';
      showPicture.classList.add('displayNone');
      cancelUpload.classList.add('displayNone');
      window.localStorage.removeItem('image');
      optionsPublic.value = 'public';
    } else {
      publishStatus(userName, userEmail, status, postDate, visivility, iPost, currentUserUid);
      textarea.value = '';
      optionsPublic.value = 'public';
    }
  });

  return sectionPublication;
};


export const homeTemplate = (notes) => {
  const mainElem = document.createElement('main');

  mainElem.setAttribute('id', 'mainElement');
  mainElem.appendChild(navMenu());
  mainElem.appendChild(avatarProfile());
  mainElem.appendChild(mainPublicationForm());
  const statusPost = document.createElement('section');
  statusPost.setAttribute('id', 'comentarios');
  statusPost.classList.add('postSection');
  statusPost.innerHTML = '';
  statusPost.appendChild(posts(notes));
  mainElem.appendChild(statusPost);
  mainElem.classList.add('homeContainer');
  return mainElem;
};
/**
 *  Paula peerfeadback
    // leer callbacks una funcion de ejecuta dentro de una funcion
    // Asincronia y promesas, then, catch, q pasa mientras que esperamos
    // testeo asincronio
    // ramas github
    // commit
 */
