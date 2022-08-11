import Cookies from 'js-cookie';
const config={ headers:{'X-CSRFToken':Cookies.get('csrftoken'),'Authorization':'Token '+localStorage.getItem('token-auth'),}};
export default config;