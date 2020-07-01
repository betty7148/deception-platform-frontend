<template>
<div class="login">
    <h2 >欺骗防御项目登录</h2>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="form.name" placeholder="请输入用户名" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
       
            <el-button type="primary" size='medium' @click="onSubmit">登录</el-button>
    </el-form>
</div>
   
</template>

<script>
import axios from 'axios'
import sha512 from 'js-sha512'
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
        // let htmlobj = document.getElementsByTagName('html');
        // console.log(htmlobj)
        // htmlobj[0].style.backgroundImage = "url(public/imgs/login_bg.jpg)"
       
        axios.get('api/v1/base/status').then(res => {
            let { data } = res;
            let { result , msg , data:body } = data;
            if(!result){
                this.$message.error(msg);
            }else{
                let { login , csrf , salt } = body;
                let { token } = csrf;
                this.$store.commit('updateStateCsrfToken' , token);
                this.$store.commit('setSalt' , salt);
                this.$store.commit('setLoginState' , login);
            }
        })
    },
    methods: {
        onSubmit() {
            // if (!this.$store.state.login) {
                let pass_sha = sha512(this.form.password + this.$store.state.salt);
                const params = new URLSearchParams();
                params.append("username", this.form.name);
                params.append("password", pass_sha);
                params.append("_csrf", this.$store.state.csrf_token);
                axios({
                    url:'api/v1/base/login',
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
                        this.$router.push({ path: '/dashboard' }) 
                    }
                    // console.log(res.data);
                    
                }).catch(err => {
                    console.log(err);
                    this.$message.error('登录失败！');
                });
            // }
        
      }
    }
}
</script>

<style >
/* body{
    background-color: aliceblue;
} */
.login {
  width: 30%;
  margin: auto;
  text-align: center;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 100px;
  
}
/* html{
    background-image:url('../../../public/imgs/login_bg.jpg')
} */
</style>
