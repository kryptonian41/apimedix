<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title class="headline">
            {{ data.title }}
          </v-card-title>
          <v-card-text>
            {{ diseaseData.description }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  props: ['data'],
  data() {
    return {
      diseaseData: {}
    }
  },
  methods: {
    getDiseaseInfo() {
      axios(`/api/disease/${id}`).then()
    }
  },
  mounted() {
    const self = this
    axios(`/api/disease/${this.data.id}`).then(
      ({ data }) => (self.diseaseData = data)
    )
  }
}
</script>

<style>
</style>
