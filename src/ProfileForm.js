import React, { useState } from "react";

const ProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    posicion: "",
    descripcion: "",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar la selección de la imagen
  const handleImageChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Ahora enviamos solo el objeto formData normal
  };
  

  return (
    <div className="container mt-4">
      <h2>Crear Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Posición</label>
          <input type="text" className="form-control" name="posicion" value={formData.posicion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Seleccionar Imagen</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};


export default ProfileForm;
