<template>
  <div v-loading="loading" style="width: 85%;margin-left: 13%;">
    <div class="house-title">
      {{ house.name }}
    </div>
    <div class="house-first">
      <div style="float: left;width:  650px">
        <img class="house-cover" :src="house.coverUrl">
      </div>
      <div class="house-info">
        <div style="border-bottom: 1px solid #F3F3F3">
          <span>
          <span class="house-rent">
          {{ house.rent }}
        </span>
        元/月
        </span>
          <span style="margin-left: 5px">({{ house.depositType.name }})</span>
        </div>

        <div class="house-info-first">
          <el-row>
            <el-col :span="12">
              <div class="house-item">
                <div class="tt">{{ house.layout }}</div>
                <div class="font">户型</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="house-item">
                <div class="tt">{{ house.area }}㎡</div>
                <div class="font">建筑面积</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="house-info-first">
          <el-row>
            <el-col :span="12">
              <div class="house-item">
                <div class="tt">{{ house.direction }}</div>
                <div class="font">朝向</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="house-item">
                <div class="tt">{{ house.floor }}层</div>
                <div class="font">楼层</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="house-info-first">
          <el-row>
            <el-col :span="12">
              <div class="house-item">
                <div class="tt">{{ house.electricUnitPrice }}度/元</div>
                <div class="font">电费</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="house-item">
                <div class="tt">{{ house.waterUnitPrice }}吨/元</div>
                <div class="font">水费</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="house-info-second">
          <div class="font" style="float: left">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</div>
          <div style="margin-left: 100px">{{ house.address }}</div>
          <div>
            <vue-star animate="animated rubberBand" color="#black">
              <a slot="icon" class="fa fa-heart"></a>
            </vue-star>
          </div>
        </div>

      </div>
    </div>

    <div class="house-second">
      <el-row>
        <el-col :span="13" style="border-right: 1px solid #F3F3F3;text-align: left">
          <div style="margin-bottom: 20px">
            <h1 style="">房源简介</h1>
            {{ house.info }}
          </div>
          <div v-for="photo in housePhotos">
            <img style="width:  600px" :src="photo.url"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            <el-card class="box-card">
              <div slot="header" style="text-align: left">
                <span>房东</span>
              </div>
              <div class="landlord-avatar">
                <el-avatar :size="70" :src="landlord.avatarUrl"/>
              </div>
              <div class="landlord-name">
                {{ landlord.identityName }}
              </div>
              <div style="width: 100%;border-bottom: 1px solid #EBEEF5;">
                <p>
                  <i class="el-icon-phone"></i>
                  {{ landlord.phone }}</p>
              </div>
              <div style="margin-top: 20px;">
                <el-button type="primary" @click="rentDialogVisible=true">预定租房</el-button>
              </div>
              <div>
                <el-dialog title="选择租房月份" :visible.sync="rentDialogVisible">
                  <div>
                    <el-form
                        v-model="rentForm"
                        :rules="rules">
                      <el-form-item label="起租时间" prop="beginDate">
                        <el-date-picker
                            v-model="rentForm.beginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            placeholder="选择起租时间">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="租房月数" prop="months">
                        <el-input-number size="small" v-model="rentForm.months" :min="3" :max="99"></el-input-number>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel">取 消</el-button>
                    <el-button type="primary" @click="handleSuccess">确 定</el-button>
                  </div>
                </el-dialog>

              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {houseInfo} from "@/api/house";
import {createOrder} from "@/api/order";

export default {
  name: "house-info",
  data() {
    return {
      house: {
        depositType: {name: '', code: null}
      },
      landlord: {},
      housePhotos: [],
      loading: false,
      rentDialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      rentForm: {
        houseId: this.$route.query.houseId,
        beginDate: '',
        months: 3,
      },
      rules: {
        // beginDate: [{required: true, message: '请选择起租时间', trigger: 'blur'}],
        // months: [{required: true, message: '请输入租房月数', trigger: 'blur'}],
      }
    }
  },
  methods: {
    handleCancel() {
      this.rentDialogVisible = false;
      this.rentForm = {
        houseId: this.$route.query.houseId,
        beginDate: '',
        months: 3
      }
    },
    handleSuccess() {
          this.$confirm('您确定要创建订单吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            createOrder(this.rentForm).then(resp => {
              this.$message.success('租房预定成功!');
              this.$router.go(0);
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消创建'
            });
          });
    },
    getHouseInfo() {
      this.loading = true
      houseInfo(this.rentForm.houseId).then(resp => {
        this.loading = false;
        this.house = resp.data.house;
        this.landlord = resp.data.houseUserVO;
        this.housePhotos = resp.data.photoUrlList;
      })
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:white');
    this.getHouseInfo();
  }
}
</script>

<style scoped>
.house-first {
  margin-top: 10px;
  height: 500px;
  border-bottom: 1px solid #F3F3F3;
  margin-bottom: 5px;
}

.house-second {
}

.house-title {
  padding: 50px 0 15px 0;
  text-align: left;
  font-family: 微軟正黑體;
  font-size: 30px;
  font-weight: bolder;
}

.house-cover {
  /*border-bottom-left-radius: 5px;*/
  /*border-top-left-radius: 5px;*/
  border-radius: 2px;
  border: 1px solid #F3F3F3;
  width: 100%;
  height: 100%;
}

.house-info {
  text-align: left;
  width: 40%;
  margin-left: 670px;
}

.house-rent {
  font-size: 40px;
  font-weight: bold;
  color: #df2f30;
}

.house-info-first {
  border-bottom: 1px solid #F3F3F3;
  padding: 20px 0;
  height: 50px;
}

.house-info-second {
  margin-top: 40px;
}

.house-item {
  width: 182px;
  float: left;
  text-align: left;
  font-size: 12px;
}

.tt {
  font-size: 20px;
  color: #333;
  margin-bottom: 6px;
}

.font {
  font-size: 14px;
  color: #999999;
}

.landlord-avatar {
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.landlord-name {
  margin-top: 5px;
}

.box-card {
  width: 400px;
}
</style>
