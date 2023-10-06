import {useState} from 'react';

const Form = () => {

  const [form, setForm] = useState({
    name: '',
    heightMax: '',
    heightMin: '',
    weightMax: '',
    weightMin: '',
    lifeSpan: ''

  });

  const [errors, setErros] = useState({
    name: '',
    heightMax: '',
    heightMin: '',
    weightMax: '',
    weightMin: '',
    lifeSpan: ''
  })

 
  const handleChange = (event) => {

    validate({
      ...form,
      [event.target.name]:event.target.value
    })
    setForm({
      ...form,
      [event.target.name]:event.target.value
    })
    
  }

  const validate = (form) => {

  }


  const handleSubmit = (event) => {
    event.preventDefault();
  }

  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange}  value = {form.name} type='text' name= "name"></input>
      </div>

      <div>
        <label htmlFor="heightMax">HeightMax: </label>
        <input onChange={handleChange}  value = {form.heightMax} type='text' name= "heightMax"></input>
      </div>

      <div>
        <label htmlFor="heightMin">HeightMin: </label>
        <input onChange={handleChange}  value = {form.heightMin} type='text' name= "heightMin"></input>
      </div>

      <div>
        <label htmlFor="weightMax">WeightMax: </label>
        <input onChange={handleChange}  value = {form.weightMax} type='text' name= "weightMax"></input>
      </div>

      <div>
      <label htmlFor="weightMin">WeightMin: </label>
        <input onChange={handleChange} value = {form.weightMin} type='text' name= "weightMin"></input>
      </div>

      <div>
        <label htmlFor="lifeSpan">LifeSpan: </label>
        <input onChange={handleChange} value = {form.lifeSpan} type='text' name= "lifeSpan"></input>
      </div>


      <button type="submit">CREATE</button>
    </form>
  )
}

export default Form;