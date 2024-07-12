import axios from "axios";
export default class UsersApi {
  async buscarTodasAsUsers() {
    const { data } = await axios.get("/users/");
    return data.results;
  }
  async adicionarUser(user) {
    const { data } = await axios.post("/users/", user);
    return data.results;
  }
  async atualizarUser(user) {
    const { data } = await axios.put(`/users/${user.id}/`, user);
    return data.results;
  }
  async excluirUser(id) {
    const { data } = await axios.delete(`/users/${id}/`);
    return data.results;
  }
}
