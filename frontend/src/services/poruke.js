import axios from 'axios'
const osnovniUrl = 'http://localhost:3001/api/poruke'

const dohvatiSve = () => {
    return axios.get(osnovniUrl);
}

export default {
    dohvatiSve: dohvatiSve,
}