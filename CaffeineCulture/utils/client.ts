import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import AWS from 'aws-sdk';

const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

const clientCredentials = {
  ...firebaseCredentials,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1' 
});

if (!firebase.apps.length) {
  firebase?.initializeApp(firebaseCredentials);
}

export { firebase, clientCredentials };
