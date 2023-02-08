<template>
  <div v-loading="loading">
    <el-form :model="form" ref="houseRef" :rules="rules" label-width="120px">
      <el-form-item label="封面图片" prop="coverUrl">
        <el-upload
            class="avatar-uploader"
            action="/oss/upload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            accept="image/jpg,image/jpeg,image/png"
            :headers="headers"
        >
          <img v-if="form.coverUrl" :src="form.coverUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="width: 600px" label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入房源标题名称"></el-input>
      </el-form-item>
      <el-form-item style="width: 600px" label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入房屋地址(如南山区西丽镇茶光小区)"></el-input>
      </el-form-item>
      <div style="margin-bottom: 20px;">
        <el-form-item style="width: 350px" label="城市" prop="city">
          <el-select v-model="form.city" placeholder="城市">
            <el-option label="北京" value="北京"></el-option>
            <el-option label="上海" value="上海"></el-option>
            <el-option label="广州" value="广州"></el-option>
            <el-option label="深圳" value="深圳"></el-option>
            <el-option label="杭州" value="杭州"></el-option>
            <el-option label="武汉" value="武汉"></el-option>
            <el-option label="长沙" value="长沙"></el-option>
            <el-option label="大连" value="大连"></el-option>
            <el-option label="厦门" value="厦门"></el-option>
            <el-option label="南京" value="南京"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="门牌号" prop="houseNumber">
            <el-input v-model="form.houseNumber" placeholder="请输入门牌号(如603)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="面积" prop="area">
            <el-input-number v-model="form.area" :min="1" :precision="2"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="楼层数" prop="floor">
            <el-input-number v-model="form.floor" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="朝向" prop="direction">
            <el-select v-model="form.direction" placeholder="请选择朝向">
              <el-option label="东" value="东"></el-option>
              <el-option label="南" value="南"></el-option>
              <el-option label="西" value="西"></el-option>
              <el-option label="北" value="北"></el-option>
              <el-option label="东南" value="东南"></el-option>
              <el-option label="西南" value="西南"></el-option>
              <el-option label="东北" value="东北"></el-option>
              <el-option label="西北" value="西北"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="房间" prop="rooms">
            <el-input-number v-model="form.rooms" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客厅" prop="livingRooms">
            <el-input-number v-model="form.livingRooms" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卫生间" prop="bathrooms">
            <el-input-number v-model="form.bathrooms" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="电费单价(度/元)" prop="electricUnitPrice">
            <el-input-number v-model="form.electricUnitPrice" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="水费单价(吨/元)" prop="waterUnitPrice">
            <el-input-number v-model="form.waterUnitPrice" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="租金" prop="rent">
            <el-input-number v-model="form.rent" :precision="2" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="押付类型" prop="depositType">
            <el-select v-model="form.depositType" placeholder="请选择押付类型">
              <el-option label="押一付一" :value="0"></el-option>
              <el-option label="押二付一" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="简介描述" prop="info">
        <el-input type="textarea" rows="5" v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item label="图片列表">
        <div class="upload-div">
          <el-upload
              class="upload-demo"
              action="/oss/upload"
              :file-list="form.photoUrlList"
              :on-success="handleUploadFilesSuccess"
              :on-remove="handleRemove"
              :before-upload="handleBeforeUpload"
              :headers="headers"
              :limit="9"
              list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3mb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-button @click="handleCancel">返回</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import {houseInfo, createHouse, updateHouse} from "@/api/house";

export default {
  name: "house-details",
  data() {
    return {
      houseId: this.$route.query.houseId,
      loading: false,
      form: {
        id: null,
        name: '',
        address: '',
        houseNumber: '',
        city: '',
        area: null,
        floor: null,
        direction: '',
        layout: '',
        coverUrl: '',
        info: '',
        rent: null,
        depositType: null,
        electricUnitPrice: null,
        waterUnitPrice: null,
        photoUrlList: [],
        rooms: 0,
        livingRooms: 0,
        bathrooms: 0
      },
      rules: {
        name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        houseNumber: [{required: true, message: '请输入门牌号', trigger: 'blur'}],
        city: [{required: true, message: '请输入城市', trigger: 'blur'}],
        area: [{required: true, message: '请输入面积', trigger: 'blur'}],
        floor: [{required: true, message: '请输入楼层数', trigger: 'blur'}],
        direction: [{required: true, message: '请输入朝向', trigger: 'blur'}],
        rooms: [{required: true, message: '请输入房间', trigger: 'blur'}],
        livingRooms: [{required: true, message: '请输入客厅', trigger: 'blur'}],
        bathrooms: [{required: true, message: '请输入卫生间', trigger: 'blur'}],
        coverUrl: [{required: true, message: '请上传封面图片', trigger: 'blur'}],
        info: [{required: true, message: '请输入简介描述', trigger: 'blur'}],
        rent: [{required: true, message: '请输入租金', trigger: 'blur'}],
        depositType: [{required: true, message: '请输入押付类型', trigger: 'blur'}],
        electricUnitPrice: [{required: true, message: '请输入电费单价', trigger: 'blur'}],
        waterUnitPrice: [{required: true, message: '请输入水费单价', trigger: 'blur'}],
      },
      headers: {
        Authorization: this.$store.state.token
      },
    }
  },
  methods: {
    handleUploadSuccess(res, file) {
      this.form.coverUrl = res.data;
    },
    handleUploadFilesSuccess(res, file) {
      this.form.photoUrlList.push({name: file.name, uid: file.uid, url: res.data});
    },
    handleRemove(file, fileList) {
      this.form.photoUrlList = this.form.photoUrlList.filter(value => value.uid !== file.uid);
    },
    handleLayout() {
      this.form.layout = this.form.layout.replace('室', '.');
      this.form.layout = this.form.layout.replace('厅', '.');
      this.form.layout = this.form.layout.replace('卫', '.');
      this.form.rooms = this.form.layout.split('.')[0];
      this.form.livingRooms = this.form.layout.split('.')[1];
      this.form.bathrooms = this.form.layout.split('.')[2];
    },
    handleCancel() {
      this.$router.replace('/home/house');
    },
    handleBeforeUpload(file) {
      let types = ['image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/png'];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG、JPEG、gif、bmp、PNG 格式!');
        return false;
      }
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    handleSubmit() {
      this.spliceLayout();
      this.$confirm('您确定要提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.houseRef.validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.form.id != null) {
              updateHouse(this.form).then(resp => {
                this.loading = false;
                this.$message.success("更新成功");
                this.$router.replace('/home/house');
              }).catch(error => {
                this.loading = false;
              })
            } else {
              createHouse(this.form).then(resp => {
                this.loading = false;
                this.$message.success("创建成功");
                this.$router.replace('/home/house');
              }).catch(error => {
                this.loading = false;
              })
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    spliceLayout() {
      this.form.layout = this.form.rooms + '室' + this.form.livingRooms + '厅' + this.form.bathrooms + '卫';
    },
    getHouseDetails() {
      if (this.houseId != null) {
        this.loading = true;
        houseInfo(this.houseId).then(resp => {
          this.loading = false;
          this.form = resp.data.house;
          this.form.depositType = this.form.depositType.code;
          this.form.photoUrlList = resp.data.photoUrlList;
          this.handleLayout();
        })
      }
    }
  },
  mounted() {
    this.getHouseDetails();
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 220px;
  height: 200px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 220px;
  height: 200px;
  display: block;
}

.upload-div {
  padding: 24px;
  float: left;
  border: 1px solid #DCDFE6;
  background-color: white;
  width: 500px;
}
</style>
