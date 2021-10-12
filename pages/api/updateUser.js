import { updateUser } from "../../utils/Fauna";
export default async function handler(req,res){
if (req.method !== 'PUT'){
     res.status(403).json({msg : 'forbidden'})
}
const {id, firstName , lastName , emailAddress} = req.body;
try {
    const updatedUser = await updateUser(id,firstName,lastName,emailAddress);
    return res.status(200).json(updatedUser);
    
} catch (error) {
    console.log ('Update User .js error',error);
    res.status(500).json({ msg: 'Something went wrong.' });
}

}