import jsonwebtoken from 'jsonwebtoken'

export const createJWT = user => (
    jsonwebtoken.sign({user}, 'SecretJSONWEBTOKEN',{
        expiresIn:'12hr'
    })
    
)