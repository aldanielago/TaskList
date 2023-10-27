import { useState, useEffect } from 'react';

function useLocalStorage(itemName, initialState){
  const [ item, setItem ] = useState(initialState);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItems = localStorage.getItem(itemName);
        let parsedLocalStorage;

        if(!localStorageItems){
          localStorage.setItem(itemName, JSON.stringify(initialState));
          parsedLocalStorage = initialState
        } else {
          parsedLocalStorage = JSON.parse(localStorageItems);
          setItem(parsedLocalStorage);
        }
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false);
      }
    }, 2000);
  })


  // This function update the state and local storage at the same time
  const updateInfo = (new_info) => {
    setItem(new_info);
    localStorage.setItem(itemName, JSON.stringify(new_info));
  }

  return {
    item,
    updateInfo,
    loading,
    error
  };
}

export { useLocalStorage }

// const todos = [
//   { text: 'Lo que sea 1', completed: false},
//   { text: 'Lo que sea 2', completed: false},
//   { text: 'Lo que sea 3', completed: false},
//   { text: 'Lo que sea 4', completed: false},
//   { text: 'Lo que sea 5', completed: false},
//   { text: 'Lo que sea 6', completed: false},
//   { text: 'Lo que sea 7', completed: false},
//   { text: 'Lo que sea 8', completed: false},
// ]

// localStorage.setItem('TASKS_V1', JSON.stringify(todos));