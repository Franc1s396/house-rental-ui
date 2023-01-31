<template>
  <div>
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
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="collectRent(scope.row)" type="text" size="small">收租</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog
          v-loading="dialogLoading"
          title="账单"
          :visible.sync="billDialogVisible"
          width="1000px"
          append-to-body>
        <el-form :model="billDialog.billForm" ref="billRef" :rules="rules" label-width="120px">
          <el-form-item label="订单号">
            <el-input style="width: 50%" v-model="billDialog.orderNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单租金">
            <el-input style="width: 50%" v-model="billDialog.houseRent" disabled></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="上期电表读数" prop="lastElectricNumber">
                <el-input-number v-model="billDialog.billForm.lastElectricNumber" size="mini"
                                 :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本期电表读数" prop="nowElectricNumber">
                <el-input-number v-model="billDialog.billForm.nowElectricNumber" size="mini" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电费">
                <el-input v-model="billDialog.electricBill" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="上期水表读数" prop="lastWaterNumber">
                <el-input-number v-model="billDialog.billForm.lastWaterNumber" size="mini" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本期水表读度" prop="nowWaterNumber">
                <el-input-number v-model="billDialog.billForm.nowWaterNumber" size="mini" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="水费">
                <el-input v-model="billDialog.waterBill" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="总费用">
              <el-input style="width: 50%" v-model="billDialog.totalBill" disabled></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="previewBill">预览租金费用</el-button>
          <el-button @click="handleBillCancel">取 消</el-button>
          <el-button type="primary" @click="handleCreateBill">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {allRentableOrderList} from "@/api/order";
import {billPreview, createBill} from "@/api/bill";
import {Message} from "element-ui";
import store from "@/store";

export default {
  name: "rentable-order",
  data() {
    return {
      orderList: [],
      loading: false,
      dialogLoading: false,
      billDialogVisible: false,
      billDialog: {
        orderNo: '',
        houseRent: null,
        billForm: {
          orderId: null,
          lastElectricNumber: null,
          nowElectricNumber: null,
          lastWaterNumber: null,
          nowWaterNumber: null
        },
        electricBill: null,
        waterBill: null,
        totalBill: null,
      },
      rules: {
        lastElectricNumber: [{required: true, message: "上期电表读数不能为空", trigger: "blur"}],
        nowElectricNumber: [{required: true, message: "本期电表读数不能为空", trigger: "blur"}],
        lastWaterNumber: [{required: true, message: "上期水表读数不能为空", trigger: "blur"}],
        nowWaterNumber: [{required: true, message: "本期水表读数不能为空", trigger: "blur"}],
      }
    }
  },
  methods: {
    handleBillCancel() {
      this.billDialogVisible = false;
      this.billDialog = {
        orderNo: '',
        houseRent: null,
        billForm: {
          orderId: null,
          lastElectricNumber: null,
          nowElectricNumber: null,
          lastWaterNumber: null,
          nowWaterNumber: null
        },
        electricBill: null,
        waterBill: null,
        totalBill: null,
      };
    },
    handleCreateBill() {
      this.$confirm('您确定要创建收租账单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createBill(this.billDialog.billForm).then(resp => {
          this.billDialogVisible = false;
          this.handleBillCancel();
          this.$message.success('创建成功');
          this.getOrderList();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消创建'
        });
      });
    },
    previewBill() {
      this.dialogLoading = true;
      billPreview(this.billDialog.billForm).then(resp => {
        this.dialogLoading = false;
        this.billDialog.waterBill = resp.data.waterBill;
        this.billDialog.electricBill = resp.data.electricBill;
        this.billDialog.totalBill = resp.data.totalAmount;
      })
    },
    getOrderList() {
      this.loading = true;
      allRentableOrderList().then(resp => {
        this.loading = false;
        this.orderList = resp.data;
      })
    },
    collectRent(data) {
      this.billDialogVisible = true;
      this.billDialog.billForm.orderId = data.id;
      this.billDialog.orderNo = data.orderNo;
      this.billDialog.houseRent = data.houseRent;
    }
  },
  mounted() {
    this.getOrderList();
  }
}
</script>

<style scoped>

</style>
