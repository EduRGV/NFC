import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";

const ProfileContainer = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("id", 0); // ID se genera en el backend
    formDataToSend.append("Name", formData.nombre); // Cambiado a "Name"
    formDataToSend.append("Position", formData.posicion); // Cambiado a "Position"
    formDataToSend.append("Description", formData.descripcion); // Cambiado a "Description"
    formDataToSend.append("WebsiteUrl", formData.websiteUrl); // Agregado
    formDataToSend.append("LinkedInUrl", formData.linkedInUrl); // Agregado
    formDataToSend.append("FacebookUrl", formData.facebookUrl); // Agregado
    formDataToSend.append("PhoneNumber", formData.phoneNumber); // Agregado
    formDataToSend.append("Email", formData.email); // Agregado
    
    // Verificamos si hay una imagen seleccionada antes de agregarla
    if (formData.imagen instanceof File) {
        console.log("📂 Imagen detectada:", formData.imagen.name);
      formDataToSend.append("imageFile", formData.imagen); // El nombre debe coincidir con el parámetro en el backend
    }else {
        console.warn("⚠️ No se ha seleccionado una imagen o no es un archivo válido.");
      }

    try {
      const response = await fetch("https://localhost:7059/api/Profile", {
        method: "POST",
        body: formDataToSend, // No se agrega Content-Type, lo maneja automáticamente el navegador
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error del servidor:", errorData);
        throw new Error("Error al guardar el perfil");
      }

      const data = await response.json();
      navigate(`/profile/${data.id}`); // Redirige al perfil creado
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <ProfileForm onSubmit={handleFormSubmit} />;
};

export default ProfileContainer;
