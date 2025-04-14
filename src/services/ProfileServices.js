const baseUrl = process.env.REACT_APP_API_URL;

export const ProfileService = {
    async getProfile() {

        console.log("Base URL:", baseUrl); // Verifica que la URL base esté definida

      const response = await fetch(`${baseUrl}/Profile`);
      if (!response.ok) throw new Error('Error al obtener usuarios');
      return await response.json();
    },
  
    async deleteProfile(id) {
      const response = await fetch(`${baseUrl}/Profile/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      return true;
    },
  
    async updateProfile(id, userData) {
      const response = await fetch(`${baseUrl}/Profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Error al actualizar usuario');
      return await response.json();
    }
  };