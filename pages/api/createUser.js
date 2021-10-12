import { createUser } from "../../utils/Fauna";
export default async function handler(req,res){
    const {firstName,lastName,emailAddress} = req.body;
    if(req.method !== 'POST'){
        return res.status(403).json({msg : 'Resquest is not allowed.'});
    }
    try {
        const createdUser = await createUser(
            firstName,
            lastName,
            emailAddress
        );
        return res.status(200).json(createdUser)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error."})
    }
}