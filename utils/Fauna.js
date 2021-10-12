const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: 'db.us.fauna.com',
    scheme: 'https',
});
const q = faunadb.query;

const getUsers = async () => {
 const {data} = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection("Users")))
            ,
            q.Lambda('ref',q.Get(q.Var('ref')))
        )
    )
    const users = data.map(user=>{
        user.id = user.ref.id;
        delete user.ref;
        return user;
    });
return users.reverse();
};
const createUser = async (firstName,lastName,emailAddress) => {
    return await faunaClient.query(q.Create(q.Collection('Users'),
        {
            data:{firstName,lastName,emailAddress}
        })) 
   };
const getSnippetById = async (id) => {
    const snippit = await faunaClient.query(
        q.Get(q.Ref(q.Collection('snippits'),id))
        );
        snippit.id = snippit.ref.id;
        delete snippit.ref;
        return snippit; 
};



const updateUser = async (id, firstName,lastName,emailAddress) => {
   return await faunaClient.query(q.Update(q.Ref(q.Collection('Users'),id),
    {
        data: {firstName,lastName,emailAddress}
    }));
};

const deleteUser = async (id) => {
    return await faunaClient.query(q.Delete(q.Ref(q.Collection('Users'),id)))
};

module.exports = {
    createUser,
    getUsers,
    getSnippetById,
    updateUser,
    deleteUser,
};
