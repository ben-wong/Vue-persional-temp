<template>
<div class="edu-table">
  <p>{{ tableAttr.title }}</p>
  <el-table :data="tableData" style="width: 100%;">
    <el-table-column prop="" :label="labelName" width="180px" :show-overflow-tooltip="true" align="left">
      <template slot-scope="scope">
        <div class="edu-text-ellipsis">{{ scope.row.dimName || '-' }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="" width="50px" align="left">
      <template slot-scope="scope">
        <i class="el-icon-document-copy" @click="copy(scope.row.dimId)"></i>
      </template>
    </el-table-column>
    <el-table-column :label="tableAttr.flowName" min-width="280px" align="center">
      <template slot-scope="scope">
        <el-progress
          type="line"
          :text-inside="true"
          :percentage="decToPercentage(scope.row.quantity)"
          :color="scope.row.color"
          :format="formatNull"
        ></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="quantity" label="" width="104px" align="right">
      <template slot-scope="scope">{{ formatNum(scope.row.quantity) }}</template>
    </el-table-column>
    <el-table-column v-if="tableAttr.moreCol" label="" max-width="46px" align="right">
      <template slot-scope="scope">{{ scope.row.ratio | percentMax }}</template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { toThousandsInt, toThousands } from '@/utils/index';
export default {
  name: 'TopTableView',
  props: {
    tableAttr: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: '-',
          moreCol: 0,
          flowName: '',
          type: ''
        };
      }
    },
    labelName: {
      type: String,
      required: false,
      default: () => '课程名称'
    },
    tableData: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    formatNull() {
      return '';
    },
    formatNum(val) {
      if (this.tableAttr.type === 'dot') {
        return toThousands(val);
      }
      return toThousandsInt(val);
    },
    decToPercentage(val) {
      const all = this.tableData[0].quantity || '1.0'; // 以第一行的quantity为基准
      return val / all * 100;
    },
    copy(val) {
      const ele = document.createElement('input');
      ele.setAttribute('value', val);
      document.body.appendChild(ele);
      ele.select();
      const isCopy = document.execCommand('copy');
      document.body.removeChild(ele);
      if (isCopy) {
        this.$message({
          message: 'ID复制成功！',
          type: 'success'
        });
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.annual-total {
  text-align: start;
  height: 60px;
}
.edu-lesson-name {
  display: flex;
  align-items: center;
  box-sizing: border-box
}
.el-icon-document-copy {
  padding-top: 4px;
  width:18px;
  height: 14px;
}
.el-icon-document-copy:hover {
  cursor: pointer;
  color: #1387FF;
}
.el-table >>> .cell {
  line-height: 12px;
  font-size: 12px;
  height: 12x;
}
.el-table >>> th:first-of-type .cell,
.el-table >>> td:first-of-type .cell {
  padding-left: 0;
}
.el-table >>> td, .el-table >>> th{
  padding-top: 6px;
  padding-bottom: 6px;
  border: none;
}
.el-table >>> th {
  border-bottom: 1.2px soldimId #EBEEF5
}
.el-table::before {
  height: 0;
}
.edu-text-ellipsis{
  display: inline;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
