import { deleteUser } from "../../utils/Fauna";
export default async function handler (req,res){
    if(req.method !== 'DELETE')
    {
        return res.status(403).json({msg: 'Method not allowed.'});
    }
    const {id} = req.body;
    try {
        const DeletedRecord = await deleteUser(id);
        return res.status(200).json(DeletedRecord);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error While deleting user.'})
        
    }
}