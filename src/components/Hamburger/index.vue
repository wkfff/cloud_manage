<template>
  <div>
    <svg
      :class="{'is-active':isActive}"
      t="1492500959545"
      class="hamburger"
      style=""
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1691"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
      @click="toggleClick">
      <path d="M828.40625001 90.125l105.46874999 0 0 105.46875001-105.46875001-2e-8L828.40625001 90.125 828.40625001 90.125zM828.40625001 90.125" p-id="2035"></path>
      <path d="M90.125 90.125l580.078125 0 0 105.46875001L90.125 195.59374999 90.125 90.125 90.125 90.125zM90.125 90.125" p-id="2036"></path>
      <path d="M828.40625001 459.265625l105.46874999 0 0 105.46875-105.46875001 0L828.40625001 459.265625 828.40625001 459.265625zM828.40625001 459.265625" p-id="2037"></path>
      <path d="M90.125 459.265625l580.078125 0 0 105.46875L90.125 564.734375 90.125 459.265625 90.125 459.265625zM90.125 459.265625" p-id="2038"></path>
      <path d="M828.40625001 828.40625001l105.46874999-2e-8 0 105.46875001-105.46875001 0L828.40625001 828.40625001 828.40625001 828.40625001zM828.40625001 828.40625001" p-id="2039"></path>
      <path d="M90.125 828.40625001l580.078125-2e-8 0 105.46875001L90.125 933.875 90.125 828.40625001 90.125 828.40625001zM90.125 828.40625001" p-id="2040"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
	transform: rotate(180deg);
	transition: .38s;
	transform-origin: 50% 50%;
}
.hamburger.is-active {
	transform: rotate(0deg);
}
</style>
