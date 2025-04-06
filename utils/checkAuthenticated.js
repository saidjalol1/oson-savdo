export async function getAuthToken(token_name){
    const token = localStorage.getItem(token_name)
    if (!token || token === undefined || token === null){
        return false
    }else{
        return token
    }
}