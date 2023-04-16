function Screen({ value }) {
  return (
    <input
      type='text'
      placeholder='Your Input...'
      className='p-3 rounded-lg w-full'
      readOnly
      value={value}
    />
  )
}
export default Screen
