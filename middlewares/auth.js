import jsonwebtoken from 'jsonwebtoken'

export async function auth (req, res, next){
    const token = req.headers.auth.split(' ')[1]
    console.log(token)
    
    try {
        const verified = jsonwebtoken.verify(token,'SecretJSONWEBTOKEN')
        req.verifiedUser = verified.user
        next()
        
    } catch (error) {
        next()
    }
}