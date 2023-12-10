import { auth } from "express-oauth2-jwt-bearer"


const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: "https://dev-gm25vgkj8uwj1vck.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck