<template>
    <q-btn round color="red" icon="delete" @click="prompt = true; store_id = stores.store_id; store_update.name = stores.name" class="margin-right">
        <q-tooltip
        transition-show="rotate"
        transition-hide="rotate">
        Delete
        </q-tooltip>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div style="font-size: 13pt;">Please type <b>{{stores.name}}</b> to confirm the deletion.</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                <q-input dense v-model="storeNameConfirm" autofocus @keyup="confirmDelete(storeNameConfirm, store_update.name)"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" @click="cancel" v-close-popup />
                <q-btn flat label="Delete" id="btn_delete" color="red" @click="deleteStore(store_id)" :disabled="disabled" v-close-popup />
                </q-card-actions>
            </q-card>
                <!-- <q-btn flat label="Delete" @click="deleteStore(store_id)" color="red"  v-close-popup /> -->
            </q-dialog>
    </q-btn>
</template>