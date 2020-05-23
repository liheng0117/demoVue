<template>
  <div class="home">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>首页</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-button type="success" @click="addClick">添加用户</el-button>
        <el-table :data="tableData">
          <el-table-column label="供应商">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.supplierContact }}</span>
            </template>
          </el-table-column>

          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.supplierName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系电话">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="预付款">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status" style="margin-left: 10px"><el-tag type="success">启用</el-tag></span>
              <span v-else style="margin-left: 10px"><el-tag type="danger">禁用</el-tag></span>
            </template>
          </el-table-column>

          <el-table-column label="描述">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!-- 模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form label-width="110px" :model="form" ref="form">
            <el-form-item label="供应商名称">
              <el-input v-model="form.supplierContact"></el-input>
            </el-form-item>
            <el-form-item label="供应商联系人">
              <el-input v-model="form.supplierName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="0">启用</el-radio>
                <el-radio label="1">未启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">
              确 定
            </el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import './style.less'

export default {
  data() {
    return {
      dialogFormVisible: false, // 模态框是否关闭
      title: "", //  模态框标题
      index:'',
      form: {
        // 模态框里的form表单的值
        address: '',
        supplierName: '',
        phone: '',
        supplierContact: '',
        status: '',
        description: '',
        supplierId: '',
      },
    }
  },
  created() {
    this.$store.dispatch("FETCH_HOME_ACTION");
  },
  computed: {
    ...mapState(["tableData"])
  },
  methods: {
    //  点击修改按钮
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.title = "编辑";
      this.index = row.id;
      this.form=row
    },
    //  点击删除按钮
    handleDelete(index, row) {
      let obj = { id: row.supplierId };
      this.$store.dispatch("FETCH_ACTION_DELETE", obj);
    },
    //  点击添加按钮
    addClick() {
      this.dialogFormVisible = true;
      this.title = "添加";
    },
    //  模态框确定按钮
    submitForm() {
      this.dialogFormVisible = false;
      if (this.title === "添加") {
        this.$store.dispatch("FETCH_ACTION_ADD", this.form);
      } else {
        let obj = { ...this.form, id: this.index };
        this.$store.dispatch("FETCH_ACTION_UPDATE", obj);
      }
    },
  }
}
</script>