<template>
  <div class="box-component">
    {{ data }}
    {{ dataTampung }}
    <div></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: '15 MAY 1958',
      stBulan: '',
      dataKtp: '04-10-1997',
      dataTampung: ''
    }
  },
  created () {
    this.getDate()
  },
  methods: {
    // change Format Date
    getDate () {
      // var newDate = new Date()
      // console.log(this.data.toISOString)
      // console.log(newDate.toString())
      // console.log(newDate.toISOString())

      // var newDate = this.data
      // this.data = '15 MAY 1985'
      // var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
      // var bulan = this.data.slice(3, 6)
      // if (months === 'JAN' && bulan === 'JAN') {
      //   this.stBulan = '01'
      // } else if (months && bulan === 'FEB') {
      //   this.stBulan = '02'
      // } else if (months && bulan === 'MAR') {
      //   this.stBulan = '03'
      // } else if (months && bulan === 'APR') {
      //   this.stBulan = '04'
      // } else if (months && bulan === 'MAY') {
      //   this.stBulan = '05'
      // }
      // var date = this.data.slice(0, 2)
      // var year = this.data.slice(6, 11)
      // console.log(year + '-' + this.stBulan + '-' + date)
      // debugger

      var newDate = new Date(this.data)
      console.log(newDate)
      var dateString = new Date(newDate.getTime() - (newDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0]
      console.log(dateString)

      // var ktpDate = new Date().toISOString().slice('T')
      // console.log(ktpDate)
      // this.dataTampung = ktpDate

      // testing
      // var ktpDate = new Date(this.dataKtp), month = '' + (ktpDate.getMonth() + 1), day = '' + ktpDate.getDate(), year = ktpDate.getFullYear()
      var ktpDate = new Date(this.dataKtp), day = '' + ktpDate.getDate(), month = '' + (ktpDate.getMonth() + 1), year = ktpDate.getFullYear()
      this.dataTampung = [year, month, day].join('-')
      debugger
      // if (month.length < 2) {
      //   month = '0' + month
      // }
      // if (day.length < 2) {
      //   day = '0' + day
      // }
      // return [year, month, day].join('-')

      // debugger
      // var date = new Date('2013-12-31T02:00:00Z')
      // var year = date.getFullYear()
      // var month = date.getMonth() + 1
      // var dt = date.getDate()

      // if (dt < 10) {
      //   dt = '0' + dt
      // }
      // if (month < 10) {
      //   month = '0' + month
      // }

      // console.log(year + '-' + month + '-' + dt)
      // debugger
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
