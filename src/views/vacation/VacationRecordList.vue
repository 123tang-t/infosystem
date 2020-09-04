<template>
    <section class="page-vacation-list">
        <div class="row vacation">
            <div class="title">
                <span>请假记录列表</span>
            </div>
            <el-table
                ref="vacationList"
                border
                :data="vacationList"
                style="width: 100%">
                <el-table-column
                    prop="Name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="JobNumber"
                    label="工号">
                </el-table-column>
                <el-table-column
                    prop="Type"
                    label="类型">
                    <template slot-scope="scope">
                        {{ vacationType[scope.row.Type] }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="StartTime"
                    label="开始时间"
                    width="350px">
                </el-table-column>
                <el-table-column
                    prop="EndTime"
                    label="结束时间"
                    width="350px">
                </el-table-column>
                <el-table-column
                    prop="IsPermit"
                    label="是否批准">
                    <template slot-scope="scope">
                        <span
                            :class="{
                                'agree': scope.row.IsPermit === 1,
                                'refuse': scope.row.IsPermit === 2,
                                'not-approved': scope.row.IsPermit === 0
                            }">
                            {{scope.row.IsPermit === 1 ? '已审批' :
                                (scope.row.IsPermit === 2 ? '已拒绝' : '未审批')}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="row right">
            <el-pagination
                layout="prev, pager, next"
                :page-size="vacationPagination.PageSize"
                :page-count="vacationPagination.PageCount"
                :total="vacationPagination.TotalCount"
                @current-change="onVacationPageChange">
            </el-pagination>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Vacation } from '@/interface/vacationList'
import { Pagination } from '@/interface/public'
import axios from 'axios'

@Component({})
export default class VacationList extends Vue {
    // 请假列表
    vacationList: Vacation[] = []

    // 请假类型
    vacationType = [
        '事假',
        '病假',
        '婚假',
        '孕假',
        '年假',
        '调休假'
    ]

    // 请假页码
    vacationPagination: Pagination = {
        Page: 1,
        PageSize: 20,
        PageCount: 0,
        TotalCount: 0
    }

    created () {
        this.fetchVavationList()
    }

    // 页面改变触发
    onVacationPageChange (Page: number) {
        this.vacationPagination.Page = Page
        this.fetchVavationList()
    }

    fetchVavationList () {
        axios.get('/api/vacation/application/history?Page=1&PageSize=20')
            .then((result) => {
                if (result.data.Code === 1) {
                    this.vacationList = result.data.Data.List
                }
            })
    }
}
</script>

<style lang="scss">
.page-vacation-list {
    padding: 0 15px;
    .vacation {
        .title {
            margin: 0 0 15px 10px;
            color: #000;
            // text-align: center;
            font-size: 20px;
            font-weight: 600;
        }
    }
}
</style>
