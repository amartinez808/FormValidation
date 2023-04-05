import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Form() {
  // Set up state variables for showing the form, and storing form data and errors
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [cartoon, setCartoon] = useState('');
  const [errors, setErrors] = useState({});

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form, and only clear it and hide it if it's valid
    if (validateForm()) {
      setName('');
      setEmail('');
      setAge('');
      setCartoon('');
      setShowForm(false);
    }
  };

  // Function to handle the Clear button click
  const handleClear = () => {
    setName('');
    setEmail('');
    setAge('');
    setCartoon('');
    setErrors({});
  };
  
  // Function to validate the form and update the errors state
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Check if the Name field is blank
    if (name.trim() === '') {
      newErrors.name = 'Fool! Name cannot be blank';
      isValid = false;
    }

    // Check if the cartoon field is blank or if it's not a number
    if (cartoon.trim() === '') {
      newErrors.cartoon = 'Fool! Cartoon cannot be blank';
      isValid = false;
    }

    // Check if the Email field is blank or if it's not a valid email address
    if (email.trim() === '') {
      newErrors.email = 'Fool! Email cannot be blank';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email STILL not valid, you cant fool me! >:]';
      isValid = false;
    }

    // Check if the Age field is blank or if it's not a number
    if (age.trim() === '') {
      newErrors.age = 'Fool! Age cannot be blank';
      isValid = false;
    } else if (isNaN(age)) {
      newErrors.age = 'Age must be a number';
      isValid = false;
    }

    // Update the errors state with any new errors
    setErrors(newErrors);
    // Return a boolean indicating whether the form is valid
    return isValid;
  };

  // Functions to handle changes to the form data and clear any associated errors
  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors({ ...errors, name: '' });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Live validation for Email field - show error if it's not a valid email address
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setErrors({ ...errors, email: 'Email STILL not valid!?' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    setErrors({ ...errors, age: '' });
  };

  const handleCartoonChange = (e) => {
    setCartoon(e.target.value);
    setErrors({ ...errors, cartoon: '' });
  };



  // Render the component
  return(
    <div className='form-container'>
      {/* Button to show the form */}
      <button onClick={() => setShowForm(true)}>Show Form</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <br />
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
            {errors.name && <span>{errors.name}</span>}
          </label>
          <br />
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
            {errors.email && <span>{errors.email}</span>}
          </label>
          <br />
          <br />
          <label>
            Age:
            <input type="text" value={age} onChange={handleAgeChange} />
            {errors.age && <span>{errors.age}</span>}
          </label>
          <br />
          <br />
          <label>
            Favorite Cartoon:
            <input type="text" value={cartoon} onChange={handleCartoonChange} />
            {errors.cartoon && <span>{errors.cartoon}</span>}
          </label>
          <br />
          <br />
          <button type="submit">Submit</button>
          <br />
          <button type="button" onClick={handleClear}>Clear</button>
        </form>
      )}
    </div>
  );
}

export default Form;
