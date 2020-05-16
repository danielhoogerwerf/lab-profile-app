import axios from 'axios'

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5500',
      withCredentials: true
    })
    //this.service = service
  }

  upload = (image) => {
    return this.service.post('/upload', {image})
    .then (response => response.data)
  }

  edit = (campus, course, image) => {
    return this.service.post('/auth/editprofile', {campus, course, image})
    .then(response => response.data)
  }

}

export default UserService