import React, { useEffect, useState } from 'react';
import { firestore } from '../../Firebase/config';
import './RecipeCard.css';

const Recipes = ({searchTerm}) => {

    const [collectionData, setCollectionData] = useState([]);
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const collectionRef = firestore.collection('Recepti');
          const snapshot = await collectionRef.get();
  
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setCollectionData(data);
        } catch (error) {
          console.error('Error fetching collection:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    collectionData.filter(recipe => recipe.Ime.toLowerCase().includes(searchTerm.toLowerCase())).map(recipe => {
        return(
            <div className="recipe-card" key={recipe.id}>
            <img className="recipe-image" src={recipe.IMG} alt={recipe.Ime} />
            <div className="recipe-content">
              <h2 className="recipe-title">{recipe.Ime}</h2>
              <h3 className="recipe-subtitle">Состојки</h3>
              <ul className="recipe-ingredients">
                {recipe.Sostojki && recipe.Sostojki.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3 className="recipe-subtitle">Подготовка</h3>
              <ol className="recipe-instructions">
                {recipe.Podgotovka}
              </ol>
              <h3>Калории</h3>
              <p>{recipe.Kalorii}</p>

              <h3>
                Време на подготовка 
                {`${recipe.Vreme?.Saati === undefined ? "" : `${recipe.Vreme?.Saati}h`} 
              ${recipe.Vreme?.Minuti}`}  
              </h3>
              
            </div>
            {/* <button>
                Podgotovka
            </button> */}
          </div>
        )
    })
  )
}

export default Recipes