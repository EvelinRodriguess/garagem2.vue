import axios from "axios";
export default class CorsApi {
  async buscarTodasAsCors() {
    const { data } = await axios.get("/cors/");
    return data.results;
  }
  async adicionarCor(cor) {
    const { data } = await axios.post("/cors/", cor);
    return data.results;
  }
  async atualizarCor(cor) {
    const { data } = await axios.put(`/cors/${cor.id}/`, cor);
    return data.results;
  }
  async excluirCor(id) {
    const { data } = await axios.delete(`/cors/${id}/`);
    return data.results;
  }
}
