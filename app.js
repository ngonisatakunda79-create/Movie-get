// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6Dy72K2gZLH39Pp0sF2zjPi4kSSRUEN4",
  authDomain: "appstore-e38ef.firebaseapp.com",
  projectId: "appstore-e38ef",
  storageBucket: "appstore-e38ef.appspot.com",
  messagingSenderId: "74797914342",
  appId: "1:74797914342:web:74b730bc4bf7dcf2388327"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Password-protected upload section
window.checkUploadPassword = function () {
  const entered = document.getElementById("uploadAccessPassword").value;
  if (entered === "taku") {
    document.getElementById("uploadForm").style.display = "block";
    document.getElementById("passwordSection").style.display = "none";
  } else {
    alert("Incorrect password.");
  }
};

// Upload form
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("uploadTitle").value;
  const description = document.getElementById("uploadDescription").value;
  const videoUrl = document.getElementById("uploadVideoUrl").value;
  const thumbnail = document.getElementById("uploadThumbnail").value;
  const category = document.getElementById("uploadCategory").value;

  try {
    await addDoc(collection(db, "movies"), {
      title,
      description,
      videoUrl,
      thumbnail,
      category
    });
    alert("Movie uploaded!");
    document.getElementById("uploadForm").reset();
    loadMovies();
  } catch (err) {
    console.error("Upload failed", err);
    alert("Upload failed.");
  }
});

// Load and display movies
async function loadMovies() {
  const querySnapshot = await getDocs(collection(db, "movies"));
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const movie = doc.data();
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <img src="${movie.thumbnail}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <a href="${movie.videoUrl}" target="_blank">View</a> |
      <a href="${movie.videoUrl}" download>Download</a>
    `;
    movieContainer.appendChild(div);
  });
}

loadMovies();