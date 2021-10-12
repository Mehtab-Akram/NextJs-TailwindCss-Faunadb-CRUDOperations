import { getUsers } from "../../utils/Fauna";
export default async function handler(req,res){
    if(req.method !== 'GET'){
        return res.status(405);
    }
    try {
        
        const users = await getUsers();
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Get users failed."});
    }
}