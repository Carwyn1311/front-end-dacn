import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

const signInWithGoogle = (): void => {
  void signInWithRedirect(auth, googleProvider);
};

const handleRedirectResult = async (): Promise<void> => {
  try {
    const result = await getRedirectResult(auth);
    if (result != null) {
      const user = result.user;
      console.log('Đăng nhập thành công:', user);
    }
  } catch (error) {
    console.error('Đăng nhập thất bại:', error);
  }
};

void handleRedirectResult();

export { auth, googleProvider, db, storage, signInWithGoogle };
