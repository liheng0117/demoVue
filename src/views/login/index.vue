<template>
  <div class="login" :style="loginBackground">
    <div class="login-model">
      <el-form :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import './style.less';

export default {
  data() {
    return {
      loginBackground: {
        backgroundImage: "url(" + require("../../assets/img/bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      form: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapState("login", ["user"])
  },
  methods: {
    ...mapActions("login", ["FETCH_LOGIN_ACTION"]),
    submitForm() {
      this["FETCH_LOGIN_ACTION"](this.form);
    }
  },
  watch: {
    user(user) {
      user ? this.$router.push("/") : null;
    }
  }
};
</script>