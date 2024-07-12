<script setup>
import { ref, reactive, onMounted } from "vue";
import MarcaApi from "@/api/marca";
const marcaApi = new MarcaApi();

const defaultCategoria = { id: null, descricao: "" };
const marca = ref([]);
const categoria = reactive({ ...defaultCategoria });

onMounted(async () => {
  marca.value = await marcaApi.buscarTodasAsMarca();
});

function limpar() {
  Object.assign(categoria, { ...defaultCategoria });
}

async function salvar() {
  if (categoria.id) {
    await marcaApi.atualizarCategoria(categoria);
  } else {
    await marcaApi.adicionarCategoria(categoria);
  }
  marca.value = await marcaApi.buscarTodasAsMarca();
  limpar();
}

function editar(categoria_para_editar) {
  Object.assign(categoria, categoria_para_editar);
}

async function excluir(id) {
  await marcaApi.excluirCategoria(id);
  marca.value = await marcaApi.buscarTodasAsMarca();
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
    <li v-for="categoria in marca" :key="categoria.id">
      <span @click="editar(categoria)">
        ({{ categoria.id }}) - {{ categoria.descricao }} -
      </span>
      <button @click="excluir(categoria.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
