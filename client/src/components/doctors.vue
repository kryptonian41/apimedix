<template>
  <div>
    <h1>blah blah</h1>
    <div ref="map" id="map"></div>
    <v-btn color="success" @click="searchNearbyDocs">Search</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      placesService: null,
      currPos: null
    }
  },
  methods: {
    searchNearbyDocs() {
      const request = {
        location: this.currPos,
        radius: '500',
        type: ['food']
      }
      const self = this
      this.placesService.nearbySearch(request, function(res, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < res.length; i++) {
            var placeID = res[i].place_id
            var request = {
              placeId: placeID,
              fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
            }
            self.placesService.getDetails(request, callback)

            function callback(place, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(place)
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
          var pos = new google.maps.LatLng(latitude, longitude)
          self.currPos = pos
          self.map = new google.maps.Map(this.$refs.map, {
            center: pos,
            zoom: 15
          })
          self.placesService = new google.maps.places.PlacesService(self.map)
        },
        err => {
          console.log('Could not fetch location')
        }
      )
    }
  },
  createMarker() {}
}
</script>

<style scoped>
#map {
  margin: 0 auto;
  width: 400px;
  height: 400px;
}
</style>
