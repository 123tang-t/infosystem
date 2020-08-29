<template>
  <div class="page-home">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
    },
    data () {
        return {
            menuList: {
                // Id: 01,
                // RouteName: '',
                // RouteUrl: '',
                // IsShow: 01,
                // RouterOrder: 01,
                // ParentId: 01
            }
        }
    }
}
</script>

<style lang="scss">
.page-home {
    padding: 10px 10px;
}
</style>
