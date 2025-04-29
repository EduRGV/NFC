import React, { useState } from "react";

const ProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    posicion: "",
    descripcion: "",
    imagen: null,
    ProfileImagePreview: null,
    backgroundImage: null,
    backgroundImagePreview: null,
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

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imagen: file,
          ProfileImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, imagen: null, ProfileImagePreview: null });
    }

  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          backgroundImage: file,
          backgroundImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, backgroundImage: null, backgroundImagePreview: null });
    }
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
          <label className="form-label">Seleccionar Imagen de Perfil</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>

        {formData.ProfileImagePreview && (
          <div className="mb-3 text-center">
            <label className="form-label">Vista previa de la foto de perfil:</label><br />
            <img
              src={formData.ProfileImagePreview}
              alt="Profile Preview"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid #ccc',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Imagen de Fondo</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleBackgroundImageChange} />
        </div>

        {formData.backgroundImagePreview && (
          <div className="mb-3">
            <label className="form-label">Vista previa del fondo:</label><br />
            <img
              src={formData.backgroundImagePreview}
              alt="Background Preview"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '5px' }}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Website URL</label>
          <input type="url" className="form-control" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">LinkedIn URL</label>
          <input type="url" className="form-control" name="linkedInUrl" value={formData.linkedInUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Facebook URL</label>
          <input type="url" className="form-control" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Teléfono</label>
          <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default ProfileForm;
