const BASE_URL = "https://scs-backend-3xx1.onrender.com/api";

// ===============================
// HELPER FUNCTION
// ===============================

async function getResponseData(response) {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return await response.json();
    }

    const text = await response.text();

    return {
        message: text || `Server returned status ${response.status}`
    };
}


// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullNameElement = document.getElementById("fullName");
        const emailElement = document.getElementById("email");
        const passwordElement = document.getElementById("password");

        const fullName = fullNameElement
            ? fullNameElement.value.trim()
            : "";

        const email = emailElement
            ? emailElement.value.trim()
            : "";

        const password = passwordElement
            ? passwordElement.value
            : "";

        if (!fullName || !email || !password) {

            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please fill in all fields."
            });

            return;
        }

        try {

            const response = await fetch(`${BASE_URL}/auth/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    fullName,
                    email,
                    password
                })

            });

            const data = await getResponseData(response);

            if (response.ok) {

                Swal.fire({

                    icon: "success",

                    title: "Registration Successful",

                    text: data.message || "Your account has been created.",

                    timer: 1800,

                    showConfirmButton: false

                });

                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1800);

            } else {

                Swal.fire({

                    icon: "error",

                    title: "Registration Failed",

                    text: data.message || "Unable to register. Please try again."

                });

            }

        } catch (error) {

            console.error("Registration error:", error);

            Swal.fire({

                icon: "error",

                title: "Server Error",

                text: "Unable to connect to the server. Please try again."

            });

        }

    });

}


// ===============================
// USER LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const emailElement = document.getElementById("email");
        const passwordElement = document.getElementById("password");

        const email = emailElement
            ? emailElement.value.trim()
            : "";

        const password = passwordElement
            ? passwordElement.value
            : "";

        if (!email || !password) {

            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please enter your email and password."
            });

            return;
        }

        try {

            const response = await fetch(`${BASE_URL}/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await getResponseData(response);

            if (response.ok) {

                if (!data.token) {

                    Swal.fire({
                        icon: "error",
                        title: "Login Error",
                        text: "Server did not return an authentication token."
                    });

                    return;
                }

                localStorage.setItem("token", data.token);

                if (data.user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );
                }

                Swal.fire({

                    icon: "success",

                    title: "Login Successful",

                    timer: 1200,

                    showConfirmButton: false

                });

                setTimeout(() => {

                    window.location.href = "dashboard.html";

                }, 1200);

            } else {

                Swal.fire({

                    icon: "error",

                    title: "Login Failed",

                    text: data.message || "Invalid email or password."

                });

            }

        } catch (error) {

            console.error("Login error:", error);

            Swal.fire({

                icon: "error",

                title: "Server Error",

                text: "Unable to connect to the backend server."

            });

        }

    });

}


// ===============================
// ADMIN LOGIN
// ===============================

const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const emailElement = document.getElementById("email");
        const passwordElement = document.getElementById("password");

        const email = emailElement
            ? emailElement.value.trim()
            : "";

        const password = passwordElement
            ? passwordElement.value
            : "";

        if (!email || !password) {

            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please enter your email and password."
            });

            return;
        }

        try {

            const response = await fetch(`${BASE_URL}/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await getResponseData(response);

            if (response.ok) {

                if (!data.user) {

                    Swal.fire({
                        icon: "error",
                        title: "Login Error",
                        text: "Server did not return user information."
                    });

                    return;
                }

                if (data.user.role !== "admin") {

                    Swal.fire({

                        icon: "error",

                        title: "Access Denied",

                        text: "This account is not an administrator."

                    });

                    return;
                }

                if (!data.token) {

                    Swal.fire({
                        icon: "error",
                        title: "Login Error",
                        text: "Server did not return an authentication token."
                    });

                    return;
                }

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                Swal.fire({

                    icon: "success",

                    title: "Welcome Admin",

                    timer: 1200,

                    showConfirmButton: false

                });

                setTimeout(() => {

                    window.location.href = "admin-dashboard.html";

                }, 1200);

            } else {

                Swal.fire({

                    icon: "error",

                    title: "Login Failed",

                    text: data.message || "Invalid admin credentials."

                });

            }

        } catch (error) {

            console.error("Admin login error:", error);

            Swal.fire({

                icon: "error",

                title: "Server Error",

                text: "Unable to connect to the backend server."

            });

        }

    });

}