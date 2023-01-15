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
          <span style="margin-left: 5px">({{ house.depositType }})</span>
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
        </div>

      </div>
    </div>

    <div class="house-second">

      <div style="float: left;width: 60%;text-align: left;border-right: 1px solid #F3F3F3;">
        <div style="margin-bottom: 20px">
          <h1>房源简介</h1>
          {{ house.info }}
        </div>
        <div v-for="photo in housePhotos">
          <img style="width:  600px" :src="photo"/>
        </div>
      </div>

      <div style="width: 300px;float: right;
    min-height: 250px;
    margin-right: 15%;
    padding-bottom: 10px;">
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
          <div>
            <p>
              <i class="el-icon-phone"></i>
              {{ landlord.phone }}</p>
          </div>
        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
import {houseInfo} from "@/api/house";

export default {
  name: "house-info",
  data() {
    return {
      houseId: this.$route.query.houseId,
      house: {},
      landlord: {},
      housePhotos: [],
      loading: false
    }
  },
  methods: {
    getHouseInfo() {
      this.loading=true
      houseInfo(this.houseId).then(resp => {
        this.loading=false;
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
  width: 100%;
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
</style>
