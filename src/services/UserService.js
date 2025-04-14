const baseUrl = process.env.REACT_APP_API_URL;
export const UserService = {
    async getUsers() {
      const response = await fetch(`${baseUrl}/User`);
      if (!response.ok) throw new Error('Error al obtener usuarios');
      return await response.json();
    },
  
    async deleteUser(id) {
      const response = await fetch(`${baseUrl}/User/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      return true;
    },
  
    async updateUser(id, userData) {
      const response = await fetch(`${baseUrl}/User/${id}`, {
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