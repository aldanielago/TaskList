export function PrimaryButton({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-pblue-500 rounded-2xl px-6 py-1 shadow-md text-white my-4 mx-auto hover:bg-pblue-300 transition-colors duration-500 ease-in-out font-Quicksand"
      >
      { text }
    </button>
  )
}