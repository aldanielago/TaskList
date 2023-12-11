export function InformativeBox({ item, time }){
  return (
    <section className="border-light-blue border-2 max-w-lg p-3 mt-2 w-11/12 rounded-3xl flex flex-col gap-3">
      <p className="text-sm font-Quicksand pl-4">You don&apos;t have {item} {time}</p>
    </section>
  )
}