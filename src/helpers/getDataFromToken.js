import jwt from "jsonwebtoken";


export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get(process.env.COOKIE_SECRET)?.value || '';
        if(!token) return null;
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET)
        return decodedtoken
    } catch (error) {
        console.error(error)
    }

}