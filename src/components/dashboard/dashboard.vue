<template>
<div class='dashboard'>
    <el-row class="tac">
        <el-col :span="5" >
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="black"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>告警管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <router-link to="/dashboard/alertmanage/alertthing" tag="div">告警事件</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/dashboard/alertmanage/alertrank" tag="div">告警等级</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                        <router-link to="/dashboard/alertmanage/alertsend" tag="div">告警转发</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>事件管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">攻击事件</el-menu-item>
                    <el-menu-item index="2-2">数据索引</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>威胁情报</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">情报</el-menu-item>
                    <el-menu-item index="3-2">白名单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>数据统计</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1">事件统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>蜜网构建</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="5-1">蜜网管理</el-menu-item>
                    <el-menu-item index="5-2">蜜罐管理</el-menu-item>
                    <el-menu-item index="5-3">节点管理</el-menu-item>
                    <el-menu-item index="5-4">节点分组</el-menu-item>
                    <el-menu-item index="5-5">诱饵管理</el-menu-item>
                    <el-menu-item index="5-6">蜜罐类型管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>系统配置</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="6-1">
                        <router-link to="/dashboard/usermanage/usergroup" tag="div">用户组管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="6-2">
                        <router-link to="/dashboard/usermanage/user" tag="div">用户管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="6-3">
                        <router-link to="/dashboard/usermanage/operatelog" tag="div">操作日志管理</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        <router-view></router-view>
    </el-row>
    
</div>
   
</template>

<script>
// import axios from 'axios'
export default {
    data() {
      return {
        form: {
          name: '',
          password: '',
          
        },
      }
    },
    created(){
        // axios.get('api/v1/base/status').then(res => {
        //     let { data } = res;
        //     let { result , msg , data:body } = data;
        //     if(!result){
        //         this.$message.error(msg);
        //     }else{
        //         let { login , csrf , salt } = body;
        //         let { token } = csrf;
        //         this.$store.commit('updateStateCsrfToken' , token);
        //         this.$store.commit('setSalt' , salt);
        //         this.$store.commit('setLoginState' , login);
        //     }
        // })
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>

</style>
