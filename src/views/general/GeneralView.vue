<template>
  <no-auth v-if="!authorized"></no-auth>
  <div v-else>
    <el-row :span="24">
      <el-col :span="18">
        <p class="edu-title pad-top-bot12">年度累计统计</p>
      </el-col>
      <el-col :span="6">
        <p class="edu-title edu-date">
          日期：
          <el-date-picker
            v-model="selectDate"
            type="date"
            size="small"
            value-format="timestamp"
            placeholder="选择日期"
            :picker-options="pickerOption"
            :clearable="false"
            :editable="false"
            @change="changeData"
          ></el-date-picker>
        </p>
      </el-col>
    </el-row>
    <div class="edu-border-bot">
      <el-row class="align-center" :span="24" type="flex">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <p class="annual-title">用户数据：</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'客户端活跃设备数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualClientDevices.clientDevices)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'登录帐号数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualUsers.users)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'搜索设备数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.searchDevices)"
            ></annual-total-v2>
          </div>
        </el-col>
      </el-row>
      <el-row class="align-center" :span="24" type="flex">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <p class="annual-title">课程数据：</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'课程详情浏览设备数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.detailBrowseDevices)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'学习帐号数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.learningUsers)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'课程在架数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.listingCourseNums)"
            ></annual-total-v2>
          </div>
        </el-col>
      </el-row>
      <el-row class="align-center" :span="24" type="flex">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <p class="annual-title">支付数据：</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'流水量'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.flowAmt)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'支付次数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.payTimes)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'支付帐号数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.paidUsers)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'支付课程数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.payCourseNums)"
            ></annual-total-v2>
          </div>
        </el-col>
      </el-row>
      <el-row class="align-center" :span="24" type="flex">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <p class="annual-title">本月数据：</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'本月活跃设备数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.monthDevices)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'本月新增设备数'"
              :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.monthNewDevices)"
            ></annual-total-v2>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <annual-total-v2
              :title="'客户端人均使用时长'"
              :unit="'小时'"
              :annualTotalNum="secondsToHours(annualTotalKPI.annualAccumulation.avgMonthClientDuration)"
            ></annual-total-v2>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <el-row class="edu-border-bot" :span="24" type="flex"> -->
    <!-- <el-col :span="4">
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'累计客户端活跃设备数'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualClientDevices.clientDevices)"></annual-total-v2>
        <annual-total-v2 :title="'累计流水（客户端+API）'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.flowAmt)"></annual-total-v2>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'累计登录帐号数（客户端+API）'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualUsers.users)"></annual-total-v2>
        <annual-total-v2 :title="'累计支付次数（客户端+API）'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.payTimes)"></annual-total-v2>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'累计课程详情页浏览设备数'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.detailBrowseDevices)"></annual-total-v2>
        <annual-total-v2 :title="'累计支付帐号数（客户端+API）'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.paidUsers)"></annual-total-v2>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'累计学习帐号数'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.learningUsers)"></annual-total-v2>
        <annual-total-v2 :title="'累计支付课程数（客户端+API）'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.payCourseNums)"></annual-total-v2>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'累计搜索设备数'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.searchDevices)"></annual-total-v2>
      </div>
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'当月月活设备数'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.monthDevices)"></annual-total-v2>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'在架课程量'" :annualTotalNum="toThousandsInt(annualTotalKPI.annualAccumulation.listingCourseNums)"></annual-total-v2>
      </div>
      <div class="grid-content bg-purple">
        <annual-total-v2 :title="'当月人均客户端使用时长'" :unit="'小时'" :annualTotalNum="secondsToHours(annualTotalKPI.annualAccumulation.avgMonthClientDuration)"></annual-total-v2>
      </div>
    </el-col>-->
    <!-- </el-row> -->
    <el-row class="edu-border-bot mar-top40" :gutter="0">
      <p class="edu-title mar-bot12">用户趋势</p>
      <el-col :span="12">
        <dayWeek class="mar-bot-201" :title="'活跃用户趋势（客户端与API去重）'" :dayWeekData="activeUsersTrend"></dayWeek>
        <line-bar-new
          class="mar-top20"
          :barLineData="activeUsersTrendData"
          :styleObject="styleObject"
          :options="userTrendOptions"
        ></line-bar-new>
      </el-col>
      <el-col :span="12">
        <dayWeek class="mar-bot-201" :title="'新增用户趋势（客户端与API去重）'" :dayWeekData="newUsersTrend"></dayWeek>
        <line-bar-new
          class="mar-top20"
          :barLineData="newUsersTrendData"
          :styleObject="styleObject"
          :options="userTrendOptions2"
        ></line-bar-new>
      </el-col>
    </el-row>
    <p data-lazy class="edu-title mar-top32 mar-bot12" edu-id="activeUserTranslate">用户转化</p>
    <el-row class="edu-border-bot pad-bot40" :gutter="20">
      <el-col :span="6">
        <div>
          <dayWeek :title="'客户端活跃设备数'" :dayWeekData="activeUsersTransData.clientDevices"></dayWeek>
          <line-bar-new
            class="mar-bot20"
            :barLineData="activeUsersTransObj.clientDevices"
            :styleObject="userTransObject"
            :options="userTransOptions"
          ></line-bar-new>
          <funnel-chart :translationRatio="translationRatio"></funnel-chart>
        </div>
      </el-col>
      <el-col :span="18" class="edu-border-left">
        <div>
          <el-col :span="8">
            <div class="mar-bot20">
              <dayWeek :title="'课程页浏览设备数'" :dayWeekData="activeUsersTransData.detailBrowseDevices"></dayWeek>
              <line-bar-new
                :barLineData="activeUsersTransObj.detailBrowseDevices"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
            <div>
              <dayWeek
                :title="'客户端人均使用时长'"
                :dayWeekData="activeUsersTransData.clientUserDuration"
                :numType="'dot'"
              ></dayWeek>
              <line-bar-new
                :barLineData="activeUsersTransObj.clientUserDuration"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="mar-bot20">
              <dayWeek :title="'学习帐号数'" :dayWeekData="activeUsersTransData.learningUsers"></dayWeek>
              <line-bar-new
                :barLineData="activeUsersTransObj.learningUsers"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
            <div>
              <dayWeek
                :title="'课程页人均浏览时长'"
                :dayWeekData="activeUsersTransData.detailBrowseDuration"
                :numType="'dot'"
              ></dayWeek>
              <line-bar-new
                :barLineData="activeUsersTransObj.detailBrowseDuration"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="mar-bot20">
              <dayWeek :title="'搜索设备数'" :dayWeekData="activeUsersTransData.searchDevices"></dayWeek>
              <line-bar-new
                :barLineData="activeUsersTransObj.searchDevices"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
            <div>
              <dayWeek
                :title="'搜索浏览转化率'"
                :dayWeekData="activeUsersTransData.searchBrowseRatio"
                :numType="'percent'"
              ></dayWeek>
              <line-bar-new
                :barLineData="activeUsersTransObj.searchBrowseRatio"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <p class="edu-title mar-top32 mar-bot12">用户转化</p>
    <el-row class="edu-border-bot pad-bot40" :gutter="20">
      <el-col :span="6">
        <div>
          <dayWeek :title="'新增客户端设备数'" :dayWeekData="newUsersTransData.clientDevices"></dayWeek>
          <line-bar-new
            :barLineData="newUsersTransObj.clientDevices"
            :styleObject="userTransObject"
            :options="userTransOptions"
            class="mar-bot20"
          ></line-bar-new>
          <funnel-chart :translationRatio="newTranslationRatio"></funnel-chart>
        </div>
      </el-col>
      <el-col :span="18" class="edu-border-left">
        <div>
          <el-col :span="8">
            <div class="mar-bot20">
              <dayWeek :title="'新增课程页浏览设备数'" :dayWeekData="newUsersTransData.detailBrowseDevices"></dayWeek>
              <line-bar-new
                :barLineData="newUsersTransObj.detailBrowseDevices"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
            <div>
              <dayWeek
                :title="'客户端人均使用时长'"
                :dayWeekData="newUsersTransData.clientUserDuration"
                :numType="'dot'"
              ></dayWeek>
              <line-bar-new
                :barLineData="newUsersTransObj.clientUserDuration"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="mar-bot20">
              <dayWeek :title="'新增学习帐号数'" :dayWeekData="newUsersTransData.learningUsers"></dayWeek>
              <line-bar-new
                :barLineData="newUsersTransObj.learningUsers"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
            <div>
              <dayWeek
                :title="'课程页人均浏览时长'"
                :dayWeekData="newUsersTransData.detailBrowseDuration"
                :numType="'dot'"
              ></dayWeek>
              <line-bar-new
                :barLineData="newUsersTransObj.detailBrowseDuration"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="mar-bot20">
              <dayWeek :title="'新增搜索设备数'" :dayWeekData="newUsersTransData.searchDevices"></dayWeek>
              <line-bar-new
                :barLineData="newUsersTransObj.searchDevices"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
            <div>
              <dayWeek
                :title="'搜索浏览转化率'"
                :dayWeekData="newUsersTransData.searchBrowseRatio"
                :numType="'percent'"
              ></dayWeek>
              <line-bar-new
                :barLineData="newUsersTransObj.searchBrowseRatio"
                :styleObject="userTransObject"
                :options="userTransOptions"
              ></line-bar-new>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row class="edu-border-bot">
      <p data-lazy class="edu-second-title mar-top32 mar-bot12" edu-id="revenueTrend">收入趋势</p>
      <el-col :span="24">
        <el-row :span="16" :gutter="0">
          <el-col :span="4">
            <dayWeek :title="'流水'" :dayWeekData="revenueData.flowAmt"></dayWeek>
          </el-col>
          <el-col :span="4">
            <dayWeek :title="'客户端流水'" :dayWeekData="revenueData.clientFlowAmt"></dayWeek>
          </el-col>
          <el-col :span="4">
            <dayWeek :title="'交易额'" :dayWeekData="revenueData.amt"></dayWeek>
          </el-col>
          <el-col :span="4">
            <dayWeek :title="'客户端交易额'" :dayWeekData="revenueData.clientAmt"></dayWeek>
          </el-col>
        </el-row>
        <line-bar-new
          :barLineData="flowAmtAndPaidData.flow"
          :styleObject="styleObject"
          :options="revenueOptions"
        ></line-bar-new>
      </el-col>
    </el-row>
    <el-row class="edu-border-bot">
      <el-col :span="24">
        <p class="edu-second-title mar-top32">付费用户概况</p>
        <div class="grid-content bg-purple">
          <el-button-group class="edu-tabs-group">
            <el-button
              type
              class="edu-tab2"
              :class="{'edu-btn-active': isUserActive === '0'}"
              @click="toggle('user', '0')"
            >全部</el-button>
            <el-button
              type
              class="edu-tab2"
              :class="{'edu-btn-active': isUserActive === '1'}"
              @click="toggle('user', '1')"
            >客户端</el-button>
          </el-button-group>
          <el-row class="mar-bot20" type="flex">
            <el-col>
              <dayWeek :title="'日付费帐号数'" :dayWeekData="revenueData.finallyPaidUsers"></dayWeek>
            </el-col>
            <el-col>
              <dayWeek :title="'日新增付费帐号数'" :dayWeekData="revenueData.finallyNewPaidUsers"></dayWeek>
            </el-col>
            <el-col>
              <dayWeek :title="'日复购帐号数'" :dayWeekData="revenueData.finallyRepurchaseUsers"></dayWeek>
            </el-col>
            <el-col>
              <dayWeek
                :title="'新客ARPPU'"
                :dayWeekData="revenueData.finallyNewPaidArppu"
                :numType="'dot'"
              ></dayWeek>
            </el-col>
            <el-col>
              <dayWeek
                :title="'复购ARPPU'"
                :dayWeekData="revenueData.finallyRepurchaseArppu"
                :numType="'dot'"
              ></dayWeek>
            </el-col>
          </el-row>
          <el-radio-group
            v-model="radioAll"
            @change="toggleRadio(radioAll)"
            v-if="isUserActive === '0'"
          >
            <el-row type="flex">
              <el-col>
                <el-radio label="paidUsers">日付费帐号数</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="newPaidUsers">日新增付费帐号数</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="repurchaseUsers">日复购帐号数</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="newPaidArppu">新客ARPPU</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="repurchaseArppu">复购ARPPU</el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
          <el-radio-group v-model="radioClient" @change="toggleRadio(radioClient)" v-else>
            <el-row type="flex">
              <el-col>
                <el-radio label="clientPaidUsers">日付费帐号数</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="clientNewPaidUsers">日新增付费帐号数</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="clientRepurchaseUsers">日复购帐号数</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="clientNewPaidArppu">新客ARPPU</el-radio>
              </el-col>
              <el-col class="mar-left-26">
                <el-radio label="clientRepurchaseArppu">复购ARPPU</el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
          <line-bar-new
            :barLineData="flowAmtAndPaidLineData"
            :styleObject="styleObject"
            :options="revenueOptions"
          ></line-bar-new>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <p data-lazy class="edu-second-title mar-top32" edu-id="courseOrApp">重点课程/应用概览</p>
      <el-button-group class="edu-tabs-group">
        <el-button
          type
          class="edu-tab2"
          :class="{'edu-btn-active': isLessonActive === '0'}"
          @click="toggle('lesson', '0')"
        >课程</el-button>
        <el-button
          type
          class="edu-tab2"
          :class="{'edu-btn-active': isLessonActive === '1'}"
          @click="toggle('lesson', '1')"
        >应用</el-button>
      </el-button-group>
      <template v-if="isLessonActive === '0'">
        <el-row :span="24" :gutter="60" class="mar-bot40">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{title: '浏览量TOP10', flowName: '浏览量'}"
                :labelName="topTableLabelName"
                :tableData="tableData1"
              ></TopTable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <TopTable
                :tableAttr="{title: '浏览时长TOP10(分钟)', flowName: '浏览时长', type: 'dot'}"
                :labelName="topTableLabelName"
                :tableData="tableData2"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="60" class="mar-bot40">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '学习帐号数TOP10', flowName: '学习帐号数'}"
                :labelName="topTableLabelName"
                :tableData="tableData3"
              ></TopTable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <TopTable
                :tableAttr="{moreCol: 1, title: '流水TOP10', flowName: '流水'}"
                :labelName="topTableLabelName"
                :tableData="tableData4"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="60" class="mar-bot40">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '支付次数TOP10', flowName: '支付次数'}"
                :labelName="topTableLabelName"
                :tableData="tableData5"
              ></TopTable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <TopTable
                :tableAttr="{moreCol: 1, title: '客户端支付次数TOP10', flowName: '客户端支付次数'}"
                :labelName="topTableLabelName"
                :tableData="tableData6"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="60">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '流水增长TOP10', flowName: '流水增长'}"
                :labelName="topTableLabelName"
                :tableData="tableData7"
              ></TopTable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '流水下降TOP10', flowName: '流水下降'}"
                :labelName="topTableLabelName"
                :tableData="tableData8"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-if="isLessonActive === '1'">
        <el-row :span="24" :gutter="60" class="mar-bot40">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{title: '浏览量TOP10', flowName: '浏览量'}"
                :labelName="topTableLabelName"
                :tableData="tableData1"
              ></TopTable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '学习帐号数TOP10', flowName: '学习帐号数'}"
                :labelName="topTableLabelName"
                :tableData="tableData3"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="60" class="mar-bot40">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <TopTable
                :tableAttr="{moreCol: 1, title: '流水TOP10', flowName: '流水'}"
                :labelName="topTableLabelName"
                :tableData="tableData4"
              ></TopTable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '支付次数TOP10', flowName: '支付次数'}"
                :labelName="topTableLabelName"
                :tableData="tableData5"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="60" class="mar-bot40">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <TopTable
                :tableAttr="{moreCol: 1, title: '客户端支付次数TOP10', flowName: '客户端支付次数'}"
                :labelName="topTableLabelName"
                :tableData="tableData6"
              ></TopTable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '流水增长TOP10', flowName: '流水增长'}"
                :labelName="topTableLabelName"
                :tableData="tableData7"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="60">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <TopTable
                :tableAttr="{moreCol: 1, title: '流水下降TOP10', flowName: '流水下降'}"
                :labelName="topTableLabelName"
                :tableData="tableData8"
              ></TopTable>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-row>
  </div>
