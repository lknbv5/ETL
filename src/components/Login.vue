<template>
  <div class="login-container">
    <h4 class="login-title">港通云中枢</h4>
    <a-form ref="form" :model="form" class="login-form">
      <h2 class="title">用户登录</h2>
      <a-form-item>
        <a-input class="inputBox" v-model:value="form.userName" placeholder="请输入用户名">
          <template #prefix>
           <UserOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password class="inputBox" v-model:value="form.passWord" placeholder="请输入密码" v-on:keyup.enter="onSubmit">
          <template #prefix>
            <KeyOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button class="submit" type="primary" @click="onSubmit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {login} from "../util/Apiservice"

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
      },
    };
  },
  methods: {
    onSubmit() {
      //登陆操作
      login(this.form).then(res=>{
          localStorage.setItem('token',res.token);
          this.$router.replace({ name: "ProjectSetting" });
      }).catch(()=>{
          this.$antdmessage.error("用户名或密码错误");
      })
      
    },
  },
};
</script>

<style scoped>
/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/houTaiBg.png");
}
.login-container .login-form {
  width: 500px;
  height: 350px;
  margin: 0 auto;
  background: url("../assets/houTaiKuang.png");
  background-size: 100% 100%;
  padding: 40px 110px;
}
/* Log */
.login-title {
  color: #fff;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 50px;
  font-size: 48px;
  font-family: 楷体;
}
/* 登陆按钮 */
.submit {
  width: 100%;
  height: 45px;
  font-size: 16px;
}
/* 用户登陆标题 */
.title {
  margin-bottom: 30px;
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  font-family: 幼圆;
}
/* 输入框 */
.inputBox {
  height: 40px;
  padding-left: 15px;
}
/* 输入框内左边距50px */
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
</style>