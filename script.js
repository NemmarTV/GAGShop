const fbAccount = "NemmarSabandoCampos";

// Utility Functions
function getAllProducts() {
    return JSON.parse(localStorage.getItem("allProducts") || "[]");
}

function saveAllProducts(products) {
    localStorage.setItem("allProducts", JSON.stringify(products));
}

// =======================
// Dashboard Page Logic
// =======================
if (window.location.pathname.includes("dashboard.html")) {
    const admin = localStorage.getItem("loggedInAdmin");
    if (!admin) {
        alert("You must log in first.");
        window.location.href = "login.html";
    }

    document.getElementById("welcome").textContent = `Logged in as: ${admin}`;
    const productForm = document.getElementById("productForm");

    function renderAdminProducts() {
        const all = getAllProducts();
        const own = all.filter(p => p.owner === admin);
        const container = document.getElementById("adminProducts");
        container.innerHTML = "";
        own.forEach((p) => {
            container.innerHTML += `
                <div class="product">
                    <img src="${p.image}" width="100">
                    <p>${p.name} - ₱${p.price}</p>
                    <p>Reseller: ${p.reseller}</p>
                </div>
            `;
        });
    }

    productForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const fileInput = document.getElementById("imageFile");
        const file = fileInput.files[0];

        if (!file) {
            alert("Please select an image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result;

            const newProduct = {
                name: document.getElementById("productName").value,
                price: document.getElementById("productPrice").value,
                reseller: document.getElementById("reseller").value,
                image: base64Image,
                likes: 0,
                dislikes: 0,
                liked: false,
                disliked: false,
                owner: admin
            };

            const all = getAllProducts();
            all.push(newProduct);
            saveAllProducts(all);
            renderAdminProducts();
            productForm.reset();
            fileInput.value = "";
        };

        reader.readAsDataURL(file);
    });

    renderAdminProducts();
}

// =======================
// Storefront Logic (index.html)
// =======================
if (window.location.pathname.includes("index.html")) {
    const productsDiv = document.getElementById("products");
    const products = getAllProducts();

    function renderProducts() {
        productsDiv.innerHTML = "";
        products.forEach((p, i) => {
            const likedKey = `like_${i}`;
            const dislikedKey = `dislike_${i}`;
            const liked = localStorage.getItem(likedKey);
            const disliked = localStorage.getItem(dislikedKey);

            const el = document.createElement("div");
            el.className = "product";
            el.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>Price: ₱${p.price}</p>
                <p>Reseller: ${p.reseller}</p>
                <a href="https://m.me/${fbAccount.replace(/ /g, '')}" target="_blank">Message Seller</a><br>
                <button onclick="like(${i})" ${liked ? 'disabled' : ''}>👍 Like (${p.likes})</button>
                <button onclick="dislike(${i})" ${disliked ? 'disabled' : ''}>👎 Dislike (${p.dislikes})</button>
            `;
            productsDiv.appendChild(el);
        });
    }

    window.like = function(i) {
        const products = getAllProducts();
        const key = `like_${i}`;
        if (!localStorage.getItem(key)) {
            products[i].likes += 1;
            localStorage.setItem(key, true);
            saveAllProducts(products);
            renderProducts();
        }
    };

    window.dislike = function(i) {
        const products = getAllProducts();
        const key = `dislike_${i}`;
        if (!localStorage.getItem(key)) {
            products[i].dislikes += 1;
            localStorage.setItem(key, true);
            saveAllProducts(products);
            renderProducts();
        }
    };

    renderProducts();
}

// Logout function
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInAdmin");
    window.location.href = "login.html";
});
