export async function getAuthToken(token_name){
    const token = localStorage.getItem(token_name)
    if (!token || token === undefined || token === null){
        console.log(false);
        return false
    }else{
        console.log(token);
        return token
    }
}