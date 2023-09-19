import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3030' //base da API
    /* ##### ATENCAO #####
    Execute o seguinte comando na raiz da aplicação para ligar a fake API:
    json-server --watch db.json --port 3030
    */
});

export default api;