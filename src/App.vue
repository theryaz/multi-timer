<template>
	<router-view />
</template>
<style lang="scss">
$body-font-family: "Lato";
html{
	font-size: $font-size-root;
	@media (min-width: 600px) {
		font-size: 20px !important;
	}
}
hr{
	border-top: 1px solid $mt-primary-text;
}
.cursor-pointer{
	cursor: pointer;
}
.bottom-border{
	border: none;
	border-bottom: 1px solid gray !important;
}
</style>
<style lang="scss">
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
