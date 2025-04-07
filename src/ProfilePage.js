import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logo from "./images/logo-slin_d2a50cf4d3.png";
import background from "./images/slin-background.jpg";
import './ProfilePage.css'; 
import { QRCodeCanvas } from 'qrcode.react';

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [profileUrl, setProfileUrl] = useState(""); // Estado para almacenar la URL del perfil

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://localhost:7059/api/Profile/${id}`);
        if (!response.ok) throw new Error("Perfil no encontrado");

        const data = await response.json();
        console.log("ProfileUrl:", data.profileUrl); 
        setProfile(data);
        setProfileUrl(data.profileUrl); // Almacena la URL del perfil

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <p className="text-center text-black mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div
    className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat text-black"
    style={{ backgroundImage: `url(${background})`, minHeight: '100vh' }} // Asegúrate que el fondo ocupe toda la altura
>
      {/* Meta datos */}
      <Helmet>
        <title>{profile ? `${profile.name} - Perfil` : "Cargando perfil..."}</title>
        <meta name="description" content={profile ? `Perfil de ${profile.name}, ${profile.position}.` : "Cargando perfil..."} />
        <meta property="og:title" content={profile ? `${profile.name} - Perfil` : "Perfil"} />
        <meta property="og:description" content={profile ? `Información sobre ${profile.name}.` : "Perfil de usuario"} />
        <meta property="og:image" content={profile?.imageUrl || "/default-profile.png"} />
        <meta property="og:type" content="profile" />
      </Helmet>

      {/* Menú Superior */}
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 md:px-0">
        <img className="h-10" src={logo} alt="Logo" />
        <div className={`absolute md:static top-16 right-0 bg-gray-800 w-full md:w-auto md:flex flex-col md:flex-row items-center z-40 ${menuOpen ? "flex" : "hidden"}`}>
          {/* Opciones de menú si se agregan */}
        </div>
      </nav>

      
      {/* Perfil */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <section className="max-w-sm w-full bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-lg text-center">
          <img
            className="profile-image"
            src={profile?.imageUrl || "/default-profile.png"}
            alt={profile?.name || "Usuario"}
          />
          <div className="profile-text">
            <h2 className="text-lg text-gray-200 profile-name">{profile?.name}</h2>
            <h3 className="text-lg text-gray-300 profile-title">{profile?.position}</h3>
            <p className="profile-description mt-2">{profile?.description}</p>
          </div>

           {/* Muestra el código QR directamente aquí */}
        {profileUrl && (
          <div className="qr-container">
            <QRCodeCanvas value={profileUrl} size={100} className="qr-code" /> {/* Ajusta el tamaño aquí */}
            <p className="text-white mt-4">Escanea el código QR para acceder al perfil.</p>
          </div>
        )}
        </section>

       
      </main>

      
    </div>
    
  );
};

export default ProfilePage;
