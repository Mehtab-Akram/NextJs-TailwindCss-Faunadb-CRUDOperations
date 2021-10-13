import Form from '../Components/Form'
import Grid from '../Components/Grid'
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../Components/LoadingIndicator';
const fetcher = async ()=>{
  const response = await trackPromise (fetch ('/api/users'));  
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
       
       {users && users !== [] ? <Grid deletedUser = {mutate} setUser = {setUser} users = {users}/> : '' }     
       <LoadingIndicator/>
      </main>
    </div>
  )
}
