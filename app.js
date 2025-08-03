import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6Dy72K2gZLH39Pp0sF2zjPi4kSSRUEN4",
  authDomain: "appstore-e38ef.firebaseapp.com",
  projectId: "appstore-e38ef",
  storageBucket: "appstore-e38ef.appspot.com",
  messagingSenderId: "74797914342",
  appId: "1:74797914342:web:74b730bc4bf7dcf2388327",
  measurementId: "G-GKQEQWDJJ3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Password protection
document.getElementById('unlockBtn').addEventListener('click', () => {
  const password = document.getElementById('passwordInput').value;
  if (password === 'taku') {
    document.getElementById('uploadSection').classList.remove('hidden');
    document.getElementById('loginSection').classList.add('hidden');
  } else {
    alert("Wrong password.");
  }
});

// Uploadcare uploader
const widget = uploadcare.Widget('[role=uploadcare-uploader]');
widget.onUploadComplete(async (info) => {
  const videoUrl = info.cdnUrl;
  const thumbnail = videoUrl + "/-/preview/";

  try {
    await addDoc(collection(db, "videos"), {
      videoUrl,
      thumbnail,
      createdAt: Date.now()
    });
    alert("Uploaded!");
    loadVideos();
  } catch (e) {
    console.error("Error adding video:", e);
  }
});

// Load videos from Firestore
async function loadVideos() {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "videos"));

  querySnapshot.forEach((doc) => {
    const { videoUrl, thumbnail } = doc.data();

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${thumbnail}" alt="Movie thumbnail" />
      <video controls src="${videoUrl}"></video>
      <a href="${videoUrl}" download>Download</a>
    `;
    movieList.appendChild(card);
  });
}

loadVideos();