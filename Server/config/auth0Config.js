import { auth } from "express-oauth2-jwt-bearer";
const jwtCheck = auth({
    audience: "https://realestate-v2-two.vercel.app",
    issuerBaseURL: "https://dev-brjjwu2les0rhoay.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck