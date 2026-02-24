const msgError = document.getElementById("msgError")
const formSignup = document.getElementById("signup-form")

if (formSignup) {
formSignup.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password }),
            credentials: "include"
        })
        const data = await response.json()

       
       
        if (response.ok) {
            alert("Cuenta creada exitosamente")
            window.location.href = "/login"
        } else {
            const errorMsg = data.errors ? data.errors.map(err => err.message).join("\n") : data.msg || "Error al crear la cuenta"
            console.log(errorMsg);
            alert(errorMsg)
        }
    } catch (error) {
        console.error("Error:", error)
        alert("Error al conectar con el servidor")
    }
})
}