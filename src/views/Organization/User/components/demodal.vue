<template>
    <div class="">
        <div class="item">
            <Alert type="warning" show-icon>
                删除角色将影响到所有授权此角色的用户
                <template slot="desc">
                    你还要继续吗？
                </template>
            </Alert>
        </div>
    </div>
</template>
<script>
    export default {
    }
</script>
