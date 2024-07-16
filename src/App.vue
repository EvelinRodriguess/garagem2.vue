<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
  <header>
    <router-link :to="{ name: 'home' }">Home</router-link> |
  
    <div v-if="authStore.loggedIn">
    <router-link  to="/logout">Logout</router-link> |
      {{ authStore.user.email }}
    </div>
    <router-link to="/categorias">Categorias</router-link> |
    <router-link  to="/acessorios">Acessórios</router-link> |
    <router-link  to="/marca">Marcas</router-link> |
    <router-link  to="/cor">Cores</router-link> |
    <router-link  to="/login">Login</router-link> |
  </header>
  <main>
    <RouterView />
  </main>
</template>
