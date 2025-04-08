import React, { useState } from "react";

const ProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    posicion: "",
    descripcion: "",
    imagen: null,
    websiteUrl: "",
    linkedInUrl: "",
    facebookUrl: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
    onSubmit(formData); 
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
        <div className="mb-3">
          <label className="form-label">Website URL</label>
          <input
            type="url"
            className="form-control"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">LinkedIn URL</label>
          <input
            type="url"
            className="form-control"
            name="linkedInUrl"
            value={formData.linkedInUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Facebook URL</label>
          <input
            type="url"
            className="form-control"
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};


export default ProfileForm;
