import React, {useState, useEffect} from "react"
 const Searcher=()=>{
    //seting hooks
    const [ users, setUsers ] = useState([])
    const [ search, setSearch ] = useState("")

    //función para traer los datos de la API
    const URL = 'https://jsonplaceholder.typicode.com/users'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        //console.log(data)
        setUsers(data)
    }

    const searcher = (e) => {
        setSearch(e.target.value)   
    } 
    
   let results = []
   if(!search)
   {
       results = users
   }else{
        results = users.filter( (dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
     )
    }
    useEffect( ()=> {
        showData()
    }, [])

    return(
        <div>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <div className='mt-5 shadow-lg'>
                { results.map( (user) => (
                    <div key={user.id}>
                        <img src={user.name} className="card-img-top" />
                        <h2></h2>
                        <div classname="card-body">
                            <p>{user.username}</p>

                        </div>
                        
                    </div>                    
                ))}
                
                
            </div>
        </div>
    )

    
 }
 export default Searcher