import { saveAs } from 'file-saver'; // 在客户端保存文件的解决方案，非常适合在客户端上生成文件的Web应用程序
import XLSX from 'xlsx/dist/xlsx.full.min'; // 数据导入导出所需要的依赖

// 将json数据处理为xlsx需要的格式
function datenum(v, date1904) {
  if (date1904) v += 1462;
  let epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function data2ws(data, sheetStyle) {
  const ws = {};
  const range = {
    s: { c: 10000000, r: 10000000 },
    e: { c: 0, r: 0 }
  };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      const cell = { v: data[R][C] };
      // 单元格背景色不起效果
      // const cell = {
      //   v: data[R][C],
      //   s: {
      //     fill: { bgColor: { rgb: '33000000' } },
      //     alignment: { horizontal: 'center', vertical: 'center' },
      //   }
      // };
      if (cell.v == null) continue;
      const cellRef = XLSX.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';
      ws[cellRef] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  // 列宽
  ws['!cols'] = sheetStyle.colsWidth;
  // 行高
  ws['!rows'] = sheetStyle.rowHeight;
  // 合并
  if (sheetStyle.merges && sheetStyle.merges.length > 0) {
    ws['!merges'] = sheetStyle.merges;
  }
  return ws;
}
// 导出excel
function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}
// 字符串转ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

/*
* th => 表头
* data => 数据
* fileName => 文件名
* fileType => 文件类型
* sheetName => sheet页名
* sheetStyle => 表格样式
*/
export default function toExcel({ th, data, fileName, fileType, sheetName, sheetStyle }) {
  data.unshift(th);
  const wb = new Workbook(); console.log(wb);
  const ws = data2ws(data, sheetStyle);
  sheetName = sheetName || 'sheet1';
  wb.SheetNames.push(sheetName);
  wb.Sheets[sheetName] = ws;
  fileType = fileType || 'xlsx';
  // 生成excel的配置项
  let wopts = {
    bookType: fileType, // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  };
  let wbout = XLSX.write(wb, wopts);
  fileName = fileName || '列表';
  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${fileName}.${fileType}`);
}
