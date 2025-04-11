import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";

const ProfileContainer = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("id", 0); 
    formDataToSend.append("Name", formData.nombre); 
    formDataToSend.append("Position", formData.posicion); 
    formDataToSend.append("Description", formData.descripcion); 
    formDataToSend.append("WebsiteUrl", formData.websiteUrl); 
    formDataToSend.append("LinkedInUrl", formData.linkedInUrl); 
    formDataToSend.append("FacebookUrl", formData.facebookUrl); 
    formDataToSend.append("PhoneNumber", formData.phoneNumber); 
    formDataToSend.append("Email", formData.email); 
    

    

    if (formData.imagen instanceof File) {
        console.log("📂 Imagen detectada:", formData.imagen.name);
      formDataToSend.append("imageFile", formData.imagen); 
    }else {
        console.warn("⚠️ No se ha seleccionado una imagen o no es un archivo válido.");
      }
      if (formData.backgroundImage instanceof File) {
        console.log("📂 Imagen detectada:", formData.backgroundImage.name);
      formDataToSend.append("backgroundFile", formData.backgroundImage); 
    }else {
        console.warn("⚠️ No se ha seleccionado una imagen o no es un archivo válido.");
      }

    try {
      const response = await fetch("https://localhost:7059/api/Profile", {
        method: "POST",
        body: formDataToSend, 
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error del servidor:", errorData);
        throw new Error("Error al guardar el perfil");
      }

      const data = await response.json();
      navigate(`/profile/${data.id}`); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <ProfileForm onSubmit={handleFormSubmit} />;
};

export default ProfileContainer;
