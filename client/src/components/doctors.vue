<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg6>
        <v-card>
          <v-card-title primary-title class="headline">
            Nearby Health Care Centers
          </v-card-title>
          <div ref="map" id="map"></div>
          <v-card-actions class="pa-3">
            <v-btn color="success" @click="panToCurrPos" :disabled="!away">Current Location</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 lg6 class="mt-3">
        <v-slide-y-transition mode="out-in">
          <template v-if="showErrorMsg">
            <v-alert type="error" :value="true">
              Sorry, could not find any medical centers near you.
            </v-alert>
          </template>
          <v-expansion-panel
            popout
            v-if="hasPlaces && !showErrorMsg"
          >
            <v-expansion-panel-content
              v-for="(item, i) in places"
              :key="i"

            >
              <div slot="header">
                <h4>{{ item.name }}</h4>
                <template v-if="item.rating">
                  <v-flex xs12>
                    <v-layout row align-center>
                      <v-rating :value="item.rating" small color="orange" readonly>
                      </v-rating>
                      ({{ item.rating }})
                      <v-spacer></v-spacer>
                    </v-layout>

                  </v-flex>
                </template>
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
                  <v-btn color="success" @click="moveToMarker(item.place_id)">See on Map</v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-slide-y-transition>
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
      markers: [],
      reducedMarkers: {},
      away: false,
      currentMarker: null,
      showErrorMsg: false
    }
  },
  computed: {
    hasPlaces: function() {
      return this.places.length > 0 ? true : false
    }
  },
  watch: {
    markers: function() {
      var self = this
      this.markers.forEach(function(item) {
        self.reducedMarkers[item.id] = item
      })
    }
  },
  methods: {
    resetMarker() {
      if (!this.currentMarker) {
        return
      }
      this.currentMarker.setIcon('')
      this.currentMarker = null
    },
    panToCurrPos() {
      this.away = false
      this.resetMarker()
      this.map.panTo(this.currPos)
    },
    moveToMarker(placeID) {
      this.$vuetify.goTo(0, {
        duration: 400,
        offset: 0,
        easing: 'easeInOutCubic'
      })
      this.resetMarker()
      this.away = true
      const id = '' + placeID
      const marker = this.reducedMarkers[id].marker
      this.currentMarker = marker
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => {
        marker.setAnimation(null)
      }, 2000)
      const lat = marker.position.lat()
      const long = marker.position.lng()
      this.map.panTo(new google.maps.LatLng(lat, long))
    },
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
        if (res.length == 0) {
          self.showErrorMsg = true
        }
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
            self.placesService.getDetails(request, function(place, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                self.places.push(place)
                self.createMarker(place)
              }
            })
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
        ({ coords: { longitude, latitude } }) => {
          // dummy co-ordinates used just for developement purposes
          // const dummyLocation = {
          //   lat: 26.92207,
          //   long: 75.778885
          // }
          // var pos = new google.maps.LatLng(
          //   dummyLocation.lat,
          //   dummyLocation.long
          // )
          var pos = new google.maps.LatLng(latitude, longitude)
          self.currPos = pos
          self.map = new google.maps.Map(this.$refs.map, {
            center: pos,
            zoom: 15
          })
          const marker = new google.maps.Marker({
            position: pos,
            map: self.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
