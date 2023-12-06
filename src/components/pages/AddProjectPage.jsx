import { useContext } from "react"
import { AddTask } from "../elements/AddTask"
import { ProjectContext } from "../../contexts/ProjectsContext"
import { PrimaryButton } from "../buttons/PrimaryButton"

export function AddProjectPage() {
  const { projectsPallete } = useContext(ProjectContext)
  return (
    <>
      <h1 className="font-Quicksand font-bold text-lg pl-4 pt-4">Add a project</h1>
      <label>
        <span className="font-Quicksand">Escribe el nombre del proyecto: </span>
        <input className="font-Quicksand" type="text" placeholder="nombre"/>
      </label>
      <label>
        <span className="font-Quicksand">Selecciona un color: </span>
        { projectsPallete.map((p, index) => {
          return (
            <label key={index}>
              <input type="radio" name="color" value={p.pallete} />
              <span className={`font-Quicksand inline-block bg-${p.bgColor} hover:bg-${p.secondaryColor} hover:cursor-pointer p-2 rounded-xl`}>{p.name}</span>
            </label>
          )})}
      </label>
      <label>
        <span>Add your first task for this project!</span>
        <AddTask />
      </label>
      <PrimaryButton text="Add project" />
    </>
  )
}