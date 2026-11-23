<template>
    <div class="error-page">
        <h2>404 — Página no encontrada</h2>
        <p>La ruta solicitada no existe.</p>
        <PrimeButton label="Ir al inicio" @click="$router.push({ name: 'example-list' })" />
    </div>
</template>

<script>
import Button from 'primevue/button'

export default {
    name: 'NotFoundView',
    components: {
        PrimeButton: Button
    }
}
</script>

<style scoped>
.error-page {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}
</style>
