<template>
  <div class="content q-pa-lg">
    <q-card class="box-card q-pa-md">
      <div class="title">Geolocation</div>
      <div id="map">
        <GmapMap
          :center="center"
          :zoom="12"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
        <!-- <GmapMap
          :center="center"
          :zoom="12"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        > -->
          <GmapMarker
            :position="center"
          />
          <!-- <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position">
          </GmapMarker> -->
        </GmapMap>
      </div>
    </q-card>
    <q-card class="q-pa-md q-mt-md">
      <div class="title">Get Location</div>
      <q-btn class="btn-item" color="cyan-7" @click="getNewPosition">Get Location</q-btn>
      <div>
        <strong>{{ center }}</strong>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Plugins } from '@capacitor/core'
import { gmapApi } from 'vue2-google-maps'

const { Geolocation } = Plugins
export default {
  data () {
    return {
      map: null,
      infoWindow: null,
      position: {},
      center: {},
      makers: [],
      places: [],
      currentPlace: null
    }
  },
  computed: {
    google: gmapApi
  },
  // watch: {
  //   position (newVal, oldVal) {
  //     this.position = newVal
  //   }
  // },
  // created () {
  //   this.getPositionNow()
  // },
  methods: {
  //   initMap () {
  //     this.map = new google
  //   }
    // getCurrentPosition () {
    //   Geolocation.getCurrentPosition().then(position => {
    //     console.log('Current', position)
    //     this.position = position.coords
    //   })
    // }

    getNewPosition () {
      var self = this
      navigator.geolocation.getCurrentPosition(position => {
        self.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log('New Position', self.center)
      })
    }
    // cara in aligator

    // setPlace (place) {
    //   this.currentPlace = place
    // },
    // addMaker () {
    //   if (this.currentPlace) {
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng()
    //     }
    //     this.makers.push({ position: marker })
    //     this.places.push(this.currentPlace)
    //     this.center = marker
    //     this.currentPlace = null
    //   }
    // },
    // geolocate () {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     }
    //   })
    // }
    // sampai sini

    // getLocation () {
    //   var self = this
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((p) => {
    //       var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude)
    //       var mapoptions = {
    //         center: LatLng,
    //         zoom: 13,
    //         mpTypeId: google.maps.MapTypeId.ROADMAP
    //       }
    //     })
    //   }
    // }
  },
  mounted () {
    // this.getCurrentPosition()
    // this.geolocate()

    // we start listening
    // this.geoId = Geolocation.watchPosition({}, (position, err) => {
    //   console.log('New GPS position')
    //   this.position = position
    // })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log('position', this.center)
      })
    }
  },
  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }
}
</script>

<style lang="stylus" scoped>
#map
  height 80%
</style>
