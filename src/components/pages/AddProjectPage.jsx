import { useContext } from "react"
import { AddTask } from "../elements/AddTask"
import { ProjectContext } from "../../contexts/ProjectsContext"
import { PrimaryButton } from "../buttons/PrimaryButton"

export function AddProjectPage() {
  const { projectsPallete } = useContext(ProjectContext);

  function handleSpanClick() {

  }

  return (
    <section className="flex flex-col items-center gap-4">
      <h1 className="font-Quicksand font-bold text-xl pl-4 pt-12">Add a project</h1>
      <form className="flex flex-col border border-light-blue p-8 gap-8 rounded-md">
        <label className="flex flex-col gap-3">
          <span className="font-Quicksand">Escribe el nombre del proyecto: </span>
          <input className="font-Quicksand border border-light-blue rounded-md p-2" type="text" placeholder="nombre"/>
        </label>
        <label className="flex flex-col">
          <span className="font-Quicksand">Selecciona un color: </span>
          <div className="flex gap-3">
            { projectsPallete.map((p, index) => {
              return (
                <label key={index}>
                  <input type="radio" name="color" value={p.pallete} className="hidden"/>
                  <span onClick={handleSpanClick}
                    className={`font-Quicksand w-min block border ${p.bgColor} hover:${p.secondaryColor} active:${p.secondaryColor} hover:cursor-pointer p-2 rounded-xl`}>
                    {p.name}
                  </span>
                </label>
              )})}
          </div>
        </label>
        <label className="flex flex-col items-center">
          <span className="font-Quicksand self-start">Add your first task for this project!</span>
          <AddTask/>
        </label>
        <PrimaryButton text="Add project" />
      </form>
    </section>
  )
}