<template>
  <div class="page-home">
    <div class="row menu-row">
        <div
            v-for="menu of menuList"
            :key="menu.Id"
            class="menu"
            :style="{ 'display': menu.IsShow? '' : 'none'}"
            @click="jumpPage(menu.RouteUrl)">
            {{menu.RouteName}}
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Home',
    components: {
    },
    data () {
        return {
            menuList: []
        }
    },
    created () {
        this.fetchMenuList()
    },
    methods: {
        fetchMenuList () {
            axios.get('api/menu/list', {
                params: {
                    Page: 1,
                    PageSize: 100
                }
            })
                .then((result) => {
                    this.menuList = result.data.Data.List
                })
        },

        // 跳转页面
        jumpPage (url) {
            if (url === this.$route.path) {
                return
            }
            this.$router.push({
                path: url
            })
        }
    }
}
</script>

<style lang="scss">
.page-home {
    padding: 10px 10px;
    .menu-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background: #fff;
        border-radius: 5px;
        .menu {
            padding: 0 10px;
            // min-width: 60px;
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>
