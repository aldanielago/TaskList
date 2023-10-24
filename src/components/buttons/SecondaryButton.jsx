function SecondaryButton({ text }) {
  return (
    <button
      className="rounded-2xl text-sm px-6 py-1 border-2 border-red-400 shadow-m my-4 mx-auto hover:bg-red-400 hover:text-white transition-colors duration-500 ease-in-out font-Quicksand">
      { text }
    </button>
  )
}

export { SecondaryButton };