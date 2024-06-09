import "dotenv/config"
import { agents } from "../data/agentes.js"
import { generateToken, verifyToken } from "../utils/jwtoken.util.js"

const secretKey = process.env.SECRET_KEY

export const login = (req, res) => {
    const { email, password } = req.query
    const agent = agents.find((a) => a.email === email && a.password === password)

    if (agent) {
        const token = generateToken(email, secretKey, "2m")

        res.send(`
        <h3>Bienvenido Agente ${email}</h3>
        <p> Su token está en el sessionStorage </p>
        <a href="/dashboard?token=${token}">Ir al Dashboard de Acceso Restringido</a>
        <script>
            sessionStorage.setItem('token', '${token}')
        </script>
        `)
    } else {
        res.status(401).send(`<h3>Usuario o contraseña incorrecta</h3>`)
    }
}

export const restrictedDashboard = async (req, res) => {
    const { token } = req.query
    try {
        const decoded = await verifyToken(token, secretKey)
        res.send(`
            <h3>Bienvenido al Dashboard de Acceso Restringido Agente ${decoded.data}</h3>
            <script>
            sessionStorage.setItem('email', "${decoded.data}")
            </script>
            `)
    } catch (error) {
        return res.status(401).send(`<h3>Token inválido</h3>`)
    }
}

