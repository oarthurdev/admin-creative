<template>
<div class="q-pa-md row items-start q-gutter-md">
 <q-card flat bordered class="card-update-profile">
    <center>
      <q-card-section>
        <div class="text-h6" style="margin-bottom: 20px;">Register a Staff Member</div>
        <q-form
      @submit="submit"
      class="q-gutter-md"
    >
    <div class="row">
      <div class="col">
        <q-input
          ref="staffN"
          filled
          v-model="staff.name"
          label="Name"
          :rules="[
            val => !!val || '* Field Required'
          ]"
          lazy-rules
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
          ref="staffNN"
          filled
          v-model="staff.nickname"
          label="Nickname"
          :rules="[
            val => !!val || '* Field Required'
          ]"
          lazy-rules
        />
      </div>
    </div>


    <div class="row">
      <div class="col">
        <q-input
        ref="staffU"
        v-model="staff.email"
        filled
        label="Email"
        :rules="[
            val => !!val || '* Field Required'
          ]"
        lazy-rules
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
        ref="staffP"
        v-model="staff.password"
        type="password"
        filled
        label="Password"
        :rules="[
            val => !!val || '* Field Required'
          ]"
        lazy-rules
        />
      </div>
    </div>

   <q-select
      filled
      v-model="staff.items"
      :options="options"
      use-chips
      stack-label
      label="Role"
      style="margin-bottom: 30px;"
    />

    <div>
      <q-btn class="float-right" style="margin-bottom: 10px;" v-on:click="submit" label="Submit" type="submit" color="primary"/>
    </div>
    </q-form>
  </q-card-section>
    </center>
  </q-card> 
</div>
</template>
<script>
import Vue from 'vue'
import 'vue-search-select/dist/VueSearchSelect.css'
import _ from 'lodash'
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import cep from 'cep-promise'

Vue.use(VueTelInput)
Vue.use(VuePlaceAutocomplete);

export default {
  name: 'Register',
  data () {
    return {
      user: {
        email: null
      },
      staff: {
        email: null,
        account: null,
        password: null,
        nickname: null,
        role: null,
        items: null
      },
      options: []
    }
  },
  mounted () {
    let self = this
      const vm = this

      vm.$axios.get('/api/role/get-all').then(function (result) {
        if (result.data) {
          vm.options = result.data
        }
    })
  },
  created () {
    let vm = this
    vm.user.email = localStorage.getItem('name')

    vm.$axios
        .get('/api/user/get-photo')
        .then(function (result) {
          if (result.data) {
            vm.user.photo = result.data.profile_picture
          } else {
            console.log('Error')
          }
        })
    vm.$axios
        .get('/api/user/get-role')
        .then(function (result) {
          if (result.data) {
            vm.user.role = result.data.role_name
          } else {
            console.log('Error')
          }
        })
  },
  methods: {
    submit (e) {
      let vm = this
      e.preventDefault()
      if(this.$refs.staffU.validate() &&
         this.$refs.staffN.validate() &&
         this.$refs.staffP.validate() &&
         this.$refs.staffNN.validate()) {

      let promise = this.$axios
        .post('/api/staff/register', {name: vm.staff.name, nickname: vm.staff.nickname, email: vm.staff.email, password: vm.staff.password, role: vm.staff.items})
        .then(function (result) {
          if (result.data.exist) {
              vm.$q.notify({
                  color: 'negative',
                  message: '<b>' + vm.staff.email + '</b> is already registered, try another.',
                  html: true
              })
          }
          else if (result.data) {
            vm.$q.notify({
                color: 'positive',
                message: '<b>' + vm.staff.email + '</b> has registered successfully.',
                html: true
            })
          } 
        })
        }
    },
    onSelect (items, lastSelectItem) {
      this.items = items
      this.lastSelectItem = lastSelectItem
    },
    onChange (image) {
      if (image) {
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    selectFromParentComponent () {
      this.items = _.unionWith(this.items, [this.product[0]], _.isEqual)
    }
  }
}
</script>
<style scoped>
.img-profile {
  border-radius: 50%;
  width: 120px;
  height: 120px;
}

.q-card {
  max-width: 600px;
  width: 500px;
  margin-left: 10px;
}

.card-update-profile {
  min-width: 1100px;
}
</style>