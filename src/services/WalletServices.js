const baseUrl = "http://54.242.76.106:5000/api";
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
      try {
        const response = await fetch(`${baseUrl}/Billetera/apple`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });
      } catch (error) {
        console.log(error,"error")
      }

      console.log("response", response)

      if (!response.ok) throw new Error('Error al obtener pase profile');
      return await response;
    },

  };