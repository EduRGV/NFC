const baseUrl = "http://54.242.76.106:5000/api";
// const baseUrl = process.env.REACT_APP_API_URL;
export const WalletService = {
    async createGooglePass(profile) {
      const response = await fetch(`${baseUrl}/Billetera/google` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profile)
      });
      if (!response.ok) throw new Error('Error al obtener pase google');
      return await response.text();
    },
    async createApplePass(profile) {
      let response = null;
    
      try {
        response = await fetch(`${baseUrl}/Billetera/apple`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profile)
        });
      } catch (error) {
        console.error('Error de red o del servidor:', error);
        throw new Error('No se pudo conectar con el servidor.');
      }
    
      console.log("response", response);
    
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Respuesta con error del servidor:', errorText);
        throw new Error('Error al obtener pase profile');
      }
    
      return response;
    }
    

  };