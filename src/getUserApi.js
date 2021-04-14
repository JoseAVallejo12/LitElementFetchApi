import axios from 'axios';
const litServices = (() => {
  const services = {}
  services.apiService = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
  }
  return service
})
export default litServices;