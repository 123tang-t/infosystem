<template>
    <section class="page-vacation-list">
        <div class="module">
            <div class="row">
                <div class="btn">
                    <el-button
                        size="small"
                        @click="onAddVacation">
                        新增
                    </el-button>
                    <el-button
                        size="small"
                        @click="onEditVacation"
                        :disabled="selection.length !== 1">
                        编辑
                    </el-button>
                    <el-button
                        size="small"
                        @click="onDeleteVacation"
                        :disabled="selection.length < 1">
                        删除
                    </el-button>
                </div>
            </div>
        </div>
    </section>
</template>
