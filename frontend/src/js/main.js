
const welcomeMessage = document.getElementById("welcome-user")
// main.js
export async function checkAuth() {
    const currentPath = window.location.pathname;

    try {
        const response = await fetch("http://localhost:5000/api/profile", {
            credentials: "include"
        });

        // Si estoy logueado e intento ir al login o signup, mandame al panel
        if (response.ok) {
            const user = await response.json();
            console.log("Usuario autenticado:", user);
            if (user.user.isLoggedin) {
console.log(22)
                if (currentPath === "/login" || currentPath === "/signup") {
                    window.location.href = "/admin/cPanel";
                }
                return true;
            }
            if (!user.user.isLoggedin && currentPath.startsWith("/admin")) {
                window.location.href = "/login";

            }

        }

        // Si NO estoy logueado y trato de entrar al panel, mandame al login
        if (!response.ok && currentPath.startsWith("/admin")) {
            window.location.href = "/login";
        }

    } catch (error) {
        console.error("Error al verificar autenticación", error);
    }
}

// verificar sesion backend si es loggin para no entrar a lapagina de login o signup


async function checkUser() {

    try {
        const response = await fetch("http://localhost:5000/api/profile", {
            credentials: "include" // ¡CRÍTICO! Esto envía la cookie al servidor
        });

        if (response.ok) {
            const user = await response.json();
            //console.log("Email del usuario:", user.user.email); // Aquí tienes el email del usuario
            welcomeMessage.innerText = `${user.user.username}`;
            const logoutBtn = document.createElement("button")
            logoutBtn.textContent = "Cerrar sesión"
            logoutBtn.addEventListener("click", logout)
            document.body.appendChild(logoutBtn);
        }
    } catch (error) {
        console.error("Error al obtener sesión", error);
    }
}

// Ejecutar al cargar la web
window.onload = checkUser;



const logout = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        if (response.ok) {
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("Error al cerrar sesión", error);
    }
}