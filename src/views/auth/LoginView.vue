<template>
    <PrimeCard>
        <template #title>Iniciar sesión</template>
        <template #content>
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="field">
                    <label for="username">Usuario</label>
                    <InputText
                        id="username"
                        v-model="form.username"
                        type="text"
                        placeholder="ej. admin.arka"
                        fluid
                        required
                    />
                </div>

                <div class="field">
                    <label for="password">Contraseña</label>
                    <Password
                        id="password"
                        v-model="form.password"
                        :feedback="false"
                        fluid
                        required
                    />
                </div>

                <Message v-if="errorMsg" severity="error" :closable="false">{{ errorMsg }}</Message>

                <PrimeButton type="submit" label="Ingresar" :loading="loading" fluid />
            </form>
        </template>
    </PrimeCard>
</template>

<script>
import { mapActions } from 'pinia';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { useAuthStore } from '@/stores/auth';
import { useTenantStore } from '@/stores/tenant';

export default {
    name: 'LoginView',
    components: {
        PrimeCard: Card,
        InputText,
        Password,
        PrimeButton: Button,
        Message
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            loading: false,
            errorMsg: ''
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),
        ...mapActions(useTenantStore, ['loadAccountConfig']),
        async handleLogin() {
            this.loading = true;
            this.errorMsg = '';
            try {
                const response = await this.login(this.form);
                this.loadAccountConfig(response.account_key);
                this.$router.push({ name: useTenantStore().defaultRouteName });
            } catch (err) {
                this.errorMsg =
                    err.response?.data?.message || err.message || 'Credenciales inválidas';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
</style>
