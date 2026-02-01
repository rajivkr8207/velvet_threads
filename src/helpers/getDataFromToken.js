import jwt from "jsonwebtoken";


export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get('xyztoken')?.value || '';
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET)
        return decodedtoken.id
    } catch (error) {
        console.error(error)
    }

}