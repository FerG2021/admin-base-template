<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    name: 'DataTable',
    components: {
        PrimeButton: Button,
        PrimeCard: Card,
        PrimeDataTable: DataTable,
        Column
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        headerProps: {
            type: Array,
            default: () => []
        },
        allowCreate: {
            type: Boolean,
            default: false
        },
        allowEdit: {
            type: Boolean,
            default: false
        },
        allowDelete: {
            type: Boolean,
            default: false
        },
        emptyMessage: {
            type: String,
            default: 'No hay registros para mostrar.'
        }
    },
    emits: ['create', 'edit', 'delete'],
    methods: {
        editItem(item) {
            this.$emit('edit', item);
        },
        deleteItem(item) {
            this.$emit('delete', item);
        }
    }
};
</script>

<template>
    <PrimeCard class="data-table-container">
        <template #title>{{ title }}</template>
        <template #subtitle>{{ subtitle }}</template>
        <template #content>
            <div v-if="allowCreate || $slots.toolbar" class="table-toolbar">
                <slot name="toolbar" />
                <PrimeButton
                    v-if="allowCreate"
                    label="Crear"
                    icon="pi pi-plus"
                    @click="$emit('create')"
                />
            </div>

            <PrimeDataTable
                :value="items"
                :loading="loading"
                paginator
                stripedRows
                scrollable
                tableStyle="min-width: 40rem"
            >
                <Column
                    v-for="column in headerProps"
                    :key="column.field"
                    :header="column.header"
                    :field="column.field"
                >
                    <template #body="{ data }">
                        <slot
                            :name="`cell-${column.field}`"
                            :data="data"
                            :value="data[column.field]"
                        >
                            {{ data[column.field] }}
                        </slot>
                    </template>
                </Column>

                <Column v-if="allowEdit || allowDelete" header="Acciones">
                    <template #body="{ data }">
                        <div class="row-actions">
                            <PrimeButton
                                v-if="allowEdit"
                                icon="pi pi-pencil"
                                text
                                rounded
                                aria-label="Editar registro"
                                @click="editItem(data)"
                            />
                            <PrimeButton
                                v-if="allowDelete"
                                icon="pi pi-trash"
                                text
                                rounded
                                severity="danger"
                                aria-label="Eliminar registro"
                                @click="deleteItem(data)"
                            />
                        </div>
                    </template>
                </Column>

                <template #empty>{{ emptyMessage }}</template>
            </PrimeDataTable>
        </template>
    </PrimeCard>
</template>

<style lang="scss" scoped>
.data-table-container {
    height: 100%;
}

.table-toolbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.row-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}
</style>
