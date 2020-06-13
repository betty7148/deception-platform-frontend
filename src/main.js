import Vue from 'vue';
import app from './App.vue';
import Vuex from "vuex";
Vue.use(Vuex);

import axios from 'axios'
Vue.use(axios);



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';



var store= new Vuex.Store({
    state:{//this.$store.state.**
        csrf_token: '',
        salt: '',
        login: false
    },
    //存放同步函数方法
	mutations: {//this.$store.commit("方法名","按需传递唯一的参数")
		updateStateCsrfToken( state , str ){
            state.csrf_token = str;
		},
		setSalt( state , salt ){
			state.salt = salt
        },
        setLoginState( state, login){
            state.login = login
        }
	},
	//存放异步函数方法
	actions: {
	
		
	}, 
    getters:{//this.$store.getters.**
        
       
    }
})

new Vue({
    el:"#app",
    render:c=>c(app),
    router,
    store
})


Vue.filter('dateFormat', function (date) {
    var d = new Date(date);
    let year=d.getFullYear();
    let month=d.getMonth() + 1;
    month=month>=10?month:'0'+month;
    let day=d.getDate()>=10?d.getDate():'0'+d.getDate();
    let hour=d.getHours()>=10?d.getHours():'0'+d.getHours();
    let minute=d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes();
    let second=d.getSeconds()>=10?d.getSeconds():'0'+d.getSeconds();
    var times=year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;         
    return times;
});

