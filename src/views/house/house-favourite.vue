<template>
  <div>
    <div>
      <el-table
          v-loading="loading"
          :data="houseList"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="id"
            label="编号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称(可点击跳转)"
            width="310">
          <template slot-scope="scope">
            <span class="routerHouse" @click="handleRouterHouse(scope.row.id)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="250">
        </el-table-column>
        <el-table-column
            prop="coverUrl"
            label="封面"
            width="180">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.coverUrl" alt="" style="width: 140px;height: 100px">
          </template>
        </el-table-column>
        <el-table-column
            prop="houseNumber"
            label="门牌号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="layout"
            label="户型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="rent"
            label="租金"
            width="100">
        </el-table-column>
        <el-table-column
            prop="depositType.name"
            label="押付类型"
            width="100">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
          style="margin-top: 15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.page"
          :page-size="queryParams.limit"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {findOwnHousePage} from "@/api/house";

export default {
  name: "house-favourite",
  data() {
    return {
      loading: false,
      houseList: [],
      queryParams: {
        page: 1,
        limit: 10,
      },
      total: 0,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.limit = val;
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
    },
    handleRouterHouse(houseId) {
      let newUrl=this.$router.resolve({
        path:'/house/info',
        query: {
          houseId: houseId
        }
      })
      window.open(newUrl.href, '_blank');
    },
    getHouseList() {
      this.loading = true;
      findOwnHousePage(this.queryParams).then(resp => {
        this.houseList = resp.data.records;
        this.total = resp.data.total;
        this.loading = false;
      })
    },
  },
  mounted() {
    this.getHouseList()
  }
}
</script>

<style scoped>
.routerHouse {
  cursor: pointer;
  font-weight: bold;
}

.routerHouse:hover {
  text-decoration: underline;
}
</style>
