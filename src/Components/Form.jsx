import React, { useState } from "react";


const Form = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length <= 5) {
      newErrors.name = 'El nombre debe tener más de 5 caracteres.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'El formato del correo electrónico es incorrecto.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
    } else {
      console.log('Formulario enviado:', formData);
      setSuccessMessage(`Gracias ${formData.name}, te contactaremos cuando antes vía mail`);
      setErrors({});
      setFormData({ name: '', email: '' });
    }
  };

  return (
    <div className="contact-form">
      <h1>Contacto</h1>
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
