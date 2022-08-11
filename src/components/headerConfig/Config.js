import Cookies from 'js-cookie';
const config={ headers:{ 'X-CSRFToken':Cookies.get('csrftoken')}};
export default config;