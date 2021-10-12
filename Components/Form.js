import {useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSWRConfig } from 'swr';
import { useEffect } from 'react';
export default function Form({user, setUser}) {
  const { mutate } = useSWRConfig()
    const {register,handleSubmit,reset,formState: { errors }} = useForm({
      defaultValues : {
        firstName : user.data? user.data.firstName:'',
        lastName : user.data? user.data.lastName:'',
        address : user.data? user.data.address:'',
      },      
    });
    useEffect (()=>{
      console.log("form user : ", user.data);
      if(user.data){
        reset(user.data,false);
      }
    },[user]);
    const updateUser = async (data) => {
      const {firstName, lastName, emailAddress} = data;
      const id = user.id;
      try {
          await fetch('/api/updateUser',
          {
              method : 'PUT',
              body : JSON.stringify({firstName, lastName, emailAddress,id}),
              headers : {
                  'Content-Type': 'application/json',
              },
          }).then((res)=>{
            if(res.status === 200){
              setUser({});
              reset({firstName:'',lastName:'',emailAddress:''},false);
              mutate('/api/users');
              return;
            }
            res.status(403).json({msg:"Data not updated."});          
          }); 
      } catch (err) {
          console.error(err);
      }
  };
   
    const createUser = async (data) => {
    
      try {
        const {firstName, lastName, emailAddress} = data;
        await fetch('/api/createUser',{
          method : 'POST',
          body : JSON.stringify({firstName,lastName,emailAddress}),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          if(res.status === 200){
            reset({firstName:'',lastName:'',emailAddress:''},false);
            mutate('/api/users');
            return;
          }
          res.status(403).JSON({msg:"Data not updated."});          
        });        
      } 
      catch (error) {
        console.log('Some error on Form.js')
      }



    }

    return (
      <>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-1 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST" onSubmit = {handleSubmit(user.data ? updateUser : createUser)}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register("firstName", {
                            required: "First name is required.",
                          })}
                          />
                      <ErrorMessage errors={errors} name="firstName" />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register("lastName", {
                            required: "Last name is required!",
                          })}
                        />
                        <ErrorMessage errors={errors} name="lastName" />

                      </div>
  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="emailAddress"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register("emailAddress", {
                            required: "Email address is required",
                          })}
                        />
                        <ErrorMessage errors={errors} name="emailAddress" />

                      </div>
  
                      
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </>
    )
  }
  