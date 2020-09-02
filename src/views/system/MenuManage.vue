<template>
    <section class="page-menu-manage">
        <!-- 菜单按键 -->
        <div class="module">
            <div class="row">
                <div class="btn">
                    <el-button
                        size="small"
                        @click="fetchMenuList">
                        刷新
                    </el-button>
                    <el-button
                        size="small"
                        @click="onAddMenu">
                        新增
                    </el-button>
                    <el-button
                        size="small"
                        @click="onEditMenu"
                        :disabled="selection.length !== 1">
                        编辑
                    </el-button>
                    <el-button
                        size="small"
                        @click="onDeleteMenu"
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
                    @row-click="onMenuRowClick"
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
                    prop="RouteOrder"
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
            :title="menu.Id?'编辑':'新增'"
            width="45%"
            :show-close="false"
            :close-on-click-modal="false"
            :visible.sync="isShowMenuDialog">
            <el-form
                ref="menu"
                :model="menu"
                :rules="menuRules"
                label-width="100px">
                <el-form-item
                    prop="RouteName"
                    label="名称">
                    <el-input
                        v-model.trim="menu.RouteName"
                        size="small" />
                </el-form-item>
                <el-form-item
                    prop="RouteUrl"
                    label="路由">
                    <el-input
                        v-model.trim="menu.RouteUrl"
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
                    prop="RouteOrder"
                    label="顺序">
                    <el-input
                        v-model.trim.number="menu.RouteOrder"
                        size="small" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button
                    @click="onCancelMenuDialog">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="onConfirmMenuDislog">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Menu } from '@/interface/menuManage'
import { Pagination } from '@/interface/public'
// import { RequestGetMenuList } from '@/request/menuManage'
import { ElForm } from 'element-ui/types/form'
import { ElTable } from 'element-ui/types/table'
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
        RouteOrder: null,
        ParentId: null
    }

    // 弹窗表单验证规则
    menuRules: ElForm['rules'] = {
        RouteName: [{
            required: true,
            message: '请输入菜单名称'
        }],
        RouteUrl: [{
            required: true,
            message: '请输入菜单路由'
        }]
    }

    // 是否显示菜单弹窗
    isShowMenuDialog = false

    created () {
        this.fetchMenuList()
    }

    // 点击新增按钮触发
    onAddMenu () {
        this.showMenuDialog()
    }

    // 点击编辑按钮触发
    onEditMenu () {
        this.showMenuDialog()
        this.menu = this.selection[0]
    }

    // 点击删除按键触发
    onDeleteMenu () {
        this.$confirm('确定删除选中菜单吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.deleteMenu(this.selection)
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        })
    }

    // 点击菜单表格的行触发
    onMenuRowClick (row: Menu) {
        const menuTable = this.$refs.menuTable as ElTable
        const hasSelected = this.selection.some(sel => {
            return sel.Id === row.Id
        })
        if (hasSelected) {
            menuTable.toggleRowSelection(row, false)
        } else {
            menuTable.clearSelection()
            menuTable.toggleRowSelection(row, true)
        }
    }

    // 表格选中的时候触发
    onMenuSelectionChange (selection: Menu[]) {
        this.selection = selection
    }

    // 点击弹窗取消按钮触发
    onCancelMenuDialog () {
        this.closeMenuDiaog()
        this.resetMenuForm()
    }

    // 点击弹窗确定按钮触发
    onConfirmMenuDislog () {
        const menuForm = this.$refs.menu as ElForm
        menuForm.validate(valid => {
            if (valid) {
                this.subMenuForm()
            }
        })
    }

    // 显示菜单弹窗
    showMenuDialog () {
        this.isShowMenuDialog = true
    }

    // 隐藏菜单弹窗
    closeMenuDiaog () {
        this.isShowMenuDialog = false
    }

    // 重置菜单表单
    resetMenuForm () {
        this.menu = {
            Id: null,
            RouteName: '',
            RouteUrl: '',
            IsShow: 1,
            RouteOrder: null,
            ParentId: null
        }
        this.$nextTick(() => {
            const menuForm = this.$refs.menu as ElForm
            menuForm.clearValidate()
        })
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
                if (result.data.Code === 1) {
                    this.menuList = result.data.Data.List
                    this.menuPagination = {
                        Page: result.data.Data.Page,
                        PageSize: result.data.Data.PageSize,
                        PageCount: result.data.Data.PageCount,
                        TotalCount: result.data.Data.TotalCount
                    }
                }
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

    // 提交菜单表单
    subMenuForm () {
        if (this.menu.Id) {
            axios.post('/api/menu/edit', this.menu)
                .then((result) => {
                    if (result.data.Code === 1) {
                        this.closeMenuDiaog()
                        this.resetMenuForm()
                        this.fetchMenuList()
                        this.$emit('refresh')
                    }
                })
        } else {
            axios.post('/api/menu/add', this.menu)
                .then((result) => {
                    console.log(result.data.Code)
                    if (result.data.Code === 1) {
                        this.closeMenuDiaog()
                        this.resetMenuForm()
                        this.fetchMenuList()
                        this.$emit('refresh')
                    }
                })
        }
    }

    // 删除选中菜单
    deleteMenu (selection: Menu[]) {
        const ids: number[] = []
        selection.forEach(sel => {
            if (sel.Id) {
                ids.push(sel.Id)
            }
        })
        axios.post('/api/menu/delete', { Id: ids })
            .then((result) => {
                if (result.data.Code === 1) {
                    this.fetchMenuList()
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.$emit('refresh')
                }
            })
    }
}
</script>

<style lang="scss">
</style>
