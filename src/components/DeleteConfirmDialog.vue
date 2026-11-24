<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
    name: 'DeleteConfirmDialog',
    components: {
        PrimeButton: Button,
        PrimeDialog: Dialog
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Confirmar eliminación'
        },
        message: {
            type: String,
            default: '¿Seguro que deseas eliminar este registro?'
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:visible', 'confirm']
};
</script>

<template>
    <PrimeDialog
        :visible="visible"
        :header="title"
        modal
        :style="{ width: 'min(30rem, 95vw)' }"
        @update:visible="$emit('update:visible', $event)"
    >
        <p>{{ message }}</p>
        <template #footer>
            <PrimeButton
                label="Cancelar"
                severity="secondary"
                text
                :disabled="loading"
                @click="$emit('update:visible', false)"
            />
            <PrimeButton
                label="Eliminar"
                severity="danger"
                :loading="loading"
                :disabled="loading"
                @click="$emit('confirm')"
            />
        </template>
    </PrimeDialog>
</template>
