import { useState } from 'react';

function useLocalStorage(itemName, initialSatate){
  const localStorageItems = localStorage.getItem(itemName);
  let parsedLocalStorage;

  if(!localStorageItems){
    localStorage.setItem(itemName, JSON.stringify(initialSatate));
    parsedLocalStorage = initialSatate
  } else {
    parsedLocalStorage = JSON.parse(localStorageItems);
  }

  const [ item, setItem ] = useState(parsedLocalStorage);

  // This function update the state and local storage at the same time
  const updateInfo = (new_info) => {
    setItem(new_info);
    localStorage.setItem(itemName, JSON.stringify(new_info));
  }

  return [ item, updateInfo ];
}

export { useLocalStorage }