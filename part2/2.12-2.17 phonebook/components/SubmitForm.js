const SubmitForm = ({onSubmit, nameValue,nameOnChange,phoneValue,phoneOnChange}) => {
  return (
    <form onSubmit={onSubmit}>
    <div>
      name: <input value={nameValue}
    onChange={nameOnChange} /><p>
      phone: <input value={phoneValue}
      onChange = {phoneOnChange}/></p>
    </div>
    <button type="submit">save</button>
  </form>
  )
}
export default  SubmitForm 