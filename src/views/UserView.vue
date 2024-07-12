<script setup>
import { ref, reactive, onMounted } from "vue";
import UserApi from "@/api/user";
const userApi = new UserApi();

const defaultCategoria = { id: null, descricao: "" };
const user = ref([]);
const categoria = reactive({ ...defaultCategoria });

onMounted(async () => {
  user.value = await userApi.buscarTodasAsUser();
});

function limpar() {
  Object.assign(categoria, { ...defaultCategoria });
}

async function salvar() {
  if (categoria.id) {
    await userApi.atualizarCategoria(categoria);
  } else {
    await userApi.adicionarCategoria(categoria);
  }
  user.value = await userApi.buscarTodasAsUser();
  limpar();
}

function editar(categoria_para_editar) {
  Object.assign(categoria, categoria_para_editar);
}

async function excluir(id) {
  await userApi.excluirCategoria(id);
  user.value = await userApi.buscarTodasAsUser();
  limpar();
}
</script>

<template>
  <h1>Categoria</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="categoria in user" :key="categoria.id">
      <span @click="editar(categoria)">
        ({{ categoria.id }}) - {{ categoria.descricao }} -
      </span>
      <button @click="excluir(categoria.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
