<template>
  <div class="reportTable" v-loading="tableLoading || tableOtherLoading">
    <down-excel
      :groupTypeConfig="groupTypeConfig"
      :tableDatas="tableDateCopyInit"
      reportFlag="downloadAndInstallReport">
    </down-excel>
    <el-table
      :data="tableDateCopy"
      stripe
      style="width: 100%">
      <el-table-column :label="tableLabelOne" min-width="90" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="groupType === '1'">{{ scope.row.time }}</span>
          <span v-else-if="groupType === '2'">{{ scope.row.countryName }}</span>
          <span v-else-if="groupType === '4'">{{ scope.row.appVersion }}</span>
          <span v-else-if="groupType === '6'">{{ scope.row.businessType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="exposureCnt" label="曝光" min-width="90" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="应用在应用市场推荐、排行榜、搜索等资源位被展示次数">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="detailsPageCnt" label="详情页查看" min-width="130" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="详情页被浏览的次数">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="downCnt" label="总下载成功" min-width="120" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="更新下载成功 + 新下载成功">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="updateDownCnt" label="更新下载成功" min-width="120" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="用户通过华为应用市场更新应用版本产生的下载成功量">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="nonUpdateDownCnt" label="新下载成功" min-width="120" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="用户通过华为应用市场新增应用版本产生的下载成功量">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="exposureClickRate" label="曝光点击率" min-width="130" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="（详情页查看次数+快捷下载成功次数）/曝光次数">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="detailPageConversionRate" label="详情页转化率" min-width="140" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="详情页带来的新下载成功量/详情页查看量">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="installSuccessRate" label="安装成功率" min-width="130" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="{ column }">
          <span>{{ column.label }}</span>
          <el-popover
            placement="top"
            trigger="hover"
            content="应用下载成功后安装成功的比率">
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { toThousandsInt, percentMax } from '@/utils/agcReportIndex';
import { COUNTRIES_ENUM } from '@/const/agcReport/countrylists';
import DownExcel from './../common/DownExcel';
export default {
  name: 'ReportTable',
  components: {
    DownExcel
  },
  props: {
    listDatas: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    otherDatas: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    otherDatasFlag: {
      type: Boolean,
      required: true,
      default: false
    },
    groupType: {
      type: String,
      required: true,
      default: '1', // 默认表格第一列展示时间
    },
    tableLoading: {
      type: Boolean,
      required: true,
      default: false
    },
    tableOtherLoading: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      total: 0,
      tableDate: [],
      tableDateCopy: [],
      tableDateCopyInit: [], // 用于分页
      tableLabelOne: '时间',
      // 导出组件使用
      groupTypeConfig: {
        firstColumnName: '日期',
        firstColumnValue: 'time',
        groupType: 'date',
        currency: 'CNY'
      }
    };
  },
  watch: {
    listDatas: {
      handler(val, oldVal) {
        // 取表格top5数据
        this.getTop5Code();
        // 处理表格展示数据
        this.queryDatas();
      },
      deep: true,
    },
    otherDatasFlag(val, oldVal) {
      this.queryDatas();
    },
    groupType(val, oldVal) {
      if (val === '2') {
        this.tableLabelOne = '国家/地区';
        // 更新下发给导出组件数据
        this.groupTypeConfig.firstColumnName = '国家/地区';
        this.groupTypeConfig.firstColumnValue = 'countryName';
        this.groupTypeConfig.groupType = 'country';
      } else if (val === '4') {
        this.tableLabelOne = '应用版本';
        // 更新下发给导出组件数据
        this.groupTypeConfig.firstColumnName = '应用版本';
        this.groupTypeConfig.firstColumnValue = 'appVersion';
        this.groupTypeConfig.groupType = 'appVersion';
      } else if (val === '6') {
        this.tableLabelOne = '业务类型';
        // 更新下发给导出组件数据
        this.groupTypeConfig.firstColumnName = '业务类型';
        this.groupTypeConfig.firstColumnValue = 'businessType';
        this.groupTypeConfig.groupType = 'businessType';
      } else {
        this.tableLabelOne = '时间';
        // 更新下发给导出组件数据
        this.groupTypeConfig.firstColumnName = '日期';
        this.groupTypeConfig.firstColumnValue = 'time';
        this.groupTypeConfig.groupType = 'date';
      }
    }
  },
  methods: {
    queryDatas() {
      this.analysisDats();
    },
    /*
     ** 取表格top5数据
     ** 1. groupType=2，表格top5国家码
     ** 2. groupType=4，表格top5版本号
    */
    getTop5Code() {
      // 如果展示依据是国家，按照这段时间内新下载成功排序。取前5个国家的id，用于获取top5的国家情况数据
      let Top5List = [];
      if (this.groupType === '2') { // 国家/地区分组
        let topsData = this.listDatas.slice(0, 5);
        Top5List = topsData.map(item => {
          return item.countryId;
        });
        this.$emit('updateTop5CodeListEmit', Top5List);
      } else if (this.groupType === '4') { // 应用版本分组
        let topsData = this.listDatas.slice(0, 6);
        Top5List = topsData.map(item => {
          return item.appVersion;
        });
        // 剔除Top5List里面的other值
        let index = Top5List.indexOf('other');
        if (index !== -1) {
          Top5List.splice(index, 1);
        } else {
          // 6个，删除一个
          if (Top5List.length === 6) {
            Top5List.pop();
          }
        }
        this.$emit('updateTop5CodeListEmit', Top5List);
      } else { // 非国家分组
        this.$emit('updateTop5CodeListEmit', Top5List);
      }
    },
    // 处理数据
    analysisDats() {
      let res = this.listDatas;
      let otherDatas = JSON.parse(JSON.stringify(this.otherDatas));
      this.tableDateCopy = JSON.parse(JSON.stringify(res));
      // 追加other国家数据
      if (this.groupType === '2' && otherDatas.length > 0) {
        this.tableDateCopy.push(otherDatas[0]);
      }

      this.tableDateCopy = this.tableDateCopy.map(item => {
        let countryName = '';
        if (item.countryId === 'other') {
          countryName = '其他';
        } else {
          // 国家id->国家名称
          let filter = COUNTRIES_ENUM.filter(ele => {
            return ele.id === item.countryId;
          });
          countryName = filter[0] && filter[0].name;
        }
        this.$set(item, 'countryName', countryName);
        item.exposureCnt = toThousandsInt(item.exposureCnt); // 曝光：千分位整数
        item.detailsPageCnt = toThousandsInt(item.detailsPageCnt);// 详情页查看:千分位整数
        item.downCnt = toThousandsInt(item.downCnt);// 总下载:千分位整数
        item.updateDownCnt = toThousandsInt(item.updateDownCnt); // 更新下载:千分位整数
        item.nonUpdateDownCnt = toThousandsInt(item.nonUpdateDownCnt); // 非更新下载:千分位整数
        item.exposureClickRate = percentMax(item.exposureClickRate); // 曝光点击率:百分比千分位2位小数
        item.detailPageConversionRate = percentMax(item.detailPageConversionRate); // 详情页转化率：百分比千分位2位小数
        item.installSuccessRate = percentMax(item.installSuccessRate); // 安装成功率：百分比千分位2位小数
        return item;
      });
      this.tableDateCopyInit = JSON.parse(JSON.stringify(this.tableDateCopy));
      this.tableDateCopy = this.tableDateCopyInit.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
      this.total = this.tableDateCopyInit.length;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.currentPage = 1; // 页码数变动，页码重置为1
      this.tableDateCopy = this.tableDateCopyInit.slice((this.currentPage - 1) * val, this.currentPage * val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableDateCopy = this.tableDateCopyInit.slice((val - 1) * this.pagesize, val * this.pagesize);
    }
  }
};
</script>
<style lang="scss" scoped>
.reportTable ::v-deep{
  position: relative;
  .exportCls {
    position: absolute;
    top: -35px;
    right: 0px;
  }
  .pagination {
    margin-top: 15px;
    float: right;
  }
  .el-icon-question {
    margin-left: 5px;
    font-size: 17px;
    color: #ccc;
    position: absolute;
    top: 3px;
    cursor: pointer;
  }
}
</style>>
