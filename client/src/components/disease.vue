<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title class="headline" style="background: #cccccc;">
            {{ title }}
          </v-card-title>
          <v-card-text>
            <v-fade-transition mode="out-in">
              <div v-if="descLoading" key="loader" class="flex-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
              <p v-else key="description">
                  {{ diseaseData.description }}
              </p>
            </v-fade-transition>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-fade-transition>
        <template v-if="!descLoading">
          <v-container grid-list-md class="px-0">
            <v-layout row wrap>
              <v-flex xs12 md6 d-flex>
                <v-card class="px-0">
                  <v-card-title primary-title class="red darken-2 white--text">
                      <h4 class="headline">Treatment</h4>
                    </v-card-title>
                    <v-divider light></v-divider>
                    <v-card-text>
                      {{ diseaseData.treatement }}
                    </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md6 d-flex>
                <v-card class="px-0">
                  <v-card-title primary-title class="red darken-2 white--text">
                    <h4 class="headline">Symptoms</h4>
                  </v-card-title>
                  <v-divider light></v-divider>
                  <v-card-text>
                      <v-list>
                        <v-list-tile
                          v-for="symptom in symptoms"
                          :key="symptom"
                        >
                          <v-list-tile-action>
                            <v-icon color="orange lighten-2">star</v-icon>
                          </v-list-tile-action>

                          <v-list-tile-content>
                            <v-list-tile-title>{{ symptom }}</v-list-tile-title>
                          </v-list-tile-content>

                        </v-list-tile>
                      </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 mt-4>
                <v-card class="px-0">
                  <v-card-title primary-title class="red darken-2 white--text">
                    <h4 class="headline">Doctors you should visit</h4>
                  </v-card-title>
                  <v-divider light></v-divider>
                  <v-card-text>
                      <v-list>
                        <v-list-tile
                          v-for="specialist in specialisation"
                          :key="specialist"
                        >
                          <v-list-tile-action>
                            <v-icon color="orange lighten-2">star</v-icon>
                          </v-list-tile-action>

                          <v-list-tile-content>
                            <v-list-tile-title>{{ specialist.Name }}</v-list-tile-title>
                          </v-list-tile-content>

                        </v-list-tile>
                      </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </template>
      </v-fade-transition>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id', 'title', 'specialisation'],
  data() {
    return {
      diseaseData: {},
      descLoading: false
    }
  },
  computed: {
    symptoms() {
      return this.diseaseData.symptoms.split(',')
    }
  },
  created() {
    this.descLoading = true
    const self = this
    axios(`/api/disease/${this.id}`).then(({ data }) => {
      self.descLoading = false
      self.diseaseData = data
    })
  }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
}
</style>
