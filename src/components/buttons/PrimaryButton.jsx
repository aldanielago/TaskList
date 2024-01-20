export function PrimaryButton({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary-blue rounded-2xl px-6 py-1 shadow-md text-white my-4 mx-auto hover:bg-blue-hover transition-colors duration-500 ease-in-out font-Quicksand"
      >
      { text }
    </button>
  )
}