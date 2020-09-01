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
    <router-view @refresh="refreshPage"/>
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
                    PageSize: 20
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
        },

        refreshPage () {
            this.fetchMenuList()
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
        padding: 0 0 0 5px;
        height: 36px;
        background: #0081cc;
        border-radius: 4px;
        .menu {
            padding: 0 10px;
            height: 30px;
            line-height: 32px;
            color: #fff;
            font-size: 14px;
            user-select: none;
            border: 3px solid #0081cc;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background: #fff;
                color: #000;
                border-bottom: 3px solid #fff;
            }
        }
    }
}
</style>
