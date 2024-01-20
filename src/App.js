
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialValues = { username: "",  phoneNumber: "", email: "", password: "" };
  const [formValue, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormValues({ ...formValue, [name]: value });

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log(formValue);
    }
  }, [formErrors])
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.username) {
      errors.username = "username is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    }
    else if (!regex.test(values.email)){
      errors.email = "this is not a valid email format"
    }
    if (!values.password) {
      errors.password = "password is required";
    }
    else if (values.password.length < 4){
      errors.password = "password must be more than 4 character"
    }
    else if (values.password.length > 10){
      errors.password = "password cannot exceed more than 10 number"
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "phonenumber is required";
    }
    else if(values.phoneNumber.length <10){
      errors.phoneNumber = "phone number must be 10 digits"
    }
    else if(values.phoneNumber.length >10){
      errors.phoneNumber = "phone number should not be more than 10 digits"
    }
    return errors;

  }
  return (
<div className='allf'>
     {
      Object.keys(formErrors).length === 0 && isSubmit && (<div className='uimessagesuccess'>Signed In Successfully</div> ) 
     }
    <div className='full'>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className='ui div'></div>


        {/* firstname lastname */}
        <div className='field'>
          <input 
          type='text'
           className='boll'
            name="username"
            placeholder='FirstName'
            value={formValue.username}
            onChange={handleChange} 
        />
        </div>
        <p>{formErrors.username}</p>
       {/* phoneNumber */}
       <div className='field'>
          <input type='phoneNumber'
           name='phoneNumber'
           className='boll'
            placeholder='PhoneNumber'
            value={formValue.phoneNumber}
            onChange={handleChange} />
        </div>
        <p>{formErrors.phoneNumber}</p>
        {/* email */}
        <div className='field'>
          <input
           type="email"
            placeholder='EmailId'
            name='email'
            className='boll'
            value={formValue.email}
            onChange={handleChange} />
        </div>
        <p>{formErrors.email}</p>
        
        {/* password */}
        <div className='field'>
          <input type='password'
            placeholder='Password'
            name='password'
            className='boll'
            autoComplete='current-password'
            value={formValue.password}
            onChange={handleChange} />
        </div>
        <p>{formErrors.password}</p>
    
        <button className='btn'>Sign Up</button>

      </form>

    </div>
    </div>
  );
}
export default App;
