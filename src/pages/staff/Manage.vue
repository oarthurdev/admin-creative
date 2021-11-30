<template>
<div class="row">
     <div class="col-12 col-md-auto" style="width: 400px; margin-right: 30px; margin-bottom: 30px;" v-for="staffes in staff" v-bind:key="staffes.image">
        <q-card dark bordered class="bg-grey-9 my-card">
            <q-card-section>
                <center>
                    <img v-bind:src="'http://localhost:8081/' + staffes.image" width="150px" height="150px" class="store-image" />
                    <div class="text-h6"><b>{{staffes.nickname}}</b></div>
                    <div class="text-subtitle2">{{staffes.role_name}}</div>
                </center>
            </q-card-section>

            <!-- <q-separator dark inset />

            <center>
                <q-card-section>
                {{stores.street}} {{(stores.number) ? "nº " + stores.number :  null}} - {{stores.neighborhood}}<br />
                {{stores.city}} / {{stores.state}} - {{stores.zipcode}}
                </q-card-section>
            </center> -->

            <q-separator dark inset />
        </q-card>
    </div>
</div>
</template>
<script>
import cep from 'cep-promise'
require('src/functions/string-prototypes')

export default {
  name: 'ManageStaff',
  data () {
    return {
        user: {
            email: null
        },
        staff: {},
        prompt: false,
        user_id: null,
        storeNameConfirm: null,
        disabled: true,
        dialog: false,
        maximizedToggle: true,
        store_update: {
            name: null,
            description: null,
            phone: null,
            address: {
                cep: null,
                numero: null,
                cidade: null,
                estado: null,
                complement: null,
                street: null,
                bairro: null,
            },
            image: null
        },
        store_products: [],
        store_items: [],
        confirm: false,
        staff_id: null,
        role_name: null
    }
  },
  created () {
      this.getAllStore()
  },
  methods: {
      deleteStore (staff_id) {
          const vm = this
          let promise = this.$axios
            .post('/api/staff/delete', {staff_id: staff_id})
            .then(function (result) {
                if (result.data) {
                    vm.$q.notify({
                        color: 'negative',
                        message: '<b>' + result.data.name + '</b> deleted successfully.',
                        html: true
                    })
                    vm.getAllStore()
                    vm.storeNameConfirm = null
                    vm.disabled = true
                }
            })
      },
      cancel () {
          this.storeNameConfirm = null
      },
      confirmDelete (confirmName, nameStore) {
          if (confirmName === nameStore) {
              this.disabled = false
          } else {
              this.disabled = true
          }
      },
      getCepInfos (cepP) {
        let self = this
        cepP = cepP.replace(/[^a-zA-Z0-9]/g, '');
        cep(cepP)
            .then(function (result) {
                console.log(result.status)
                self.store_update.address.street     = result.street
                self.store_update.address.bairro     = result.neighborhood
                self.store_update.address.cidade     = result.city
                self.store_update.address.estado     = result.state
                self.store_update.address.numero     = null
                self.store_update.address.complement = null
            })
            .catch(function (res) {
                if(res) {
                    self.$store.dispatch('error', {position: 'top-left', message: 'CEP não encontrado.'})
                }
                return false
            })
        },
      getAllStore () {
        const self = this
        self.user.email = localStorage.getItem('name')

        this.$axios
        .get('/api/staff/get-all')
        .then(function (result) {
            if (result.data) {
                self.staff = result.data.staff
            }
        })
      },
      criarNome (str) {
          return createSlug(str)
      },
      editStore (e) {
          e.preventDefault()
          const self = this
          let promise = this.$axios.post('/api/lounge/update', {store_id: self.store_id,
                                                            store_update: self.store_update,
                                                            name_file: 'teste.jpg'})
                        .then(function (result) {
                            if (result.data) {
                                const msg = "Store updated successfully."
                                self.$store.dispatch('success', {position: 'bottom-right', message: msg})
                                self.dialog = false
                                setTimeout(() => {
                                    location.reload()
                                    }, 5000)
                            }
                        })
      },
      onChange (image) {
        console.log('New picture selected!')
        if (image) {
            console.log('Picture loaded.')
            this.image = image
        } else {
            console.log('FileReader API not supported: use the <form>, Luke!')
        }
    }
  }
}
</script>
<style scoped>
.my-card {
    width: 100%;
    max-width: 500px;
}
.margin-right {
    margin-right: 5px;
}
.store-image {
    border-radius: 50%;
}
.margin-bottom {
    margin-bottom: 20px;
}
</style>

