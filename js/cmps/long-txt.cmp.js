export default {
  props: ['txt'],
  template: `<span>{{txtForDisplay}}</span>`,
  data() {
    return {
      isLongTxt: false,
    }
  },
  created() {
    const txtLen = this.txt.length
    if (txtLen > 60) this.isLongTxt = true
  },
  computed: {
    txtForDisplay() {
      if (!this.isLongTxt) return this.txt
      else return this.txt.substring(0, 60) + '...'
    },
  },
}
