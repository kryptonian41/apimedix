<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg10>
        <v-card>
          <v-card-title primary-title class="headline">
            Nearby Health Care Centers
          </v-card-title>
          <div ref="map" id="map"></div>
          <v-card-actions class="pa-3">
            <v-btn color="success" @click="searchNearbyDocs">Search</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 lg11 class="mt-3">
         <v-expansion-panel
            popout
          >
            <v-expansion-panel-content
              v-for="(item, i) in places"
              :key="i"

            >
              <div slot="header">
                <h4>{{ item.name }}</h4>
                <template v-if="item.rating">
                  <v-flex xs12 d-flex justify-start>
                    <v-rating :value="item.rating" small color="orange">
                  </v-rating>
                  ({{ item.rating }})
                  </v-flex>

                </template>


                <!-- <p>{{ item.Issue.IcdName }}</p> -->
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <div v-html="item.adr_address">
                  </div>
                  <div v-if="item.formatted_phone_number">
                    Contact Details: {{ item.formatted_phone_number }}
                  </div>
                </v-card-text>
                <v-card-actions class="pa-3">
                  <v-spacer></v-spacer>
                  <v-btn color="success">See on Map</v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      placesService: null,
      currPos: null,
      places: [],
      markers: []
    }
  },
  methods: {
    createMarker(place) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: this.map
      })
      this.markers.push({ id: place.place_id, marker })
    },
    searchNearbyDocs() {
      const request = {
        location: this.currPos,
        radius: '2000',
        type: ['doctor']
      }
      const self = this
      this.placesService.nearbySearch(request, function(res, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < res.length; i++) {
            var placeID = res[i].place_id
            var request = {
              placeId: placeID,
              fields: [
                'name',
                'rating',
                'formatted_phone_number',
                'geometry',
                'place_id',
                'adr_address',
                'opening_hours',
                'website'
              ]
            }
            self.placesService.getDetails(request, callback)
            function callback(place, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(place)
                self.places.push(place)
              }
            }
          }
        }
      })
    }
  },
  mounted() {
    var self = this
    // Getting the current location of the user using the HTML5 gealocation api
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude }, coords }) => {
          const dummyLocation = {
            lat: 26.92207,
            long: 75.778885
          }
          var pos = new google.maps.LatLng(
            dummyLocation.lat,
            dummyLocation.long
          )
          self.currPos = pos
          self.map = new google.maps.Map(this.$refs.map, {
            center: pos,
            zoom: 15
          })
          const marker = new google.maps.Marker({
            position: pos,
            map: self.map
          })
          self.placesService = new google.maps.places.PlacesService(self.map)
          self.searchNearbyDocs()
        },
        err => {
          console.log('Could not fetch location')
        }
      )
    }
  }
}
</script>

<style scoped>
#map {
  margin: 0 auto;
  width: 100%;
  height: 400px;
}
</style>
