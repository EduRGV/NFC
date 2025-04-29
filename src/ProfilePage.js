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

    QRCode.toCanvas(canvas, vCard, { errorCorrectionLevel: 'H', width: 200 }, (error) => {
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

        console.log("response", response);

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
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${backgroundUrl || background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Helmet>
        <title>{profile ? `${profile.name} - Perfil` : 'Cargando perfil...'}</title>
        <meta name="description" content={profile ? `Perfil de ${profile.name}, ${profile.position}.` : 'Cargando perfil...'} />
        <meta property="og:title" content={profile ? `${profile.name} - Perfil` : 'Perfil'} />
        <meta property="og:description" content={profile ? `Información sobre ${profile.name}.` : 'Perfil de usuario'} />
        <meta property="og:image" content={profile?.imageUrl || '/default-profile.png'} />
        <meta property="og:type" content="profile" />
      </Helmet>

      <nav className="navbar navbar-expand-lg navbar-light bg-white px-3">
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><button className="btn text-black" onClick={handleCopyLink}>Link</button></li>
            <li className="nav-item"><button className="btn text-black">Instalar</button></li>
            <li className="nav-item"><button className="btn text-black" onClick={handleAddContact}>Agregar</button></li>
            <li className="nav-item"><button className="btn text-black" onClick={handleShare}>Compartir</button></li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <section className="bg-dark bg-opacity-75 text-white rounded-4 p-4 shadow w-100" style={{ maxWidth: '500px' }}>
          <div className="text-center">
            <img
              src={profile?.imageUrl || '/default-profile.png'}
              alt={profile?.name || 'Usuario'}
              className="rounded-circle mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <h2>{profile?.name}</h2>
            <h4>{profile?.position}</h4>

            <div className="d-flex justify-content-center gap-3 my-3 flex-wrap">
              {profile?.linkedInUrl && (
                <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                  <FaLinkedin />
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="text-white fs-4">
                  <FiMail />
                </a>
              )}
              {profile?.phoneNumber && (
                <>
                  <a href={`tel:${profile.phoneNumber}`} className="text-white fs-4">
                    <FiPhone />
                  </a>
                  <a href={`https://wa.me/${profile.phoneNumber}`} target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                    <FaWhatsapp />
                  </a>
                </>
              )}
            </div>

            <p>{profile?.description}</p>

            {/* BOTONES EN FILA */}
            <div className="d-flex justify-content-center gap-3 my-3 flex-wrap">
              {profile?.websiteUrl && (
                <a href={profile.websiteUrl} className="btn btn-success" target="_blank" rel="noopener noreferrer">
                  Página Web
                </a>
              )}
              {profile?.linkedInUrl && (
                <a href={profile.linkedInUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {profile?.facebookUrl && (
                <a href={profile.facebookUrl} className="btn btn-secondary text-white" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
            </div>

            {profileUrl && (
              <div className="mt-4">
                <canvas ref={qrcodeCanvasRef} style={{ width: '100px', height: '100px' }}></canvas>

                {/* BOTONES WALLET EN FILA */}
                <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
                  <button
                    onClick={addToGoogleWallet}
                    className="wallet-btn border-0 bg-transparent p-0"
                    style={{ width: '220px', height: '60px' }}
                  >
                    <img
                      src="/google.svg"
                      alt="Google Wallet"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'transparent',
                      }}
                    />
                  </button>

                  <button
                    onClick={addToAppleWallet}
                    className="wallet-btn border-0 bg-transparent p-0"
                    style={{ width: '220px', height: '60px' }}
                  >
                    <img
                      src="/apple-logo-esp.svg"
                      alt="Apple Wallet"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'transparent',
                      }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

    </div>

  );
};

export default ProfilePage;
