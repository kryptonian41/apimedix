<template>
<v-container>
  <v-layout row wrap justify-center>
    <v-flex xs12 md8>
      <v-card>
        <v-card-title primary-title style="background: #ddd;" class="headline">
          <div >
            How are you feeling ?
          </div>
        </v-card-title>
        <v-form @submit.prevent>
          <v-container>
            <v-layout wrap>
              <v-flex xs12>

                <v-autocomplete
                  v-model="selectedSym"
                  :disabled="diagnosing"
                  :items="symptoms"
                  chips
                  color="blue-grey lighten-1"
                  label="Select Symptoms"
                  item-text="Name"
                  item-value="ID"
                  multiple
                >
                  <template
                    slot="selection"
                    slot-scope="data"
                  >
                    <v-chip
                      :selected="data.selected"
                      close
                      class="chip--select-multi"
                      @input="remove(data.item)"
                    >
                      {{ data.item.Name }}
                    </v-chip>
                  </template>
                  <template
                    slot="item"
                    slot-scope="data"
                  >
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.Name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.ID"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="diagnosing"
            color="info"
            depressed
            @click="diagnose"
          >
            Diagnose
          </v-btn>
          <v-btn color="success" to="/docs">See Nearby Doctors</v-btn>
        </v-card-actions>
       </v-card>
    </v-flex>
    <v-flex xs12 md8 class="mt-3">
      <v-slide-y-reverse-transition>
        <v-card v-if="resultPop">
          <v-card-title primary-title class="headline">
            You might be suffering from ...
          </v-card-title>
          <v-expansion-panel
          >
            <v-expansion-panel-content
              v-for="(item, i) in result"
              :key="i"
            >
              <div slot="header">
                <h4>{{ item.Issue.Name }}</h4>
                <p>{{ item.Issue.IcdName }}</p>
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                <v-card-actions class="pa-3">
                  <v-spacer></v-spacer>
                  <v-btn color="success">Read More</v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </v-slide-y-reverse-transition>
      <v-alert type="error" :value="error" outline transition="slide-y-reverse-transition">
        Sorry couldn't find any conditions matching your symptoms.
      </v-alert>
    </v-flex>
  </v-layout>
  <v-snackbar
      v-model="loadingSymptoms"
      bottom
      multi-line
      right
    >
      <v-progress-circular
        indeterminate
        color="red"
        class="mr-3"
      ></v-progress-circular>
      Loading Symptoms
      <v-btn
        color="error"
        flat
        @click="snackbar = false"
        timeout="0"
      >
        Close
      </v-btn>
    </v-snackbar>
</v-container>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      selectedSym: [],
      symptoms: [],
      diagnosing: false,
      panel: [false, true, true],
      result: [],
      error: false,
      loadingSymptoms: false
    }
  },
  methods: {
    remove(item) {
      const index = this.selectedSym.indexOf(item.ID)
      if (index >= 0) this.selectedSym.splice(index, 1)
    },
    diagnose() {
      this.result = []
      var self = this
      this.diagnosing = true
      axios
        .post('/api/diagnosis', {
          symptoms: self.selectedSym
        })
        .then(({ data }) => {
          self.diagnosing = false
          if (data.length > 0) {
            self.error = false
            self.result = data
          } else {
            self.error = true
          }
        })
        .catch(() => {
          self.diagnosing = false
        })
    }
  },
  computed: {
    resultPop() {
      return this.result.length > 0 ? true : false
    }
  },
  mounted() {
    this.loadingSymptoms = true
    var self = this
    // todo: show a toast notification until the symptoms are being loaded from the servers
    axios('/api/symptoms').then(res => {
      self.loadingSymptoms = false
      self.symptoms = res.data
    })
  }
}
</script>
