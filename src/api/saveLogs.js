import api from './http';
import { logs } from './url';
import { timestampToTime } from '@/utils/index';

/*
  desc：保存日志埋点
  scope：全局使用
  params:
    moduleId, 1:教育中心|2：商业推广|3：游戏中心|4：平台|5：AppTouch|6:数据服务,
    resourceType, 0：报表|1：接口,
    clientType, 0：PC|1: Moblie|9:其他,
    operType, 0:访问|1：查询|2：下载|9：其他
*/
export function saveLogs({ moduleId = 0, resourceType = 0, clientType = 0, operType = 0 } = {}) {
  const logsData = {
    moduleId,
    operType,
    clientType,
    resourceType,
    operDate: timestampToTime(),
    resourceUrl: location.hash.replace(/^#/, ''),
  };
  api.post(logs, logsData, false, false);
}
