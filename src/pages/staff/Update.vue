<template>
<center>
                <q-card-section>
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
                     <q-btn round color="secondary" @click="dialog = true; 
                                                            store_id = stores.store_id; 
                                                            store_update.name = stores.name
                                                            store_update.phone = stores.phone
                                                            store_update.address.cep = stores.zipcode
                                                            store_update.address.bairro = stores.neighborhood
                                                            store_update.address.numero = stores.number
                                                            store_update.address.street = stores.street
                                                            store_update.address.complement = stores.complement
                                                            store_update.address.cidade = stores.city
                                                            store_update.address.estado = stores.state
                                                            store_update.description = stores.description
                                                            store_items = stores.product" 
                                                            icon="edit" class="margin-right">
                        <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate">
                        Edit
                        </q-tooltip>
                    </q-btn>
                    <q-btn round color="primary" icon="power_settings_new" @click="confirm = true; store_id = stores.store_id; store_update.name = stores.name">
                        <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate">
                        Connect
                        </q-tooltip>
                    </q-btn>
                    <div class="col-12 col-md-auto">
                        <q-dialog
                        v-model="dialog"
                        persistent
                        :maximized="maximizedToggle"
                        transition-show="slide-up"
                        transition-hide="slide-down"
                        >
                        <q-card class="bg-primary text-white">
                            <q-bar>
                            <q-space />

                            <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
                            </q-btn>
                            <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
                            </q-btn>
                            <q-btn dense flat icon="close" v-close-popup>
                                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                            </q-btn>
                            </q-bar>

                            <q-card-section>
                            <div class="text-h6">Edit <b>{{stores.name}}</b></div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <q-form>
                                    <!-- <q-input
                                        filled
                                        v-model="store_id"
                                        label="Store id"
                                        disable
                                        class="margin-bottom"
                                    /> -->
                                    <q-input
                                        filled
                                        v-bind:placeholder="stores.name"
                                        v-model="store_update.name"
                                        label="Store name"
                                        class="margin-bottom"
                                        disable
                                    />
                                    <q-input
                                        filled
                                        v-model="store_update.description"
                                        label="Store description"
                                        class="margin-bottom"
                                    />
                                    
                                    <div class="row">
                                        <div class="col">
                                            <q-input
                                                ref="storea"
                                                filled
                                                v-model="store_update.address.cep"
                                                label="CEP"
                                                for="cep"
                                                mask="#####-###"
                                                style="max-width: 250px; float: left; margin-bottom: 10px;"
                                                v-on:blur="getCepInfos(store_update.address.cep)"
                                                />
                                            </div>
                                        </div>
                                        <div class="row">
                                        <div class="col">
                                            <q-input
                                            ref="storelog"
                                            filled
                                            v-model="store_update.address.street"
                                            label="Logradouro"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                            <q-input
                                            ref="storenum"
                                            filled
                                            v-model="store_update.address.numero"
                                            label="Numero"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                            <q-input
                                            ref="storecomp"
                                            filled
                                            v-model="store_update.address.complement"
                                            label="Complemento"
                                            style="margin-bottom: 10px;"
                                            />
                                        </div>
                                        </div>
                                    <div class="row">
                                        <div class="col">
                                        <q-input
                                            ref="storebair"
                                            filled
                                            v-model="store_update.address.bairro"
                                            label="Bairro"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                        <q-input
                                            ref="storecid"
                                            filled
                                            v-model="store_update.address.cidade"
                                            label="Cidade"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                        <q-input
                                            ref="storeest"
                                            filled
                                            v-model="store_update.address.estado"
                                            label="Estado"
                                            style="margin-bottom: 10px;"
                                            />
                                        </div>
                                    </div>

                                    <q-input
                                        filled
                                        v-model="store_update.phone"
                                        label="Store Phone"
                                        mask="(##) ##### - ####"
                                        class="margin-bottom"
                                    />
                                    <picture-input 
                                        ref="pictureInput" 
                                        @change="onChange" 
                                        width="200" 
                                        height="200" 
                                        margin="16" 
                                        accept="image/jpeg,image/png" 
                                        size="10" 
                                        style="margin-top: 100px;"
                                        class="margin-bottom"
                                        buttonClass="btn"
                                        :customStrings="{
                                        upload: '<h1>Bummer!</h1>',
                                        drag: 'Choose a new picture'
                                        }">
                                    </picture-input>
                                    <div>
                                        <q-btn class="float-right" style="margin-bottom: 10px;" v-on:click="editStore" label="Edit" type="submit" color="primary"/>
                                    </div>
                                </q-form>
                            </q-card-section>
                        </q-card>
                        </q-dialog>
                    </div>
                </q-card-section>
            </center>
</template>