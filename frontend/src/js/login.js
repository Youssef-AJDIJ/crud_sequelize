import { checkAuth } from "./main.js";

// Ejecutamos la validación inicial
checkAuth();

const formLogin = document.getElementById("login-form");

if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            const data = await response.json();

            if (response.ok) {
                // Login exitoso
                window.location.href = "/admin/cPanel";
            } else {
                // Errores (400, 401, etc.)
                alert(data.msg || "Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con el servidor");
        }
    });
}