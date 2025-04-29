import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logo from "./images/logo-slin_d2a50cf4d3.png";
import background from "./images/slin-background.jpg";
import './ProfilePage.css';
import { QRCodeCanvas } from 'qrcode.react';
import { FiLink, FiDownload, FiUserPlus, FiShare2 } from "react-icons/fi";
import { FiPhone, FiMessageCircle } from "react-icons/fi";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiMail } from 'react-icons/fi';
import QRCode from "qrcode"
import { WalletService } from "./services/WalletServices";

const baseUrl = "http://54.242.76.106:5000/api";
// const baseUrl = process.env.REACT_APP_API_URL;


const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const qrcodeCanvasRef = useRef(null);

  const generateQRCode = () => {
    if (!profile) return;

    const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.name}\nORG:SLIN\nTITLE:${profile.position}\nTEL:${profile.phoneNumber}\nEMAIL:${profile.email}\nURL:${profile.websiteUrl}\nEND:VCARD`;

    const canvas = qrcodeCanvasRef.current;

    QRCode.toCanvas(canvas, vCard, { errorCorrectionLevel: 'H' , width: 200 }, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('QR generado!');
      }
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${baseUrl}/Profile/${id}`);
        if (!response.ok) throw new Error("Perfil no encontrado");

        const data = await response.json();
        setProfile(data);
        setProfileUrl(data.profileUrl);
        setBackgroundUrl(data.background);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);


  useEffect(() => {
    if (profile) {
      generateQRCode();
    }
  }, [profile]);



  if (loading) return <p className="text-center text-black mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Función para abrir/cerrar el menú en móvil
  };
  const handleShare = () => {
    const phoneNumber = profile.phoneNumber;
    if (phoneNumber) {
      const whatsappLink = `https://wa.me/${phoneNumber}`;
      window.open(whatsappLink, '_blank');
    }
  };

  const addToGoogleWallet = async () => {
    try {
      let jwt = await WalletService.createGooglePass(profile); // ahora sí es el string correcto
      console.log("jwt", jwt);
  
      // Abre el link en una nueva pestaña
      const link = document.createElement('a');
      link.href = `${jwt}`;
      link.target = '_blank';
      link.click();
    } catch (error) {
      console.error('Error adding to Google Wallet:', error);
    }
  }


  const addToAppleWallet = async () => {
    let response = await WalletService.createApplePass(profile);

    // Verifica que la respuesta sea correcta
    if (response.ok) {
      // Usa response.blob() para leer el cuerpo como un Blob
      const blob = await response.blob();

      // Ahora crea un enlace de descarga a partir del Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ApplePass.pkpass"; // Nombre del archivo a descargar
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Limpia el DOM después de la descarga
    } else {
      console.error('Error al recibir el archivo');
    }
  };


  const handleAddContact = () => {

  };
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert("¡URL copiada al portapapeles!");
      })
      .catch((err) => {
        console.error("Error al copiar la URL: ", err);
        alert("Hubo un error al copiar la URL.");
      });
  };


  return (
    <div
      style={{
        backgroundImage: `url(${backgroundUrl || background})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}

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
     <nav className="menu-superior flex items-center justify-between h-16 px-4 w-full">
        <img className="h-10" src={logo} alt="Logo" />
        
        {/* Menú en dispositivos grandes */}
        <div className="menu">
          <button className="btn" onClick={handleCopyLink}>Link</button>
          <button className="btn">Instalar</button>
          <button className="btn" onClick={handleAddContact}>Agregar</button>
          <button className="btn" onClick={handleShare}>Compartir</button>
        </div>

        {/* Menú Hamburguesa */}
        <div className="menu-hamburguesa">
          <button onClick={toggleMenu} className="btn">
            ☰
          </button>
          {menuOpen && (
            <ul>
              <li><button className="btn" onClick={handleCopyLink}>Link</button></li>
              <li><button className="btn">Instalar</button></li>
              <li><button className="btn" onClick={handleAddContact}>Agregar</button></li>
              <li><button className="btn" onClick={handleShare}>Compartir</button></li>
            </ul>
          )}
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
            {/* Íconos debajo del cargo */}
            <div className="flex justify-center items-center mt-4" style={{ gap: '20px' }}>
              {profile?.linkedInUrl && (
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="text-white text-3xl hover:text-blue-400 transition"
                >
                  <FaLinkedin />
                </a>
              )}

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  title="Mensaje de texto"
                  className="text-white text-3xl hover:text-yellow-300 transition"
                >
                  <FiMail />
                </a>
              )}
              {profile?.phoneNumber && (
                <a
                  href={`tel:${profile.phoneNumber}`}
                  title="Llamar"
                  className="text-white text-3xl hover:text-green-400 transition"
                >
                  <FiPhone />
                </a>
              )}

              {profile?.phoneNumber && (
                <a
                  href={`https://wa.me/${profile.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  className="text-white text-3xl hover:text-green-500 transition"
                >
                  <FaWhatsapp />
                </a>
              )}
            </div>




            <p className="profile-description mt-2">{profile?.description}</p>

            {/* Botones debajo de la descripción */}
            <div className="button-container mt-0">
              <a href={profile?.websiteUrl} className="button" target="_blank" rel="noopener noreferrer">Pagina Web</a>
              <a href={profile?.linkedInUrl} className="button" target="_blank" rel="noopener noreferrer">Linkedin Slin</a>
              <a href={profile?.facebookUrl} className="button" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>

            {/* Muestra el código QR directamente aquí */}
            {profileUrl && (
              // <div className="qr-container">
              //   <QRCodeCanvas value={profileUrl} size={100} className="qr-code" />
              //   <p className="text-white mt-4">Escanea el código QR para acceder al perfil.</p>
              // </div>

              <div style={{ minWidth: '20%', marginTop: '10px' }}>
                <div>
                  <canvas ref={qrcodeCanvasRef} style={{ width: '30px', height: '30x' }} ></canvas>

                </div>
                <div className="wallet-buttons">
                  <button className="wallet-button" onClick={addToGoogleWallet}>
                    <img src="/google-wallet.svg" width="280" height="60" alt="Google Wallet" />
                  </button>

                  <button className="wallet-button" onClick={addToAppleWallet}>
                    <img src="/apple-logo-esp.svg" width="280" height="60" alt="Apple Wallet" />
                  </button>
                </div>
              </div>

            )}

            {/* 
            <div style={{ minWidth: '20%', marginTop: '-40px' }}>
              <div>
                <canvas ref={QRCodeCanvas}></canvas>
              </div>
              <button className="image-button" onClick={addToGoogleWallet}>
                <img
                  src="https://pe-userservices-dev.pwcglb.com/Content/Image/Profile/google.png"
                  width="135"
                  height="30"
                  alt="Botón de Imagen"
                />
              </button>
              <button className="image-button" onClick={addToAppleWallet}>
                <img
                  src="https://pe-userservices-dev.pwcglb.com/Content/Image/Profile/apple.png"
                  width="135"
                  height="30"
                  alt="Botón de Imagen"
                />
              </button>
            </div> */}

          </div>
        </section>
      </main>

      {/* Botones debajo de la descripción */}
      {/* <div className="button-container mt-2">
        <a href={profile?.websiteUrl} className="button" target="_blank" rel="noopener noreferrer">Pagina Web</a>
        <a href={profile?.linkedInUrl} className="button" target="_blank" rel="noopener noreferrer">Linkedin Slin</a>
        <a href={profile?.facebookUrl} className="button" target="_blank" rel="noopener noreferrer">Facebook</a>
      </div> */}

    </div>

  );
};

export default ProfilePage;
