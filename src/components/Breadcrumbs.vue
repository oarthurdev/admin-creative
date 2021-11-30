<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs align="right">
      <q-breadcrumbs-el label="Dashboard" icon="home" to="/dashboard" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/profile'" label="Profile" icon="people" to="/profile" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/staff/register'" label="Staff" icon="manage_accounts" to="/staff" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/staff/register'" label="Register" icon="add" to="/staff/register" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/staff/manage'" label="Staff" icon="manage_accounts" to="/store" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/staff/manage'" label="Manage" icon="settings" to="/staff/register" />
    </q-breadcrumbs>
  </div>
</template>
<script>
export default {
  name: 'Breadcumbs'
}
</script>