<template>
  <picker @change="handleChange" :value="index" :range="range" :range-key="labelKey">
    <slot></slot>
  </picker>
</template>

<script>
export default {
  props: {
    value: undefined,
    range: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
  },

  data () {
    return {
      index: undefined,
    }
  },

  methods: {
    handleChange (e) {
      if (e?.detail?.value) {
        this.index = e.detail.value - 0
        this.emitChange(this.range[this.index])
      }
    },

    emitChange (item) {
      // input 事件返回 id
      this.$emit('input', item[this.valueKey])
      // change 事件返回整个对象
      this.$emit('change', item)
    }
  }
}
</script>
