<template>
  <v-app style="background: transparent;">
    <v-navigation-drawer
      persistent
      clipped
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <router-link to="/mapdocs" tag="div">
          <v-list-tile
            value="true"
            v-for="(item, i) in items"
            :key="i"
            style="cursor: pointer;"
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      dark
      color="indigo darken-4"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" tag="div" style="cursor: pointer;">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat icon color="white" to="/">
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
        <v-slide-y-reverse-transition mode="out-in" appear>
          <router-view/>
        </v-slide-y-reverse-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Nearby Health Centers'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Medix'
    }
  },
  name: 'App'
}
</script>

<style>
body {
  background: url('/static/bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
