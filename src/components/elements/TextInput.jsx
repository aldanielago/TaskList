export function TextInput({ item, value, onChange, setEdit, mainFunction, text = 'small', placeholder }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      item ? mainFunction(item.id, value) : mainFunction(value);
      setEdit && setEdit(false);
    } else if (e.key === 'Escape') {
      setEdit && setEdit(false);
    }
  };

  return (
    <input className={`${text == 'big' ? 'text-base' : 'text-sm'} pl-0 pb-1 font-Quicksand bg-inherit text-base max-w-md mb-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-primary-blue transition-colors ease-linear delay-200 duration-150 form-input w-full`}
      value={ value }
      placeholder={ placeholder }
      onKeyDown={ handleKeyDown }
      onChange={(e) => onChange(e.target.value)}
    />
  )
}