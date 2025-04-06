import React from "react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-800">
      {/* Fondo con opacidad */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

      {/* Tarjeta del perfil */}
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-lg text-center z-10">
        <img
          src={profile.imageUrl || "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md"
        />

        <h2 className="text-xl font-semibold mt-4 text-gray-900">holaaa{profile.name}</h2>
        <p className="text-gray-600">{profile.position}</p>
        <p className="text-gray-500 mt-2">{profile.description}</p>

        <div className="flex justify-center space-x-4 mt-4">
          {profile.profileUrl && (
            <a href={profile.profileUrl} className="text-blue-600 hover:text-blue-800">
              🌍 Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
