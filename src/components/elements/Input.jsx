// item represent a task a project to edit information
export function Input({ type = "text", item, value, name, setEdit, onChange, mainFunction, text = 'small', placeholder, }) {
  // we use 'item' to specify if we are editing a property inside a project or a task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // mainFunction will take two arguments only if we are editing a property inside a project or a task (item)
      if(item) {
        mainFunction(item.id, value)
        setEdit(false)
      } else {
        mainFunction()
      }
    }
  };

  return (
    <>
    {type === 'text' &&
    <input className={`${text == 'big' ? 'text-base' : 'text-sm'} pl-0 pb-1 font-Quicksand bg-inherit text-base max-w-[90%] md:max-w-md mb-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-pblue-500 transition-colors ease-linear delay-200 duration-150 form-input w-full`}
      name={ name }
      value={ value }
      placeholder={ placeholder }
      onKeyDown={ handleKeyDown }
      // if name is not null, we'll need to pass the event to the onChange function to update the state
      onChange={(e) => { name ? onChange(e) : onChange(e.target.value) }}
    />}

    {type == "date" &&
    <input className={`pl-0 pb-1 font-Quicksand bg-inherit text-sm max-w-md mb-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-pblue-500 transition-colors ease-linear delay-200 duration-150 form-input w-full`}
      type="date"
      value={ value }
      onClick={ handleKeyDown }
      onKeyDown={ handleKeyDown }
      onChange={(e) => { onChange && onChange(e.target.value) }}
    />}
  </>
  );
}
