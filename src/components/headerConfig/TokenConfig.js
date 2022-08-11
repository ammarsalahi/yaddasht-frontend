import Cookies from 'js-cookie';
const config={headers:{'Authorization':'Token '+localStorage.getItem('token-auth'),}};
export default config;