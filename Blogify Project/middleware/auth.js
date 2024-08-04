import { validateToken } from "../services/authentification.js";

export function checkForCookie(cookieName){
     return(req, res, next)=>{
        const tokenCookieValue =req.cookies[cookieName];
        if(!tokenCookieValue){
          return  next()
        }
        try{
            const payload = validateToken(tokenCookieValue)
            req.user= payload;
        }catch(e){

        }
       return next()
     }
}