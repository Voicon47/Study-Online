// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBifQUyhv6U4R_07GDeNVff4J7iA53ZuFc",
  authDomain: "stydyonline-1ace6.firebaseapp.com",
  projectId: "stydyonline-1ace6",
  storageBucket: "stydyonline-1ace6.appspot.com",
  messagingSenderId: "987280903372",
  appId: "1:987280903372:web:601553be416600f70ac669",
  measurementId: "G-MB6PMVRFYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
  prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const uploadImage = async (file: File) => {
  return new Promise((resolve, reject) => {
      if (file) {
          const storageRef = ref(storage, `images/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
              'state_changed',
              (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log(`Upload progress: ${progress}%`);
              },
              (error) => {
                  console.error('Error uploading image:', error.message);
                  reject(false);
              },
              () => {
                  // Upload completed successfully
                  getDownloadURL(uploadTask.snapshot.ref)
                      .then((downloadURL) => {
                          console.log('File available at', downloadURL);
                          resolve(downloadURL);
                      })
                      .catch((error) => {
                          console.error('Error getting download URL:', error.message);
                          reject(false);
                      });
              },
          );
      } else {
          reject(false);
      }
  });
};

export default uploadImage;