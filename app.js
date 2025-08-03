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

// Unlock upload form
window.checkUploadPassword = function () {
  const entered = document.getElementById("uploadAccessPassword").value;
  if (entered === "taku") {
    document.getElementById("uploadForm").style.display = "block";
    document.getElementById("passwordSection").style.display = "none";
  } else {
    alert("Incorrect password.");
  }
};

// Upload movie to Firestore
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const movie = {
    title: document.getElementById("uploadTitle").value,
    description: document.getElementById("uploadDescription").value,
    videoUrl: document.getElementById("uploadVideoUrl").value,
    thumbnail: document.getElementById("uploadThumbnail").value,
    category: document.getElementById("uploadCategory").value,
  };

  try {
    await addDoc(collection(db, "movies"), movie);
    alert("Movie uploaded!");
    document.getElementById("uploadForm").reset();
    loadMovies();
  } catch (err) {
    alert("Upload failed.");
    console.error(err);
  }
});

// Load movies from Firestore
async function loadMovies() {
  const querySnapshot = await getDocs(collection(db, "movies"));
  const container = document.getElementById("movieContainer");
  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const movie = doc.data();
    const div = createMovieElement(movie);
    container.appendChild(div);
  });
}

function createMovieElement(movie, isOffline = false) {
  const div = document.createElement("div");
  div.className = "movie";
  div.innerHTML = `
    <img src="${movie.thumbnail}" alt="${movie.title}" />
    <h3>${movie.title}</h3>
    <p>${movie.description}</p>
    <a href="${movie.videoUrl}" target="_blank">View</a> |
    <a href="${movie.videoUrl}" download>Download</a>
    ${!isOffline ? `<br/><button onclick='saveOffline(${JSON.stringify(movie)})'>Save Offline</button>` : ""}
  `;
  return div;
}

// Save to localStorage
window.saveOffline = function (movie) {
  let saved = JSON.parse(localStorage.getItem("offlineMovies") || "[]");
  saved.push(movie);
  localStorage.setItem("offlineMovies", JSON.stringify(saved));
  alert("Saved offline!");
  loadOfflineMovies();
};

// Load offline movies
function loadOfflineMovies() {
  const offlineList = JSON.parse(localStorage.getItem("offlineMovies") || "[]");
  const offlineContainer = document.getElementById("offlineContainer");
  offlineContainer.innerHTML = "";

  offlineList.forEach((movie) => {
    const div = createMovieElement(movie, true);
    offlineContainer.appendChild(div);
  });
}

loadMovies();
loadOfflineMovies();