</template>

<script>
import LineBarNew from 'components/echarts/LineBarNew';
import FunnelChart from 'components/common/FunnelChart';
import DayWeek from 'components/common/DayWeekView';
import AnnualTotalV2 from 'components/common/AnnualTotalViewV2';
import TopTable from 'components/common/TopTableView';
import { kpi, usersTrend, usersTranslation, revenue, kcourseTopn } from 'api/url';
import { timestampToDate, toThousandsInt, toThousands, secondsToHours } from 'utils';
import { USER_TREND_LINE_NAME_MAP, USER_TREND_LINE_NAME_MAP_ACTIVE, USERS_TRANS_LINE_NAME_MAP, USERS_FLOW_PAY_LINE_NAME_MAP } from '@/const/index';

export default {
  components: { AnnualTotalV2, DayWeek, TopTable, FunnelChart, LineBarNew },
  name: 'Gennral',
  data() {
    return {
      userTrendOptions: {
        toolbox: { feature: {} },
        grid: { top: '14%', left: '0%', height: 280, containLabel: true },
        legend: {
          // itemWidth: 6,
          // width: 420,
          right: 74,
          top: '0%',
        }
      },
      userTrendOptions2: {
        toolbox: { feature: {} },
        grid: { top: '14%', left: '0%', height: 280, containLabel: true },
        color: ['#BE00C9', '#FFB637', '#47CC47'],
        legend: {
          // itemWidth: 6,
          // width: 420,
          right: 74,
          top: '0%',
        }
      },
      revenueOptions: {
        toolbox: { feature: {} },
        grid: { top: '14%', left: '0%', height: 280, containLabel: true },
        legend: {
          // width: 420,
          right: 150,
          top: '2%',
        },
        yAxis: {
          axisTick: { show: false }, // 刻度
          axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标轴
          splitLine: { show: false } // 线
        },
        xAxis: {
          name: ' ',
          axisTick: { show: false }, // 刻度
          axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标轴
          splitLine: { show: false } // 线
        },
        color: ['#00C0C9', '#47CC47'],
      },
      styleObject: { height: '380px' },
      userTransObject: { height: '140px' },
      userTransOptions: {
        toolbox: { feature: {} },
        grid: { top: '15%', left: '1%', height: 110, containLabel: true },
        legend: {
          itemWidth: 6,
          right: 34,
          top: '0%',
          show: '1',
        },
        yAxis: {
          axisTick: { show: false }, // 刻度
          axisLine: { show: false }, // 坐标轴
          splitLine: { show: true } // 线
        },
        xAxis: {
          name: ' ',
          axisTick: { show: false }, // 刻度
          axisLine: { show: false }, // 坐标轴
          splitLine: { show: false } // 线
        }
      },
      annualTotalKPI: {
        annualClientDevices: { clientDevices: '-' }, // 年度累计客户端设备数
        annualUsers: { users: '-' }, // 年度累计帐号数
        annualAccumulation: {
          detailBpageSizeeDevices: '-', // 年度累计课程详情页浏览设备数
          learningUsers: '-', // 年度累计学习帐号数
          searchDevices: '-', // 年度累计搜索设备数
          payCourseNums: '-', // 年度累计支付课程数
          payTimes: '-', // 年度累计支付次数
          paidUsers: '-', // 年度累计付费帐号数
          flowAmt: '-', // 年度累计流水
          listingCourseNums: '-', // 在架课程量
          monthDevices: '-', // 当月月活设备数
          avgMonthClientDuration: '-', // 当月人均客户端使用时长（返回秒，需要成小时）
        }
      },
      newUsersTrend: {}, // 新增活跃用户日月比率
      activeUsersTrend: {}, // 活跃用户日月比率
      newUsersTrendData: { // 新增活跃趋势图
        '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' }
      },
      activeUsersTrendData: { // 活跃趋势图
        '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' }
      },
      newUsersTransData: {}, // 活跃用户转化
      activeUsersTransData: {}, // 新增用户转化
      activeUsersTransObj: { // 活跃用户转化趋势图
        clientDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        learningUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientUserDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchBrowseRatio: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
      },
      newUsersTransObj: { // 新增用户转化趋势图
        clientDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        learningUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientUserDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchBrowseRatio: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
      },
      revenueData: {}, // 收入趋势流水
      flowAmtAndPaidData: { // 收入趋势&付费趋势图
        flow: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        paidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        newPaidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        repurchaseUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        newPaidArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        repurchaseArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientPaidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientNewPaidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientRepurchaseUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientNewPaidArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientRepurchaseArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
      },
      flowAmtAndPaidLineData: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } }, // 收入趋势&付费-折线图数据
      radioAll: 'paidUsers',
      radioClient: 'clientPaidUsers',
      newTranslationRatio: {},
      translationRatio: {},
      isUserActive: '0', // 按钮：全部|客户端
      isLessonActive: '0', // 按钮：课程|应用
      kcourseTopnData: {}, // top10-table-all-data
      topTableLabelName: '课程名称',
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
      tableData8: [],
      selectDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() - 1), // 昨天时间戳
      pickerOption: {
        disabledDate(timer) {
          return timer.getTime() > new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() - 1);
        }
      },
      observer: null,
    };
  },
  watch: {
    'authorized': {
      handler(val) {
        if (val) {
          this.qryData();
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    authorized() {
      let authorized = false;
      console.log(2222, this.$store.state.agapOriMenu);
      authorized = (this.$store.state.agapOriMenu || []).some(item => item.resourceUrl === this.$route.path);
      return authorized;
    },
    dateTimer() { // 今日概览 日期
      return timestampToDate(this.selectDate);
    },
    startDate() {
      return timestampToDate(this.selectDate - 30 * 24 * 3600 * 1000); // 31天前
    },
    midDate() {
      return timestampToDate(this.selectDate - 13 * 24 * 3600 * 1000); // 14天前
    },
    endDate() {
      return timestampToDate(this.selectDate); // 1天前
    }
  },
  destroyed() {
    this.observer.disconnect(); // 关闭监听，不关闭会消耗浏览器内存
  },
  methods: {
    toThousands,
    toThousandsInt,
    secondsToHours,
    toggle(type, flat) {
      if (type === 'user') {
        this.isUserActive = flat;
        this.toggleRevenueData(flat);
      }
      if (type === 'lesson') {
        this.isLessonActive = flat;
        this.toggleTableData();
      }
    },
    toggleRevenueData(flat) {
      if (flat === '0') {
        this.revenueData.finallyPaidUsers = this.revenueData.paidUsers;
        this.revenueData.finallyNewPaidUsers = this.revenueData.newPaidUsers;
        this.revenueData.finallyRepurchaseUsers = this.revenueData.repurchaseUsers;
        this.revenueData.finallyNewPaidArppu = this.revenueData.newPaidArppu;
        this.revenueData.finallyRepurchaseArppu = this.revenueData.repurchaseArppu;
        this.radioAll = 'paidUsers';
        this.toggleRadio(this.radioAll);
      } else {
        this.revenueData.finallyPaidUsers = this.revenueData.clientPaidUsers;
        this.revenueData.finallyNewPaidUsers = this.revenueData.clientNewPaidUsers;
        this.revenueData.finallyRepurchaseUsers = this.revenueData.clientRepurchaseUsers;
        this.revenueData.finallyNewPaidArppu = this.revenueData.clientNewPaidArppu;
        this.revenueData.finallyRepurchaseArppu = this.revenueData.clientRepurchaseArppu;
        this.radioClient = 'clientPaidUsers';
        this.toggleRadio(this.radioClient);
      }
    },
    qryKPIData() {
      const data = { reportDate: this.endDate };
      console.log('data', data);
      this.$requestApi.post(kpi, data, false, false).then((res) => {
        const data = res || {};
        const annualClientDevices = data.annualClientDevices || {};
        const annualUsers = data.annualUsers || {};
        const annualAccumulation = data.annualAccumulation || {};
        this.annualTotalKPI = {
          annualClientDevices: { clientDevices: annualClientDevices.clientDevices }, // 年度累计客户端设备数
          annualUsers: { users: annualUsers.users }, // 年度累计帐号数
          annualAccumulation: {
            detailBrowseDevices: annualAccumulation.detailBrowseDevices,
            detailBpageSizeeDevices: annualAccumulation.detailBpageSizeeDevices, // 年度累计课程详情页浏览设备数
            learningUsers: annualAccumulation.learningUsers, // 年度累计学习帐号数
            searchDevices: annualAccumulation.searchDevices, // 年度累计搜索设备数
            payCourseNums: annualAccumulation.payCourseNums, // 年度累计支付课程数
            payTimes: annualAccumulation.payTimes, // 年度累计支付次数
            paidUsers: annualAccumulation.paidUsers, // 年度累计付费帐号数
            flowAmt: annualAccumulation.flowAmt, // 年度累计流水
            listingCourseNums: annualAccumulation.listingCourseNums, // 在架课程量
            monthDevices: annualAccumulation.monthDevices, // 当月月活设备数
            monthNewDevices: annualAccumulation.monthNewDevices, // 本月新增设备数
            avgMonthClientDuration: annualAccumulation.avgMonthClientDuration, // 当月人均客户端使用时长（返回秒，需要成小时）
          }
        };
        console.log(this.annualTotalKPI);
        console.log('data', res);
      });
    },
    getNewUsersTrendData(newUserData) {
      this.$requestApi.post(usersTrend, newUserData).then((res) => {
        this.newUsersTrend = res.lastReport || {};
        const trendData = res.resultList || {};
        const trendkeys = Object.keys(USER_TREND_LINE_NAME_MAP);
        const resultKey = Object.keys(trendData);
        const k = trendkeys.find(ele => resultKey.includes(ele));
        this.newUsersTrendData['0'].xData = (trendData[k] || []).map(item => item.reportDate);
        this.newUsersTrendData['0'].yData = [];
        trendkeys.forEach(element => {
          const type = USER_TREND_LINE_NAME_MAP[element]['type'] || '';
          const name = USER_TREND_LINE_NAME_MAP[element]['name'] || '';
          const data = (trendData[element] || []).map(item => item.value) || [];
          this.newUsersTrendData['0'].type = type;
          this.newUsersTrendData['0'].yData.push({ name, data });
        });
        console.log('newUsersTrendData', this.newUsersTrendData['0'].yData);
      }).catch(() => {
        // console.log('eee', err);
        this.newUsersTrendData['0'].xData = [];
        this.newUsersTrendData['0'].yData = [];
      });
    },
    getActiveUsersTrendData(activeUserData) {
      this.$requestApi.post(usersTrend, activeUserData, false, false).then((res) => {
        this.activeUsersTrend = res.lastReport || {};
        const trendData1 = res.resultList || {};
        const trendkeys1 = Object.keys(USER_TREND_LINE_NAME_MAP_ACTIVE);
        const resultKey = Object.keys(trendData1);
        const k = trendkeys1.find(ele => resultKey.includes(ele));
        this.activeUsersTrendData['0'].xData = (trendData1[k] || []).map(item => item.reportDate);
        this.activeUsersTrendData['0'].yData = [];
        trendkeys1.forEach(element => {
          const type = USER_TREND_LINE_NAME_MAP_ACTIVE[element]['type'] || '';
          const name = USER_TREND_LINE_NAME_MAP_ACTIVE[element]['name'] || '';
          this.activeUsersTrendData['0'].type = type;
          const data = (trendData1[element] || []).map(item => item.value) || [];
          this.activeUsersTrendData['0'].yData.push({ name, data });
        });
        console.log('activeUsersTrendData', this.activeUsersTrendData['0'].yData);
      }).catch(() => {
        // console.log('#ee', err);
        this.activeUsersTrendData['0'].xData = [];
        this.activeUsersTrendData['0'].yData = [];
      });
    },
    qryUsersTrend() {
      const date = {
        startDate: this.startDate,
        endDate: this.endDate
      };
      console.log('qryUsersTrend', date);
      const newUserData = {
        userType: 'new', ...date
      };
      const activeUserData = {
        userType: 'active', ...date
      };
      this.getNewUsersTrendData(newUserData);
      this.getActiveUsersTrendData(activeUserData);
    },
    // 用户转化
    qryUsersTranslation() {
      const date = {
        startDate: this.midDate,
        endDate: this.endDate
      };
      const newUserData = {
        userType: 'new', ...date
      };
      const activeUserData = {
        userType: 'active', ...date
      };
      this.$requestApi.post(usersTranslation, newUserData).then((res) => {
        this.newUsersTransData = res.lastReport || {};
        this.newTranslationRatio = res.translationRatio || {};
        const usersTransData = res.translationList || {};
        this.getUsersTransLineData(usersTransData, 'newUsersTransObj', 'new');
      }).catch(() => {
        this.newUsersTransData = {};
        this.getUsersTransLineData({}, 'newUsersTransObj', 'new');
      });
      this.$requestApi.post(usersTranslation, activeUserData, false, false).then((res) => {
        this.activeUsersTransData = res.lastReport || {};
        this.translationRatio = res.translationRatio || {};
        const usersTransData = res.translationList || {};
        this.getUsersTransLineData(usersTransData, 'activeUsersTransObj');
      }).catch(() => {
        this.activeUsersTransData = {};
        this.getUsersTransLineData({}, 'activeUsersTransObj');
      });
    },
    getUsersTransLineData(data, name, type) {
      let list = { ...USERS_TRANS_LINE_NAME_MAP };
      if (type === 'new') {
        list = {
          ...USERS_TRANS_LINE_NAME_MAP,
          ...{
            'clientDevices': { name: '新增客户端设备数', type: 'number' },
            'detailBrowseDevices': { name: '新增课程页浏览设备数', type: 'number' },
            'learningUsers': { name: '新增学习帐号数', type: 'number' },
            'searchDevices': { name: '新增搜索设备数', type: 'number' }
          }
        };
      }
      const transKeys = ['clientDevices', 'detailBrowseDevices', 'learningUsers', 'searchDevices', 'clientUserDuration', 'detailBrowseDuration', 'searchBrowseRatio'];
      transKeys.forEach(key => {
        this[name][key] = { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } };
        this[name][key]['0'].xData = (data[key] || []).map(item => item.reportDate);
        this[name][key]['0'].yData[0].name = list[key].name;
        this[name][key]['0'].type = list[key].type;
        this[name][key]['0'].yData[0].data = (data[key] || []).map(item => item.value);
      });
    },
    // 查询-收入&用户付费
    qryRevenue() {
      const date = {
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.$requestApi.post(revenue, date).then((res) => {
        this.revenueData = res.lastReport || {};
        this.revenueData.finallyPaidUsers = this.revenueData.paidUsers;
        this.revenueData.finallyNewPaidUsers = this.revenueData.newPaidUsers;
        this.revenueData.finallyRepurchaseUsers = this.revenueData.repurchaseUsers;
        this.revenueData.finallyNewPaidArppu = this.revenueData.newPaidArppu;
        this.revenueData.finallyRepurchaseArppu = this.revenueData.repurchaseArppu;
        this.getRevenueLineData(res.resultList);
      }).catch(() => {
        this.getRevenueLineData({});
      });
    },
    getRevenueLineData(data) {
      this.flowAmtAndPaidData.flow = { '0': { xData: [], yData: [], yTitle: '', yUnit: '', type: 'number' } }; // 流水折线图
      Object.keys(USERS_FLOW_PAY_LINE_NAME_MAP.paid).forEach(key => { // 日付费折线图
        this.flowAmtAndPaidData[key] = { '0': { xData: [], yData: [], yTitle: '', yUnit: '', type: 'number' } };
      });
      const flowKeys = Object.keys(USERS_FLOW_PAY_LINE_NAME_MAP.flow); // 流水keys: ['flowAmt', 'clientFlowAmt']
      flowKeys.forEach(key => {
        if (Array.isArray(data[key])) {
          this.flowAmtAndPaidData.flow['0'].xData = (data[key] || []).map(item => item.reportDate);
        }
        const name = USERS_FLOW_PAY_LINE_NAME_MAP['flow'][key]['name'];
        const type = USERS_FLOW_PAY_LINE_NAME_MAP['flow'][key]['type'];
        this.flowAmtAndPaidData.flow['0'].type = type;
        this.flowAmtAndPaidData.flow['0'].yData.push({
          name, data: (data[key] || []).map(item => item.value)
        });
      });
      const paidKeys = Object.keys(USERS_FLOW_PAY_LINE_NAME_MAP.paid); // ['paidUsers', 'newPaidUsers', 'repurchaseUsers', 'newPaidArppu', 'repurchaseArppu', ...]
      paidKeys.forEach(key => {
        const xData = (data[key] || []).map(item => item.reportDate);
        const name = USERS_FLOW_PAY_LINE_NAME_MAP['paid'][key]['name'];
        const type = USERS_FLOW_PAY_LINE_NAME_MAP['paid'][key]['type'];
        const ydata = (data[key] || []).map(item => item.value);
        this.flowAmtAndPaidData[key]['0'].xData = xData;
        this.flowAmtAndPaidData[key]['0'].type = type;
        this.flowAmtAndPaidData[key]['0'].yData.push({ name, data: ydata });
      });
      if (this.isUserActive === '0') {
        this.toggleRadio(this.radioAll);
      } else {
        this.toggleRadio(this.radioClient);
      }
    },
    toggleRadio(radio) {
      const lineData = this.flowAmtAndPaidData[radio];
      if (!lineData) {
        this.flowAmtAndPaidLineData = {
          '0': {
            xData: [],
            yData: [{ name: USERS_FLOW_PAY_LINE_NAME_MAP.paid[radio]['name'], data: [''] }],
            yTitle: '',
            yUnit: '',
            type: 'number'
          }
        };
        return;
      }
      this.flowAmtAndPaidLineData = lineData;
      console.log('--this.flowAmtAndPaidLineData--', this.flowAmtAndPaidLineData);
    },
    // 查询-重点课程&应用
    qryCourseTopn() {
      const date = {
        startDate: this.endDate,
        endDate: this.endDate
      };
      this.$requestApi.post(kcourseTopn, date, false, false).then((res) => {
        this.kcourseTopnData = res.topList || {};
        this.toggleTableData();
      });
    },
    toggleTableData() {
      let keyNamePre = 'course';
      if (this.isLessonActive === '0') {
        this.topTableLabelName = '课程名称';
        keyNamePre = 'course';
      } else {
        this.topTableLabelName = '应用名称';
        keyNamePre = 'app';
      }
      ['1', '2', '3', '4', '5', '6', '7', '8'].forEach(ele => { // name: ['app1', 'app2', ...]
        const key = keyNamePre + ele;
        const tableKey = 'tableData' + ele;
        this[tableKey] = this.kcourseTopnData[key] || [];
      });
    },
    lazyLoadApi() {
      const ele = document.querySelectorAll('p[data-lazy]');
      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // 表示正在相交，即：已经出现
          if (entry.intersectionRatio > 0.25) {
            const tar = entry.target;
            const val = tar.attributes['edu-id'].value || '';
            this.observer.unobserve(tar); // 取消监听
            this.requestData(val);
          }
        });
      }, { threshold: 1.0 });
      ele.forEach(ele => {
        this.observer.observe(ele);
      });
    },
    requestData(val) {
      switch (val) {
        case 'activeUserTranslate':
          this.qryUsersTranslation();
          console.log('--activeUserTranslate--');
          break;
        case 'revenueTrend':
          this.qryRevenue();
          console.log('--revenueTrend--');
          break;
        case 'courseOrApp':
          this.qryCourseTopn();
          console.log('--courseOrApp--');
          break;
        default:
          break;
      }
    },
    changeData() {
      this.qryData();
      this.observer.disconnect(); // 开启监听器前，先关闭，否则监听器会叠加，监听器的cb会触发多次
      this.lazyLoadApi();
    },
    qryData() {
      this.initData();
      this.qryKPIData();
      this.qryUsersTrend();
    },
    initData() {
      // const initLineData = { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } };
      this.annualTotalKPI = {
        annualClientDevices: { clientDevices: '-' },
        annualUsers: { users: '-' },
        annualAccumulation: {
          detailBpageSizeeDevices: '-',
          learningUsers: '-',
          searchDevices: '-',
          payCourseNums: '-',
          payTimes: '-',
          paidUsers: '-',
          flowAmt: '-',
          listingCourseNums: '-',
          monthDevices: '-',
          avgMonthClientDuration: '-',
        }
      };
      this.newUsersTrend = {};
      this.activeUsersTrend = {};
      this.newUsersTrendData = { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } };
      this.activeUsersTrendData = { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } };
      this.newUsersTransData = {};
      this.activeUsersTransData = {};
      this.activeUsersTransObj = {
        clientDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        learningUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientUserDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchBrowseRatio: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
      };
      this.newUsersTransObj = {
        clientDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        learningUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchDevices: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientUserDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        detailBrowseDuration: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        searchBrowseRatio: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
      };
      this.revenueData = {};
      this.flowAmtAndPaidData = {
        flow: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        paidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        newPaidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        repurchaseUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        newPaidArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        repurchaseArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientPaidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientNewPaidUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientRepurchaseUsers: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientNewPaidArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
        clientRepurchaseArppu: { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } },
      };
      this.flowAmtAndPaidLineData = { '0': { xData: [], yData: [{ name: '', data: [] }], yTitle: '', yUnit: '', type: 'number' } };
      this.radioAll = 'paidUsers';
      this.radioClient = 'clientPaidUsers';
      this.newTranslationRatio = {};
      this.translationRatio = {};
      this.isUserActive = '0';
      this.isLessonActive = '0';
      this.kcourseTopnData = {};
      this.topTableLabelName = '课程名称';
      this.tableData1 = [];
      this.tableData2 = [];
      this.tableData3 = [];
      this.tableData4 = [];
      this.tableData5 = [];
      this.tableData6 = [];
      this.tableData7 = [];
      this.tableData8 = [];
    },
  },
  created() {
  },
  mounted() {
    this.$watermark.set(this.$store.state.wo_user);
    this.lazyLoadApi();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.edu-title {
  text-align: start;
  font-size: 16px;
}
.annual-title {
  font-size: 16px;
  padding: 16px 0 16px 0;
}
.align-center {
  align-items: center; /* 垂直居中 */
}
.edu-second-title {
  text-align: start;
  font-size: 14px;
}
.edu-date {
  display: inline-block;
  font-size: 12px;
}
.edu-border-bot {
  border-bottom: 1px solid #e7e7e7;
}
.edu-border-right {
  border-right: 1px solid #e7e7e7;
}
.edu-border-left {
  border-left: 1px solid #e7e7e7;
}
.pad-top-bot12 {
  padding: 12px 0;
}
.pad-bot40 {
  padding-bottom: 40px;
}
.mar-left8 {
  margin-left: 8px;
}
.mar-right8 {
  margin-right: 8px;
}
.mar-top12 {
  margin-top: 12px;
}
.mar-bot12 {
  margin-bottom: 12px;
}
.mar-bot20 {
  margin-bottom: 20px;
}
.mar-top32 {
  margin-top: 32px;
}
.mar-top40 {
  margin-top: 40px;
}
.mar-bot-20 {
  margin-bottom: -20px;
}
.mar-bot40 {
  margin-bottom: 40px;
}
.mar-left-26 {
  margin-left: 26px;
}
.edu-tabs-group {
  margin: 13px 0;
}
.edu-tab2 {
  padding: 4px 30px;
}
.edu-date >>> .el-input__inner {
  height: 30px;
  line-height: 100%;
}
.edu-date >>> .el-icon-date,
.edu-date >>> .el-input__icon {
  line-height: 100%;
}
.edu-btn-active {
  background: #ececec;
}
</style>
