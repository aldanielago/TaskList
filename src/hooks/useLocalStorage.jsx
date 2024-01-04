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
  function updateInfo(new_info) {
    setItem(new_info);
    localStorage.setItem(itemName, JSON.stringify(new_info));
  }

  return {
    item,
    error,
    loading,
    updateInfo,
  };
}

export { useLocalStorage };