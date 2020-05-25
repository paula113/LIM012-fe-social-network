import firebasemock from 'firebase-mock';

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();
// autoFlush() flush data and authentication operations when run.
// if !arguments|| true = operations will be flushed immediately (synchronously).

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

// eslint-disable-next-line import/first
import {
  signIn, signUp, signOut, signInWithGoogle,
} from '../src/firestore-controller/firebase.js';

describe('signIn', () => {
  it('debería porder iniciar sesion con email: paula@gmail.com y password: 123456', () => signIn('paula@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('paula@gmail.com');
    }));
});

describe('signOut', () => {
  it('debería porder cerrar sesion con email: paula@gmail.com y password: 123456', () => signOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

describe('signUp', () => {
  it('debería porder registrar un email: laboratoria@gmail.com y password: 123456', () => signUp('laboratoria@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('laboratoria@gmail.com');
    }));
});

describe('signInWithGoogle', () => {
  it('deberia poder iniciar sesion con google', () => {
    signInWithGoogle()
      .then((user) => {
        expect(user.providerData.providerId).toBe('google.com');
      });
  });
});
