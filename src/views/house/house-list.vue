<template>
  <div>
    <div style="margin-bottom: 8px;float: left">
      <el-button type="primary" @click="addHouse">新增房源</el-button>
    </div>
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
            label="名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="150">
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
        <el-table-column
            prop="shelfStatus"
            label="上架状态"
            width="120">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.shelfStatus.name === '已上架' ? 'success' : 'info'"
                disable-transitions>{{ scope.row.shelfStatus.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="rentalStatus"
            label="出租状态"
            width="120">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.rentalStatus.name === '已出租' ? 'success' : 'info'"
                disable-transitions>{{ scope.row.rentalStatus.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="freezeStatus"
            label="冻结状态"
            width="150">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.freezeStatus.name === '未冻结' ? 'success' : 'danger'"
                disable-transitions>{{ scope.row.freezeStatus.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button
                v-if="scope.row.shelfStatus.name==='未上架'"
                @click="onShelf(scope.row.id)"
                type="text"
                size="small">
              上架
            </el-button>
            <el-button @click="viewHouseDetails(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="removeHouse(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
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

import {createHouse, findOwnHousePage, onShelfHouse, removeHouse, updateHouse} from "@/api/house";

export default {
  name: "house-list",
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
    handleQuery() {
      this.getHouseList();
    },
    resetQuery() {
      this.queryParams = {
        page: 1,
        limit: 10,
        shelfStatus: null,
        freezeStatus: null,
        rentalStatus: null
      };
      this.getHouseList()
    },
    addHouse() {
      this.$router.push('/home/house/details');
    },
    viewHouseDetails(houseId) {
      this.$router.push({
        name: 'house-details',
        query: {
          houseId: houseId
        }
      });
    },
    onShelf(houseId) {
      onShelfHouse(houseId).then(resp => {
        this.$message.success('上架成功')
        this.getHouseList();
      })
    },
    getHouseList() {
      this.loading = true;
      findOwnHousePage(this.queryParams).then(resp => {
        this.houseList = resp.data.records;
        this.total = resp.data.total;
        this.loading = false;
      })
    },
    removeHouse(houseId){
        this.$confirm('您确定要删除该房源吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeHouse(houseId).then(resp=>{
            this.$message.success("删除成功");
            this.getHouseList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    }
  },
  mounted() {
    this.getHouseList();
  }
}
</script>

<style scoped>

</style>
