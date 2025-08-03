// Firebase config (use your own from Firebase Console)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const movieContainer = document.getElementById("movie-sections");
const playerContainer = document.getElementById("movie-player");

async function loadMovies() {
  const q = query(collection(db, "movies"), orderBy("title"));
  const snapshot = await getDocs(q);

  const categories = {};

  snapshot.forEach(doc => {
    const movie = doc.data();
    if (!categories[movie.category]) categories[movie.category] = [];
    categories[movie.category].push(movie);
  });

  movieContainer.innerHTML = "";

  for (const [category, movies] of Object.entries(categories)) {
    const section = document.createElement("div");
    section.className = "section";
    section.innerHTML = `<h2>${category}</h2><div class="movie-row"></div>`;

    const row = section.querySelector(".movie-row");

    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.thumbnail}" alt="${movie.title}" />
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <button onclick="playMovie('${movie.videoUrl}')">View</button>
          <a href="${movie.videoUrl}" download><button>Download</button></a>
        </div>
      `;
      row.appendChild(card);
    });

    movieContainer.appendChild(section);
  }
}

window.playMovie = function(videoUrl) {
  playerContainer.innerHTML = `
    <video controls autoplay>
      <source src="${videoUrl}" type="video/mp4" />
      Your browser does not support video.
    </video>
  `;
};

document.getElementById("uploadForm").addEventListener("submit", async e => {
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
      title,
      description,
      videoUrl,
      thumbnail,
      category,
      views: 0,
      likes: 0
    });

    alert("Movie uploaded!");
    e.target.reset();
    loadMovies();
  } catch (error) {
    alert("Upload failed.");
    console.error(error);
  }
});

// Load movies on page start
loadMovies();