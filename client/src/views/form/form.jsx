import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getTemperaments} from '../../redux/actions';
import axios from 'axios';

import style from './Form.module.css'

function validate(form) {
  let errors = {};

  if(!form.name || /\d/.test(form.name)) {
    errors.name = 'The name must contain only letters and cannot be empty';
  } 
  
  if (!form.maxHeight) {
    errors.maxHeight = 'it must have a maxHeight';
  }
   if (!form.minHeight) {
    errors.minHeight = 'it must have a minHeight';
  } 
  if (form.maxHeight && form.minHeight && parseInt(form.maxHeight) < parseInt(form.minHeight)) {
    errors.maxHeight = 'The maximum height cannot be less than the minimum height.';
    errors.minHeight = 'The minimum height cannot be greater than the maximum height.';
  }
  if (form.maxHeight && form.minHeight && parseInt(form.maxHeight) === parseInt(form.minHeight)) {
    errors.maxHeight = 'The maximum height cannot be equal to the minimum height.';
    errors.minHeight = 'The minimum height cannot be equal to the maximum height.';
  }

  if (!form.maxWeight) {
    errors.maxWeight = 'it must have a maxWeight';
  } 
  if (!form.minWeight) {
    errors.minWeight = 'it must have a minWeight';
  } 
  if (form.maxWeight && form.minWeight && parseInt(form.maxWeight) < parseInt(form.minWeight)) {
    errors.maxWeight = 'The maximum weight cannot be less than the minimum weight.';
    errors.minWeight = 'The minimum weight cannot be greater than the maximum weight.';
  }
  if (form.maxWeight && form.minWeigh && parseInt(form.maxWeight) === parseInt(form.minWeigh)) {
    errors.maxWeight = 'The maximum weight cannot be equal to the minimum weight.';
    errors.minWeigh = 'The minimum weight cannot be equal to the maximum weight.';
  }

  if (!form.lifeSpan) {
    errors.lifeSpan = 'it must have a lifeSpan';
  } 

  if (!form.temperament) {
    errors.temperament = 'it must have a temperament';
  } 

  if(!form.image || !form.image.startsWith('https://')) {
    errors.image = 'it must have a image and this must begin with https:// ...';
  } 
  
  return errors;
}


const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  
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

    try {
      const endpoint = 'http://localhost:3001/dogs';
      const response = await axios.post(endpoint, newDog)
      
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
    setErrors(validate({
      ...form,
      [event.target.name]: value
    }));
    console.log(event.target.value)
  }

  const handlerSelect = (event) => {
    setForm({
      ...form,
      temperament: [...form.temperament, parseInt(event.target.value)]
    })
  }

  return (
   
  <div className={style.form}>

    <div className={style.title}>
      <h1>¡ Create your Favorite Dog !</h1>
    </div>
    
    <div className={style.form_inputs}>

      <form onSubmit={handleSubmit}>

        <div className={style.inputs}>
          <label className={style.label} htmlFor="name">Name: </label>
          <input className={style.input} onChange={handleChange} value = {form.name} type='text' name= "name"></input>
          {errors.name && <p className={style.errors} >{errors.name}</p>}
        </div>

        <div className={style.inputs}>
          <label className={style.label} htmlFor="maxHeight">MaxHeight: </label>
          <input className={style.input} onChange={handleChange} value = {form.maxHeight} type='text' name= "maxHeight"></input>
          {errors.maxHeight && <p className={style.errors} >{errors.maxHeight}</p>}
        </div>

        <div className={style.inputs}>
          <label className={style.label} htmlFor="minHeight">MinHeight: </label>
          <input className={style.input} onChange={handleChange} value = {form.minHeight} type='text' name= "minHeight"></input>
          {errors.minHeight && <p className={style.errors} >{errors.minHeight}</p>}
        </div>

        <div className={style.inputs}>
          <label className={style.label} htmlFor="maxWeight">MaxWeight: </label>
          <input className={style.input} onChange={handleChange} value = {form.maxWeight} type='text' name= "maxWeight"></input>
          {errors.maxWeight && <p className={style.errors} >{errors.maxWeight}</p>}
        </div>

        <div className={style.inputs}>
        <label className={style.label} htmlFor="minWeight">MinWeight: </label>
          <input className={style.input} onChange={handleChange} value = {form.minWeight} type='text' name= "minWeight"></input>
          {errors.minWeight && <p className={style.errors} >{errors.minWeight}</p>}
        </div>

        <div className={style.inputs}>
          <label className={style.label} htmlFor="lifeSpan">LifeSpan: </label>
          <input className={style.input} onChange={handleChange} value = {form.lifeSpan} type='text' name= "lifeSpan"></input>
          {errors.lifeSpan && <p className={style.errors} >{errors.lifeSpan}</p>}
        </div>

        <div className={style.inputs}>
          <label className={style.label} htmlFor='temperament'>Temperaments: </label>
          <select className={style.input} onChange={handlerSelect} name='temperament'>
            {temperaments.map((temp)=> (
              <option value={temp.id} name={temp.name}>{temp.name}</option>
            ))}
          </select>
          <ul><li className={style.input_li}>{form.temperament.map(item => item + ' , ')}</li></ul>
          {errors.temperament && <p className={style.errors} >{errors.temperament}</p>}
        </div>
        

        <div className={style.inputs}>
          <label className={style.label} htmlFor="image">Image: </label>
          <input className={style.input} onChange={handleChange} value = {form.image} type='text' name= "image"></input>
          {errors.image && <p className={style.errors} >{errors.image}</p>}
        </div>

        <div className={style.button_div}>
        <button className={style.button} type="submit">CREATE</button>
        </div>
        
      </form>
    </div>
    
  </div>
    
  )
}

export default Form;