    // <script>
    //     // Predefined users with usernames and passwords
        const USERS = {
            "rasec": "pass123",
            "test": "test1",
            "nemmar": "nemmar321"
        };

        // Auto-login if remembered
        window.onload = () => {
            const savedUser = localStorage.getItem("rememberedUser");
            if (savedUser && USERS[savedUser]) {
                localStorage.setItem("loggedInAdmin", savedUser); // Automatically set loggedInAdmin
                window.location.href = "dashboard.html"; // Redirect to dashboard
            }
        };

        // Toggle show/hide password
        document.getElementById("showPassword").addEventListener("change", function() {
            const pwd = document.getElementById("password");
            pwd.type = this.checked ? "text" : "password";
        });

        // Forgot password simulation
        document.getElementById("forgotPassword").addEventListener("click", e => {
            e.preventDefault();
            alert("Forgot password is simulated. Please contact your system administrator.");
        });

        // Handle login form submission
        document.getElementById("loginForm").addEventListener("submit", function(e) {
            e.preventDefault();
            const user = document.getElementById("username").value.trim();
            const pass = document.getElementById("password").value.trim();
            const rememberMe = document.getElementById("rememberMe").checked;

            if (USERS[user] && USERS[user] === pass) {
                localStorage.setItem("loggedInAdmin", user); // Save the logged-in admin
                if (rememberMe) {
                    localStorage.setItem("rememberedUser", user); // Remember the user
                } else {
                    localStorage.removeItem("rememberedUser"); // Don't remember if not checked
                }
                window.location.href = "dashboard.html"; // Redirect to the dashboard
            } else {
                alert("Invalid username or password.");
            }
        });
    // </script>