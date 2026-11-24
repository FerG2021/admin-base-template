<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
    name: 'CrudFormDialog',
    components: {
        PrimeButton: Button,
        PrimeDialog: Dialog
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: 'create',
            validator: (value) => ['create', 'edit'].includes(value)
        },
        title: {
            type: String,
            default: ''
        },
        submitLabel: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:visible', 'submit'],
    computed: {
        dialogTitle() {
            return this.title || (this.mode === 'edit' ? 'Modificar registro' : 'Crear registro');
        },
        buttonLabel() {
            return (
                this.submitLabel || (this.mode === 'edit' ? 'Guardar cambios' : 'Crear registro')
            );
        }
    }
};
</script>

<template>
    <PrimeDialog
        :visible="visible"
        :header="dialogTitle"
        modal
        :style="{ width: 'min(36rem, 95vw)' }"
        @update:visible="$emit('update:visible', $event)"
    >
        <form class="crud-form" @submit.prevent="$emit('submit')">
            <slot />
            <div class="dialog-actions">
                <PrimeButton
                    label="Cancelar"
                    severity="secondary"
                    text
                    type="button"
                    @click="$emit('update:visible', false)"
                />
                <PrimeButton
                    :label="buttonLabel"
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
                />
            </div>
        </form>
    </PrimeDialog>
</template>

<style scoped>
.crud-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
</style>
