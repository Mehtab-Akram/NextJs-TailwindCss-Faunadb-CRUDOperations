import Form from '../Components/Form'
import Grid from '../Components/Grid'
import useSWR, { mutate } from 'swr';
import { useState } from 'react';

const fetcher = async ()=>{
  const response = await fetch ('/api/users');  
  const data = await response.json();
  return data;
}
export default function Home() {
 
const [user,setUser] = useState({});
  const {data: users,error} = useSWR( '/api/users',fetcher);
  console.log(users)
  return (
    <div >
     <main >
       <Form user = {user}  setUser={setUser}/>
       
       {users && users !== [] ? <Grid deletedUser = {mutate} setUser = {setUser} users = {users}/> : ''}       
      </main>
    </div>
  )
}
