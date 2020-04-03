<template>
  <div>
    <div class="uploader">
      <input type="file" @change="onFileChange" />
      <div id="preview">
        <img v-if="url" :src="url" id="text-img" />
      </div>
      <!-- <button v-on:click="recognize">recognize</button> -->
      <div>
        <p v-text="message">halo</p>
        <p v-text="passport"></p>
        <p v-text="name"></p>
        <div>
          <p>{{ year[0] + ' Tanggal Lahir' }}</p>
          <p>{{ year[1] + ' Pembuatan' }}</p>
          <p>{{ year[2] + ' Expired' }}</p>
        </div>
      </div>
      <!-- <div @click="checkValue">check aku</div> -->
      <!-- <q-img id="text-img" alt="Vue logo" src="https://2.bp.blogspot.com/-UtaWQXWKSro/WGE_CwX-wwI/AAAAAAAAdFY/CbAcpOphEjY7T1pTTl6wtshYviNwSmk5wCLcB/s1600/passport.jpg" /> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { createWorker, PSM, OEM } from 'tesseract.js'
import { match } from 'minimatch'
const worker = createWorker({
  logger: m => console.log(m)
})
export default {
  data () {
    return {
      url: [],
      message: [],
      passport: '',
      text: '',
      gender: '',
      name: '',
      year : [],
      pureYear: [],
      months : []
    }
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      if (this.url != '') {
        this.recognize()
      }
    },
    checkValue(){
      console.log(this.text)
    },
    masukinValue(value) {
      this.message = value
    },
    indexesOf (string, regex) {
      var math, indexes = {}
      regex = new RegExp(regex)
      while (math = regex.exec(string)) {
        if (!indexes[match[0]]) indexes[match[0]] = []
        indexes[match[0]].push(match.index)
      }
      return indexes
    },
     async recognize() {
      // debugger
      const self = this
      const img = document.getElementById('text-img')
      console.log(img)
      await worker.load()
      await worker.loadLanguage('eng')
      await worker.initialize('eng', OEM.LSTM_ONLY)
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK
      })
      const { data: { text } } = await worker.recognize(img)
      var changedText = text.search('P<')
      this.passport = text.substr(changedText)
      // debugger
      console.log(text)
      // var female = text.search('P')
      // var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      // var newMonths = []
      // months.forEach(findText);
      
      // function findText(item) {
      //   var searchMonth = text.search(item);
      //   if(searchMonth != -1) {
      //     var pureMonth = text.substring(searchMonth-2,searchMonth + 9);
      //     self.months.push(pureMonth)
      //   }
      // }
      var date = new Date();
      for( var x = 1920; x<= date.getFullYear() + 5 ; x ++) {
        var searchYear = text.search(x)
        if(searchYear != -1 && text.charAt(searchYear - 1 ) == " ") {
          var pureYear = text.substring(searchYear-7,searchYear + 4);
          this.year.push(pureYear)
        }
      }
      for (var i = 0;  i < text.length; i++) {
        debugger
        if (text[i] === 'P') {
          var nexIndex = i + 2
          if (text.charAt(nexIndex) === 'F') {
            this.gender = 'female'
            // debugger
            this.name = text.slice(55, nexIndex)
          }
        } else if (text[i] === 'L') {
          var nexIndex = i + 2
          if (text.charAt(nexIndex) === 'M') {
            this.gender = 'male'
            this.name = text.slice(55, nexIndex)
          }
        } if(text.substring(i, i +3) === 'JAN' || text.substring(i, i +3) === 'FEB' || text.substring(i, i +3) === 'MAR' || text.substring(i, i +3) === 'APR'  || text.substring(i, i +3) === 'MAY' || text.substring(i, i +3) === 'JUN' || text.substring(i, i +3) === 'JUL' || text.substring(i, i +3) === 'AUG' || text.substring(i, i +3) === 'SEP' || text.substring(i, i +3) === 'OCT' || text.substring(i, i +3) === 'NOV' || text.substring(i, i +3) === 'DEC') {
          this.months.push(text.substring(i -3, i +8))
        }

      }
      debugger;
      console.log(this.months);
      // console.log(this.year);
      console.log(this.gender)
      console.log(this.name)
      // debugger
      // console.log(text.search('p'))
      self.message = changedText
      // console.log(self.message)
    }
  }
  // created () {
  //   this.recognize()
  // }
}
</script>

<style lang="stylus" scoped>
#text-img
  width 420px
</style>
