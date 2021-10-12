import { useSWRConfig } from 'swr';

export default function Grid({deletedUser,setUser, users}) {
  const { mutate } = useSWRConfig()
  const deleteUser = async (user) => {
    try {
        let dataa = await fetch('/api/deleteUser',{
            method:'DELETE',
            body: JSON.stringify({id : user.id}),
            headers:{
                'Content-Type':'application/json',
            },
        }).then((res)=>{
          if(res.status === 200){
            mutate('/api/users');
          }
        })
        
        
    } catch (err) {
        console.log(err);
    }
};
  return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users && users.map((person) => (
                    <tr key={person.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {/* <img className="h-10 w-10 rounded-full" src={person.image} alt="" /> */}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{person.data.firstName}</div>
                            {/* <div className="text-sm text-gray-500">{person.email}</div> */}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.data.lastName}</div>
                        {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {person.data.emailAddress}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href = "#" onClick={()=>{setUser(person)}} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a> 
                        <span> | </span> 
                      <a href="#" onClick={()=>{deleteUser(person)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  