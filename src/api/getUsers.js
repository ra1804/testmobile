import axios from 'axios';

export default () => axios.get('https://reqres.in/api/users?delay=10?&page=1');
