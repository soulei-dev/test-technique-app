import axios, { AxiosError, AxiosResponse } from 'axios';
import { Alert, Platform } from 'react-native';

export const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'
  : 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  async (response: AxiosResponse): Promise<AxiosResponse> => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      typeof error.response?.data === 'string'
        ? error.response.data
        : (error.response?.data as any)?.message;

    if (status) {
      switch (status) {
        case 400:
          Alert.alert('Erreur de requête', message || 'Requête incorrecte');
          break;

        case 404:
          Alert.alert('Introuvable', message || 'Ressource non trouvée');
          break;

        case 500:
          Alert.alert(
            'Erreur serveur',
            "Une erreur inconnue s'est produite. Veuillez réessayer plus tard.",
          );
          break;
        default:
          Alert.alert('Erreur', message || 'Une erreur est survenue');
      }
    }

    return Promise.reject(error);
  },
);

export default api;
