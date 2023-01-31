<template>
  <div>
    <div style="float: left;margin-bottom: 20px">
      <el-form
          :model="queryParams"
          :inline="true"
          label-width="68px">
        <el-form-item label="关键字" prop="keyword">
          <el-input
              v-model="queryParams.keyword"
              placeholder="请输入关键字"
              clearable
          />
        </el-form-item>
        <el-form-item label="订单状态" prop="type">
          <el-select v-model="queryParams.orderStatus" placeholder="订单状态" clearable>
            <el-option label="等待业主确认" :value="0"></el-option>
            <el-option label="等待租客签约" :value="1"></el-option>
            <el-option label="签约成功" :value="2"></el-option>
            <el-option label="已取消" :value="3"></el-option>
            <el-option label="已完成" :value="4"></el-option>
            <el-option label="已过期" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
          v-loading="loading"
          :data="orderList"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="orderNo"
            label="订单号"
            width="170">
        </el-table-column>
        <el-table-column
            prop="tenantName"
            label="租客姓名"
            width="80">
        </el-table-column>
        <el-table-column
            prop="landlordName"
            label="房东姓名"
            width="80">
        </el-table-column>
        <el-table-column
            prop="img"
            label="房源封面"
            width="180">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.houseCoverUrl" alt="" style="width: 140px;height: 100px">
          </template>
        </el-table-column>
        <el-table-column
            prop="houseName"
            label="房源名称"
            width="220">
        </el-table-column>
        <el-table-column
            prop="houseNumber"
            label="门牌号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="houseLayout"
            label="户型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="houseRent"
            label="租金"
            width="100">
        </el-table-column>
        <el-table-column
            prop="depositType.name"
            label="押付类型"
            width="100">
        </el-table-column>
        <el-table-column
            prop="orderStatus"
            label="订单状态"
            width="120">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.orderStatus.name === '签约成功' ? 'success' : 'danger'"
                disable-transitions>{{ scope.row.orderStatus.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button
                v-if="scope.row.orderStatus.name==='等待租客签约'"
                @click="signOrder(scope.row.id)"
                type="text"
                size="small">
              签约
            </el-button>
            <el-button @click="viewOrder(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="cancelOrder(scope.row.id)" type="text" size="small">取消</el-button>
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
    <div>
      <el-dialog title="订单详情" :visible.sync="orderDetailsDialog">
        <div style="margin-bottom: 10px;text-align: left">
          订单号:{{ orderDetails.orderNo }}
        </div>
        <el-row>
          <el-col :span="4">
            <span>租客姓名:</span>
            <span class="tt">{{ orderDetails.tenantName }}</span>
          </el-col>
          <el-col :span="8">
            <span>租客身份证号:</span>
            <span class="tt">{{ orderDetails.tenantNo }}</span>
          </el-col>
          <el-col :span="4">
            <span>房东姓名:</span>
            <span class="tt">{{ orderDetails.landlordName }}</span>
          </el-col>
          <el-col :span="8">
            <span>房东身份证号:</span>
            <span class="tt">{{ orderDetails.landlordNo }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>房源名称:</span>
            <span class="tt">{{ orderDetails.houseName }}</span>
          </el-col>
          <el-col :span="6">
            <span>门牌号</span>
            <span class="tt">{{ orderDetails.houseNumber }}</span>
          </el-col>
          <el-col :span="6">
            <span>地址</span>
            <span class="tt">{{ orderDetails.houseAddress }}</span>
          </el-col>
          <el-col :span="6">
            <span>户型</span>
            <span class="tt">{{ orderDetails.houseLayout }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>封面地址</span>
            <span class="tt"></span>
          </el-col>
          <el-col :span="6">
            <span>租金</span>
            <span class="tt">{{ orderDetails.houseRent }}</span>
          </el-col>
          <el-col :span="6">
            <span>押金</span>
            <span class="tt">{{ orderDetails.houseDeposit }}</span>
          </el-col>
          <el-col :span="6">
            <span>押付类型</span>
            <span class="tt">{{ orderDetails.depositType.name }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>电费单价</span>
            <span class="tt">{{ orderDetails.electricUnitPrice }}元/度</span>
          </el-col>
          <el-col :span="6">
            <span>水费单价</span>
            <span class="tt">{{ orderDetails.waterUnitPrice }}元/吨</span>
          </el-col>
          <el-col :span="6">
            <span>起租时间</span>
            <span class="tt">{{ orderDetails.beginTime }}</span>
          </el-col>
          <el-col :span="6">
            <span>退租时间</span>
            <span class="tt">{{ orderDetails.endTime }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>订单状态</span>
            <el-tag
                style="margin-left: 20px"
                :type="orderDetails.orderStatus.name === '签约成功' ? 'success' : 'danger'"
                disable-transitions>{{ orderDetails.orderStatus.name }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <span>创建时间</span>
            <span class="tt">{{ orderDetails.gmtCreate }}</span>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="orderDetails.contractUrl!=null"
                     @click="viewContract"
                     type="primary">
            查看合同
          </el-button>
          <el-button @click="handleDialogCancel">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {tenantOrderList, orderInfo, cancelOrder} from "@/api/order";
import {createHouse, updateHouse} from "@/api/house";

export default {
  name: "tenant-order",
  data() {
    return {
      orderList: [],
      orderDetails: {
        orderStatus: {name: '', code: null},
        depositType: {name: '', code: null}
      },
      queryParams: {
        page: 1,
        limit: 10,
        keyword: '',
        orderStatus: null
      },
      total: 0,
      loading: false,
      orderDetailsDialog: false,
      dialogLoading: false,
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
      this.getOrderList();
    },
    resetQuery() {
      this.queryParams = {
        page: 1,
        limit: 10,
        keyword: '',
        orderStatus: null
      };
      this.getOrderList()
    },
    handleDialogCancel() {
      this.orderDetailsDialog = false;
      this.orderDetails = {
        orderStatus: {name: '', code: null},
        depositType: {name: '', code: null}
      };
    },
    viewOrder(orderId) {
      this.orderDetailsDialog = true;
      this.getOrder(orderId);
    },
    viewContract() {
      window.open(this.orderDetails.contractUrl, '_blank');
    },
    signOrder(orderId) {
      this.$router.replace({
        name: 'contract',
        query: {
          orderId: orderId
        }
      })
    },
    cancelOrder(orderId) {
      this.$confirm('您确定要取消订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelOrder(orderId).then(resp => {
          this.$message.success('取消成功');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    getOrderList() {
      this.loading = true;
      tenantOrderList(this.queryParams).then(resp => {
        this.orderList = resp.data.records;
        this.total = resp.data.total;
        this.loading = false;
      })
    },
    getOrder(orderId) {
      this.dialogLoading = false;
      orderInfo(orderId).then(resp => {
        this.dialogLoading = true;
        this.orderDetails = resp.data;
      })
    }
  },
  mounted() {
    this.getOrderList();
  }
}
</script>

<style scoped>
.tt {
  font-size: 15px;
  color: black;
  font-weight: bold;
  margin-left: 5px;
}

.el-row {
  margin-bottom: 30px;
}

.el-col {
  text-align: left;
}
</style>
