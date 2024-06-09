import jwt from "jsonwebtoken"

export const generateToken = (agent, secretKey, expiresIn) => {
    return jwt.sign(
        { data: agent },
        secretKey,
        { expiresIn }
    );
}

export const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded)
            }
        })
    })
}
