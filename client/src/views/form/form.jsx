import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {postDogs, getTemperaments} from '../../redux/actions';
import axios from 'axios';


const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments)

  
  useEffect(()=> {
    dispatch(getTemperaments())
  }, [dispatch])

  const [form, setForm] = useState({
    name: '',
    maxHeight: '',
    minHeight: '',
    maxWeight: '',
    minWeight: '',
    lifeSpan: '',
    temperament:[],
    image: ''
  });

console.log (form)

  // const [errors, setErros] = useState({
  // //   name: '',
  //   maxHeight :0,
  //   minHeight: 0,
  //   maxWeight: 0,
  //   minWeight: 0,
  //   lifeSpan: 0,
  //   temperament:[],
  //   image: ''
  // })

 
  

  //   validate({
  //     ...form,
  //     [event.target.name]:event.target.value
  //   })
  //   setForm({
  //     ...form,
  //     [event.target.name]:event.target.value
  //   })
    
  // }

  // // const validate = (form) => {

  // }
  const newDog = {
    name:form.name,
    image: form.image,
    height: form.minHeight + ' - ' + form.maxHeight,
    weight: form.minWeight + ' - ' + form.maxWeight,
    life_span: form.lifeSpan + ' - ' + ' years',
    Temperaments: form.temperament
  }
  console.log(newDog);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form)
    // const newDog = {
    //   name:form.name,
    //   image: form.image,
    //   height: form.minHeight + ' - ' + form.maxHeight,
    //   weight: form.minWeight + ' - ' + form.maxWeight,
    //   life_span: form.lifeSpan,
    //   Temperaments: form.temperament
    // }

    try {
      const endpoint = 'http://localhost:3001/dogs';
      const response = await axios.post(endpoint, newDog)
      console.log(response)
    } catch (error) {
      console.log(error.message);
    }
    alert('The dog was successfully created');
    setForm({
      name: '',
      maxHeight: '',
      minHeight: '',
      maxWeight: '',
      minWeight: '',
      lifeSpan: '',
      temperament:[],
      image: ''
    })
    history.push('/home')
  }

  const handleChange = (event) => { //cada vez q se ejecute esta funcion, a mi estado setForm, ademas de lo q tiene (...form), agregale el target value, a lo q se modifica es decir el 'name' q se agrego a cada input.
    const value = event.target.value; // cada 'name' q encuentre va a modificar ese target value
    setForm({
      ...form,
      [event.target.name]: value
    });
    console.log(event.target.value)
  }

  const handlerSelect = (event) => {
    setForm({
      ...form,
      temperament: [...form.temperament, parseInt(event.target.value)]
    })
  }

  return (
   
  <div>
    <h1>¡Create your Favorite Dog!</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} value = {form.name} type='text' name= "name"></input>
      </div>

      <div>
        <label htmlFor="maxHeight">MaxHeight: </label>
        <input onChange={handleChange} value = {form.maxHeight} type='text' name= "maxHeight"></input>
      </div>

      <div>
        <label htmlFor="minHeight">MinHeight: </label>
        <input onChange={handleChange} value = {form.minHeight} type='text' name= "minHeight"></input>
      </div>

      <div>
        <label htmlFor="maxWeight">MaxWeight: </label>
        <input onChange={handleChange} value = {form.maxWeight} type='text' name= "maxWeight"></input>
      </div>

      <div>
      <label htmlFor="minWeight">MinWeight: </label>
        <input onChange={handleChange} value = {form.minWeight} type='text' name= "minWeight"></input>
      </div>

      <div>
        <label htmlFor="lifeSpan">LifeSpan: </label>
        <input onChange={handleChange} value = {form.lifeSpan} type='text' name= "lifeSpan"></input>
      </div>

      <label htmlFor='temperament'>Temperaments: </label>
      <select onChange={handlerSelect} name='temperament'>
        {temperaments.map((temp)=> (
          <option value={temp.id} name={temp.name} >{temp.name}</option>
        ))}
      </select>
      <ul><li>{form.temperament.map(item => item + ' , ')}</li></ul>

      <div>
        <label htmlFor="image">Image: </label>
        <input onChange={handleChange} value = {form.image} type='text' name= "image"></input>
      </div>

      <button type="submit">CREATE</button>
    </form>
  </div>
    
  )
}

export default Form;