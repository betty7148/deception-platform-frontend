<template>
    <div class='user'>
        <el-container>
            <el-header style="text-align: left; font-size: 12px">
                <span>首页/系统配置/用户管理</span>
            </el-header>
            <el-button type="success" class='add_user' @click="dialogFormVisible = true">添加用户</el-button>
            <el-table
            :data="tableData"
            stripe
            style="width: 100%; margin:60px">
            <el-table-column
            prop="id"
            label="id"
            width="0" >
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户"
            width="350">
            </el-table-column>
            <el-table-column
            prop="group"
            label="用户组"
            width="350">
            </el-table-column>
            <el-table-column
            label="操作"
            width="300">
                <template slot-scope="scope">
                    <el-button @click="showUpdate(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block " style="margin-left:500px">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5, 10, 20, 30]"
            :page-size= "size"
            layout="total, sizes, prev, pager, next, jumper"
            :total='totalNumber'>
            </el-pagination>
        </div>
        </el-container>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width='40%'>
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off" label-width="100px"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-input v-model="form.group" autocomplete="off"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog> 
        <el-dialog title="修改用户" :visible.sync="dialogFormVisible1" width='40%'>
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="update_username" autocomplete="off" label-width="100px"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="formLabelWidth">
                <el-input v-model="update_password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-input v-model="form.group" autocomplete="off"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="updateUser">确 定</el-button>
            </div>
        </el-dialog> 
    </div>
</template>

<script>
import axios from 'axios'
import sha512 from 'js-sha512'
export default {
    data() {
        return {
            tableData: [],
            page: 0,
            size: 5,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            totalNumber: 0,
            form: {
                username: '',
                password: '',
                group: ''
            },
            update_username: '',
            update_password: '',
            update_id : 0,
            formLabelWidth: '120px'
        };
    },
    created(){
        this.getUserList();
    },
    methods:{
        getUserList(){
            // var page = this.page - 1;
            console.log(this.page+"   "+this.size)
            axios.get('api/auth/v1/user?page='+this.page+'&size='+this.size)
            .then(res=>{
                let { data:data1 } = res;
                let { result, msg, data } = data1;
                let { content , totalElements } = data;
                this.totalNumber = totalElements;
                console.log(content);
                if (!result) {
                    this.$message.error(msg);
                } else {
                    this.tableData = content;
                }
                // console.log(res.data);
            }).catch(err => {
                console.log(err);
                this.$message.error('登录失败！');
            });
        },
        showUpdate(row){
            console.log(row);
            this.update_username = row.username;
            this.dialogFormVisible1 = true;
            this.update_id = row.id;
        },
        updateUser() {
            let pass_sha = sha512(this.update_password + this.$store.state.salt);
            const params = new URLSearchParams();
            params.append("username", this.update_username);
            params.append("password", pass_sha);
            params.append("_csrf", this.$store.state.csrf_token);
            axios({
                url:'api/auth/v1/user/'+this.update_id,
                method: 'patch',
                data: params,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            .then(res=>{
                let { data } = res;
                let { result , msg } = data;
                if (!result) {
                    this.$message.error(msg);
                } else {
                    this.$message.success('修改成功!');
                    this.dialogFormVisible1 = false;
                    this.getUserList();
                }
            }).catch(err => {
                console.log(err);
                this.$message.error('修改失败！');
            });
        },
        deleteUser(row){
            const params = new URLSearchParams();
            params.append("_csrf", this.$store.state.csrf_token);
            axios({
                url:'/api/auth/v1/user/'+row.id,
                method: 'delete',
                data: params,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            .then(res=>{
                let { data } = res;
                let { result , msg } = data;
                if (!result) {
                    this.$message.error(msg);
                } else {
                    this.$message.success('删除用户成功!');
                    this.dialogFormVisible = false;
                    this.getUserList();
                }
                // console.log(res.data);
            }).catch(err => {
                console.log(err);
                this.$message.error('登录失败！');
            });
        },
        addUser() {
            let pass_sha = sha512(this.form.password + this.$store.state.salt);
            const params = new URLSearchParams();
            params.append("username", this.form.username);
            params.append("password", pass_sha);
            params.append("_csrf", this.$store.state.csrf_token);
            axios({
                url:'api/auth/v1/user',
                method: 'post',
                data: params,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            .then(res=>{
                let { data } = res;
                let { result , msg } = data;
                if (!result) {
                    this.$message.error(msg);
                } else {
                    this.$message.success('添加成功!');
                    this.dialogFormVisible = false;
                    this.getUserList();
                }
                // console.log(res.data);
            }).catch(err => {
                console.log(err);
                this.$message.error('添加失败！');
            });
        },
        handleSizeChange(val) {
            this.size = val;
            console.log(`每页 ${val} 条`);
            this.getUserList();
        },
        handleCurrentChange(val) {
            this.page = val;
            console.log(`当前页: ${val}`);
            this.getUserList();
        }
    }

}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
.el-aside {
    color: #333;
}
.user{
    /* padding:20px; */
}
.add_user{
    width: 100px;
    position: absolute;
    right: 50px;
    top: 80px;
}
</style>