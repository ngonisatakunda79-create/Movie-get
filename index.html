// ---------------- FIREBASE CONFIG ----------------
const firebaseConfig = {
    apiKey: "AIzaSyAkPqrjrXqtdDxxBhLgRXjRfPciw7XtAj4",
    authDomain: "novely-4421d.firebaseapp.com",
    projectId: "novely-4421d",
    storageBucket: "novely-4421d.firebasestorage.app",
    messagingSenderId: "597056434307",
    appId: "1:597056434307:android:92ff7d136f742cf173ebb6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ---------------- DOM ELEMENTS ----------------
const novelList = document.getElementById("novelList");
const searchBox = document.getElementById("searchBox");
const uploadForm = document.getElementById("uploadForm");

// ---------------- LOAD NOVELS ----------------
async function loadNovels() {
    const snapshot = await db.collection("novels").get();
    const novels = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    displayNovels(novels);
}

function displayNovels(novels) {
    novelList.innerHTML = "";
    novels.forEach(novel => {
        const card = document.createElement("div");
        card.className = "novel-card";
        card.innerHTML = `
            <img src="${novel.coverURL}" alt="${novel.title}">
            <h3>${novel.title}</h3>
            <p>By ${novel.author}</p>
            <p>${novel.price > 0 ? "$" + novel.price : "Free"}</p>
            <div id="paypal-button-${novel.id}"></div>
            <div id="download-${novel.id}" style="display:none;">
                <a href="${novel.fileURL}" download>Download</a>
            </div>
        `;
        novelList.appendChild(card);

        if (novel.price > 0) setupPayPalButton(novel);
        else document.getElementById(`download-${novel.id}`).style.display = "block";
    });
}

// ---------------- PAYPAL ----------------
function setupPayPalButton(novel) {
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{ amount: { value: novel.price.toString() } }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
                alert(`Payment completed by ${details.payer.name.given_name}`);
                unlockNovel(novel.id);

                db.collection("purchases").add({
                    novelId: novel.id,
                    payer: details.payer.email_address,
                    paid: true,
                    timestamp: new Date()
                });
            });
        }
    }).render(`#paypal-button-${novel.id}`);
}

// ---------------- VIP UPLOAD ----------------
function showUploadForm() {
    const pass = prompt("Enter VIP password to upload:");
    if (pass && pass.toLowerCase() === "ngonisa") uploadForm.style.display = "block";
    else alert("Incorrect password.");
}

function uploadNovel() {
    const title = document.getElementById("novelTitle").value;
    const author = document.getElementById("novelAuthor").value;
    const desc = document.getElementById("novelDesc").value;
    const price = parseFloat(document.getElementById("novelPrice").value) || 0;

    const coverWidget = uploadcare.Widget("[role=uploadcare-uploader]#coverUpload");
    const fileWidget = uploadcare.Widget("[role=uploadcare-uploader]#fileUpload");

    coverWidget.onUploadComplete(coverInfo => {
        if(coverInfo.size > 52428800){ alert("Cover too large (max 50 MB)"); return; }
        fileWidget.onUploadComplete(fileInfo => {
            if(fileInfo.size > 1073741824){ alert("Novel too large (max 1 GB)"); return; }

            db.collection("novels").add({
                title, author, description: desc, coverURL: coverInfo.cdnUrl, fileURL: fileInfo.cdnUrl, price
            }).then(()=>{ 
                alert("Novel uploaded!"); 
                uploadForm.style.display="none"; 
                loadNovels(); 
            }).catch(err=>alert(err.message));
        });
    });
}

// ---------------- UNLOCK NOVEL ----------------
function unlockNovel(novelId) {
    const downloadDiv = document.getElementById(`download-${novelId}`);
    if(downloadDiv) downloadDiv.style.display = "block";
}

// ---------------- SEARCH ----------------
searchBox.addEventListener("input", async ()=>{
    const query = searchBox.value.toLowerCase();
    const snapshot = await db.collection("novels").get();
    const novels = snapshot.docs.map(doc=>({id:doc.id,...doc.data()}))
        .filter(n => n.title.toLowerCase().includes(query) || n.author.toLowerCase().includes(query));
    displayNovels(novels);
});

// ---------------- INITIAL LOAD ----------------
loadNovels();