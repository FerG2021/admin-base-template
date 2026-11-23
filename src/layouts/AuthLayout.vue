<template>
    <div class="auth-layout">
        <main class="auth-container">
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: 'AuthLayout'
}
</script>

<style scoped>
.auth-layout {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background-color: #f4f6f9;
}

.auth-container {
    width: 100%;
    max-width: 440px;
}
</style>
