import { VscError } from 'react-icons/vsc';
import { SecondaryButton } from '../buttons/SecondaryButton';

function ErrorLoading(){
  return (
    <>
      <h3><VscError className='text-red-400 text-8xl pb-4'/></h3>
      <p className='py-4 text-base font-Quicksand text-gray-font'>Oh, no! Something went wrong</p>
      <SecondaryButton text="Try again"/>
    </>
  )
}

export { ErrorLoading }