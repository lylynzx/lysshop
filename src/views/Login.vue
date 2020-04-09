<!--  -->
<template>
  <div>
    <p>Welcome to login page</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Phone Number" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="info" round @click="clickToClose">click to close</el-button>
    
  </div>
</template>

<script>
import { LOG_IN } from "@/store/mutation-type.js";
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("请输入数字值"));
        } else {
          if (value.length != 11) {
            callback(new Error("手机号码非法"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        if (value.length < 6 || value.length > 15) {
          callback(new Error("手机号码非法"));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      ruleForm: {
        phoneNumber: "",
        pwd: ""
      },
      rules: {
        phoneNumber: [{ validator: checkNumber, trigger: "blur" }],
        pwd: [{ validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");

          this.$store
            .dispatch(LOG_IN, this.ruleForm)
            .then(res => {
              this.$message({
                message: "恭喜你，登录成功，即将返回上一页...",
                type: "success"
              });
              setTimeout(() => {
                this.$router.go(-1);
              }, 500);
            })
            .catch(res => {
              this.$message.error(res);
              this.resetForm("ruleForm");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clickToClose(){
        this.$router.go(-1)
    }
  }
};
</script>
}

<style scoped>
form {
    padding: 3rem 1rem;
}
/* @import url(); 引入css类 */
</style>