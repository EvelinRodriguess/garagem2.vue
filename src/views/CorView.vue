<script setup>
import { ref, reactive, onMounted } from "vue";
import CorApi from "@/api/cor";
const corApi = new CorApi();

const defaultCategoria = { id: null, descricao: "" };
const cor = ref([]);
const categoria = reactive({ ...defaultCategoria });

onMounted(async () => {
  cor.value = await corApi.buscarTodasAsCor();
});

function limpar() {
  Object.assign(categoria, { ...defaultCategoria });
}

async function salvar() {
  if (categoria.id) {
    await corApi.atualizarCategoria(categoria);
  } else {
    await corApi.adicionarCategoria(categoria);
  }
  cor.value = await corApi.buscarTodasAsCor();
  limpar();
}

function editar(categoria_para_editar) {
  Object.assign(categoria, categoria_para_editar);
}

async function excluir(id) {
  await corApi.excluirCategoria(id);
  cor.value = await corApi.buscarTodasAsCor();
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
    <li v-for="categoria in cor" :key="categoria.id">
      <span @click="editar(categoria)">
        ({{ categoria.id }}) - {{ categoria.descricao }} -
      </span>
      <button @click="excluir(categoria.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
