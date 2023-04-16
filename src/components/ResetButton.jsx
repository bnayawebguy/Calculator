function ResetButton({ resetOperation, label }) {
  return (
    <button className='bg-red-500 p-2 px-4 rounded-lg text-white' onClick={(e) => resetOperation(e)}>
      {label}
    </button>
  )
}
export default ResetButton
