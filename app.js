// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore, collection, getDocs, addDoc
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

// Load Movies from Firestore
async function loadMovies() {
  const movieSections = document.getElementById("movie-sections");
  const moviesRef = collection(db, "movies");
  const snapshot = await getDocs(moviesRef);
  const movies = {};

  snapshot.forEach((doc) => {
    const movie = doc.data();
    if (!movies[movie.category]) movies[movie.category] = [];
    movies[movie.category].push(movie);
  });

  for (let [category, items] of Object.entries(movies)) {
    const section = document.createElement("section");
    section.classList.add("section");

    const title = document.createElement("h2");
    title.textContent = category;
    section.appendChild(title);

    const row = document.createElement("div");
    row.classList.add("movie-row");

    items.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.thumbnail}" alt="${movie.title}">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <button onclick="window.open('${movie.videoUrl}', '_blank')">View</button>
          <button onclick="window.open('${movie.videoUrl}', '_blank')">Download</button>
        </div>
      `;
      row.appendChild(card);
    });

    section.appendChild(row);
    movieSections.appendChild(section);
  }
}

// Handle Upload with password
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("uploadTitle").value;
  const description = document.getElementById("uploadDescription").value;
  const videoUrl = document.getElementById("uploadVideoUrl").value;
  const thumbnail = document.getElementById("uploadThumbnail").value;
  const category = document.getElementById("uploadCategory").value;
  const password = document.getElementById("uploadPassword").value;

  if (password !== "taku") {
    alert("Incorrect password.");
    return;
  }

  try {
    await addDoc(collection(db, "movies"), {
      title, description, videoUrl, thumbnail, category, views: 0, likes: 0
    });
    alert("Movie uploaded successfully.");
    location.reload();
  } catch (err) {
    alert("Upload failed.");
    console.error(err);
  }
});

loadMovies();