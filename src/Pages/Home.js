import React, {useState} from 'react'
import Recipes from '../Components/Recipes/Recipes';
import { Search } from '../Components/Search/Search';
import { Kategorii } from '../Components/Kategorii/Kategorii';


function Home() {
    const [searchTerm, setSearchTerm] = useState("");

  return (

    <div>
       <Kategorii 
          
          />
   
         <Search 
         setSearchTerm={setSearchTerm}
         />
         <Recipes 
            searchTerm={searchTerm}
         />
    </div>
  )
}

export default Home