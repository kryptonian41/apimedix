<template>
<v-container>
  <v-layout row wrap justify-center>
    <v-flex xs6>
      <v-card>
        <v-card-title primary-title style="font-size: 30px; background: #ddd;">
          <div >
            How are you feeling ?
          </div>
        </v-card-title>
        <v-form>
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
        </v-card-actions>
       </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      selectedSym: [],
      symptoms: [],
      diagnosing: false
    }
  },
  methods: {
    remove(item) {
      const index = this.selectedSym.indexOf(item.ID)
      if (index >= 0) this.selectedSym.splice(index, 1)
    },
    diagnose() {
      var self = this
      this.diagnosing = true
      axios
        .post('/api/diagnosis', {
          symptoms: self.selectedSym
        })
        .then(() => {
          self.diagnosing = false
        })
        .catch(() => {
          self.diagnosing = false
        })
    }
  },
  mounted() {
    var self = this
    axios('/api/symptoms').then(res => (self.symptoms = res.data))
  }
}
</script>
