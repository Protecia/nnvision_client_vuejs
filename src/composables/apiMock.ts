import axiosInstance from '@/composables/useAxios';
import MockAdapter from 'axios-mock-adapter';


const ENV_MODE: string = import.meta.env.VITE_ENV_MODE

// Activez les mocks uniquement en environnement de développement
if (ENV_MODE === 'dev') {
    const mock = new MockAdapter(axiosInstance);

    // Exemple : simulation de l'authentification
    mock.onPost('login/').reply((config) => {
        const {username, password} = JSON.parse(config.data);
        if (username === 'demo' && password === 'demo') {
            return [200, {token: 'fake-token'}];
        }
        return [401, {error: 'Identifiants invalides'}];
    });

    // Autres endpoints simulés
    mock.onGet('logout/').reply(200, {message: 'Déconnexion réussie'});
    mock.onGet('user/').reply(200, {
      username: 'JD',
      email: 'john.doe@world.com',
      first_name: 'John',
      last_name: 'Doe'});

}
