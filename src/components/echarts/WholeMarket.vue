<template>
<div class="WholeMarket">
  <ul class="sameMonth">
    <li class="peak" v-for="( itemData, index2 ) in marketData" :key="index2" :style="{ width:wholeMarkets.width }">
        <p class="peakBg" :class="{'peakBStyleA':peakStyleBg === 1,'peakBStyleB':peakStyleBg === 2,'peakBStyleC':peakStyleBg === 3}"></p>
        <p class="peakNumber" :class="{'peakNumStyle':peakStyleBg === 1,'peakNumStyleB':peakStyleBg === 2,'peakNumStyleC':peakStyleBg === 3}">
          <span class="rmb">{{ itemData.rmb }}</span>
          {{ itemData.MonthIcon }}
          <span class="unit" :class="itemData.untils==='K' || itemData.untils==='M' ? 'fontWeight' : ''" v-show="itemData.untils">
            {{itemData.untils}}
          </span>
        </p>
        <p class="peakMonth">
          <span class="itemLabel"  :class="{'peakMStyle':peakStyleBg === 1,'peakMStyleB':peakStyleBg === 2,'peakMStyleC':peakStyleBg === 3}">
            {{ itemData.label }}
          </span>
          <img src="@/assets/images/mark1.svg" v-show="itemData.iconE"/>
          <img src="@/assets/images/mark2.svg" v-show="itemData.icon"/>
        </p>
    </li>
  </ul>
  <div class="WholeMarketBG" :class="{'bgStylesA':peakStyleBg === 1,'bgStylesC':peakStyleBg === 3}"></div>
</div>
</template>
<script>
import { toThousands } from '@/lib/utils';
export default {
  name: 'WholeMarket',
  props: {
    wholeMarkets: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      marketData: {},
      bgStylesA: 'bgStylesA',
      bgStylesC: 'bgStylesC',
      peakStyleBg: ''
    };
  },
  mounted() {
    this.initMarket();
    this.changeNum();
  },
  watch: {
    wholeMarkets: {
      handler(newVal, oldVal) {
        this.initMarket();
        this.changeNum();
      },
      deep: true
    }
  },
  methods: {
    changeNum() {
      this.marketData = this.wholeMarkets.header || [];
      this.marketData.forEach((item) => {
        if (parseInt(item.MonthIcon) >= parseInt(100000) && parseInt(item.MonthIcon) !== '0') {
          let Mstr = item.untils === 'K' ? (parseInt(item.MonthIcon)) / 1000 : parseInt(item.MonthIcon);
          Mstr = Mstr.toFixed(1);
          // 获取最后一位数
          let spstr = String(Mstr);
          let united = String(spstr[spstr.length - 1]); // 获取小数点最后一位
          let strPr = parseInt(Mstr);
          strPr = toThousands(strPr);
          item.MonthIcon = strPr + '.' + united;
          if (item.untils === 'K') {
            item.untils = 'M';
          }
        } else {
          item.MonthIcon = toThousands(item.MonthIcon);
        }
      });
      return this.marketData;
    },
    // 初始化1-渐变色（蓝白border：白色）  2.背景无（border：灰色） 3.灰色 （没有右边框线borer）
    initMarket() {
      let peakstyles = parseInt(this.wholeMarkets.style);
      switch (peakstyles) {
        case 1: // 渐变色（ 蓝白border：白色 )
          this.peakStyleBg = peakstyles;
          break;
        case 2: // 背景无（border：灰色）
          this.peakStyleBg = peakstyles;
          break;
        case 3: // 背景无（border：灰色
          this.peakStyleBg = peakstyles;
          break;
        default:
      }
    }
  }
};
</script>
<style scoped lang="scss">
$all-height: 46.6;
$height: 3.3rem;
* { margin: 0;padding: 0 }
li { list-style: none; }
p {
  display: block;
  -webkit-margin-before: 0px;
  -webkit-margin-after: 0px;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
}
.bgStylesA{
  background: #FFFFFF;
  opacity: 0.12;
}
.bgStylesC{
  background: #F6F6F6
}
.peakNumStyle{
  color: #ffffff
}
.peakNumStyleB, .peakNumStyleC{
  color: #0000ff;
  opacity: 0.8;
}
.peakMStyle{
  color: #ffffff !important;
}
.peakMStyleB, .peakMStyleC{
  color: #000000;
  opacity: 0.6;
}
.peakBStyleA{
  border-width:0.5px;
  border-style:solid;
  border-color:#ffffff;
  opacity: 0.24;
}
.peakBStyleB{
  border-right: 1px solid #000000;
  opacity: 0.05;
}
.peakBStyleC{
  border-right: none
}
.WholeMarketBG {
  position: absolute;
  top: 0;
  width: 100%;
  height: $height;
  border-radius: 0 0 0.5rem 0.5rem;
}
.WholeMarket {
  width: 100%;
  height: $height;
  border-radius: 0 0 0.5rem 0.5rem;
  position: relative;
  .sameMonth {
    width: 100%;
    padding: 0px;
    position: relative;
    height: $height;
    overflow: hidden;
    z-index: 1;
    background-color: white;
    border-radius: 0 0 0.5rem 0.5rem;
      p {
        margin: 0;
      }
      .peak {
        float: left;
        height: $height;
        position: relative;
        .peakBg {
        height: $height/($all-height/18);
        position: absolute;
        top: $height/($all-height/16.3);
        right: 0;
        }
        .peakMonth {
          padding-top: $height/($all-height/3.5);
          font-family: PingFangSC-Regular;
          font-size: 0.84rem;
          line-height: $height/($all-height/17);
          text-align: center;
          margin-right: -10px;
          text-indent: -0.84rem;
        }
        .peakNumber {
          font-family: "HWtext 55ST";
          font-size: 1.2rem;
          line-height: $height/($all-height/23);
          text-align: center;
          .unit, .rmb {
            font-size: 0.71rem;
            line-height: $height/($all-height/14);
          }
        }
      }
      .peak:last-child .peakBg {
            border-right: none !important;
      }
  }
}
.fontWeight{
  font-weight: 700
}
</style>
