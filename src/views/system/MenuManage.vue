<template>
    <section class="page-menu-manage">
        <!-- 菜单按键 -->
        <div class="module">
            <div class="row">
                <div class="btn">
                    <el-button
                        size="small">
                        刷新
                    </el-button>
                    <el-button
                        size="small"
                        @click="onAddMenu">
                        新增
                    </el-button>
                    <el-button
                        size="small"
                        :disabled="selection.length !== 1">
                        编辑
                    </el-button>
                    <el-button
                        size="small"
                        :disabled="selection.length < 1">
                        删除
                    </el-button>
                </div>
            </div>
            <div class="row">
                <el-table
                    ref="menuList"
                    border
                    :data="menuList"
                    style="width: 100%"
                    @selection-change="onMenuSelectionChange">
                    <el-table-column
                    type="selection"></el-table-column>
                    <el-table-column
                    prop="RouteName"
                    label="名称">
                    </el-table-column>
                    <el-table-column
                    prop="RouteUrl"
                    label="路由">
                    </el-table-column>
                    <el-table-column
                    prop="IsShow"
                    label="是否显示">
                    <template slot-scope="scope">
                        <span
                            :class="{
                                'success': scope.row.IsShow,
                                'error': !scope.row.IsShow
                            }">
                            {{ scope.row.IsShow === 1 ? '是' : '否'}}
                        </span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="RouterOrder"
                    label="顺序">
                    </el-table-column>
                </el-table>
            </div>
            <div class="row right">
                <el-pagination
                    layout="prev, pager, next"
                    :page-size="menuPagination.PageSize"
                    :page-count="menuPagination.PageCount"
                    :total="menuPagination.TotalCount"
                    @current-change="onMenuPageChange">
                </el-pagination>
            </div>
        </div>

        <!-- 新增&编辑弹窗 -->
        <el-dialog
            :title="menu.id?'编辑':'新增'"
            width="45%"
            :show-close="false"
            :close-on-click-modal="false"
            :visible.sync="isShowMenuDialog">
            <el-form
                ref="menu"
                :model="menu"
                label-width="100px">
                <el-form-item
                    prop="RouteName"
                    label="名称">
                    <el-input
                        v-model="menu.RouteName"
                        size="small" />
                </el-form-item>
                <el-form-item
                    prop="RouteUrl"
                    label="路由">
                    <el-input
                        v-model="menu.RouteUrl"
                        size="small" />
                </el-form-item>
                <el-form-item
                    prop="IsShow"
                    label="是否显示">
                    <el-radio-group v-model="menu.IsShow">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    prop="RouterOrder"
                    label="顺序">
                    <el-input
                        v-model="menu.RouterOrder"
                        size="small" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowMenuDialog = false">取 消</el-button>
                <el-button type="primary" @click="isShowMenuDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Menu } from '@/interface/menuManage'
import { Pagination } from '@/interface/public'
// import { GetParams } from '@/interface/public'
// import { RequestGetMenuList } from '@/request/menuManage'
import axios from 'axios'

@Component({})
export default class MenuManage extends Vue {
    // 菜单列表
    menuList: Menu[] = []
    // 选中菜单
    selection: Menu[] =[]
    // 搜索信息
    searchInfo = ''
    // 菜单页码
    menuPagination: Pagination = {
        Page: 1,
        PageSize: 20,
        PageCount: 0,
        TotalCount: 0
    }

    // 菜单弹窗表单
    menu: Menu = {
        Id: null,
        RouteName: '',
        RouteUrl: '',
        IsShow: 1,
        RouterOrder: 0,
        ParentId: null
    }

    // 是否显示菜单弹窗
    isShowMenuDialog = false

    // 点击新增按钮是触发
    onAddMenu () {
        this.showMenuDialog()
    }

    // 显示菜单弹窗
    showMenuDialog () {
        this.isShowMenuDialog = true
    }

    // 改变页面编码的时候触发
    onMenuPageChange (page: number) {
        this.menuPagination.Page = page
    }

    // 获取菜单列表
    fetchMenuList () {
        axios.get('api/menu/list', {
            params: {
                Page: this.menuPagination.Page || 1,
                PageSize: this.menuPagination.PageSize || 20,
                Name: this.searchInfo
            }
        })
            .then((result) => {
                this.menuList = result.data.list
            })
    }
    // async fetchMenuList () {
    //     this.menuList = []
    //     const result: any = await RequestGetMenuList({
    //         Page: this.menuPagination.Page,
    //         PageSize: this.menuPagination.PageSize,
    //         Name: this.searchInfo
    //     })
    //     const data = result.data
    //     this.menuPagination = {
    //         Page: data.Page,
    //         PageSize: data.PageSize,
    //         PageCount: data.PageCount,
    //         TotalCount: data.TotalCount
    //     }
    //     this.menuList = data.List
    // }

    created () {
        this.fetchMenuList()
    }
}
</script>

<style lang="scss">
</style>
