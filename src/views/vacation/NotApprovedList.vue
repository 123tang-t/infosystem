<template>
    <section class="page-not-approved-list">
        <div class="module">
            <div class="row">
                <div class="btn">
                    <el-button
                        size="small">
                        新增
                    </el-button>
                    <el-button
                        size="small">
                        编辑
                    </el-button>
                    <el-button
                        size="small">
                        删除
                    </el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class NotApproved extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
