<template>
  <div>
    yes
    <button @click="handleClick"></button>
    <input type="text" v-model="message" />
    <input type="radio" value="yes" v-model="checked" name="test" />
    <input type="radio" value="no" v-model="checked"  name="test" />
    <TestChildComponent @childEvent="handleChildEvent"></TestChildComponent>
  </div>
</template>
<script>
import TestChildComponent from '@/components/TestChildComponent'
export default {
  name: 'TestComponent',
  components: {
    TestChildComponent
  },
  data () {
    return {
      message: 'initial',
      checked: 'yes'
    }
  },
  methods: {
    handleClick () {
      this.$emit('buttonClicked')
    },
    handleChildEvent () {}
  }
}
</script>
