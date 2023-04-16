function Button({ value, buttonOperation }) {
  return (
    <button className='btn' onClick={(e) => buttonOperation(value, e)}>
      {value}
    </button>
  )
}
export default Button
