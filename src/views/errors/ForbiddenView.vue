<template>
    <div class="error-page">
        <h2>403 — Acceso no autorizado</h2>
        <p>No tienes permisos o este módulo no está habilitado para tu cuenta.</p>
        <PrimeButton label="Volver al panel" @click="$router.push({ name: 'example-list' })" />
    </div>
</template>

<script>
import Button from 'primevue/button'

export default {
    name: 'ForbiddenView',
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
