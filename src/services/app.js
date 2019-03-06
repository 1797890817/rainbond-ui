import request from "../utils/request";
import config from "../config/config";

/* 删除应用的某个版本 */
export function delAppVersion(body = { team_name, service_alias, version_id }) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.service_alias}/version/${body.version_id}`,
    {
      method: "DELETE",
    },
  );
}

/* 获取应用所有的版本列表 */
export function getAppVersionList(body = { team_name, service_alias, page_num, page_size }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.service_alias}/version`,
    {
      method: "get",
      params: {
        page_num: body.page_num,
        page_size: body.page_size
      }
    },
  );
}

/*
  获取php语言扩展
 */
export function getPhpConfig() {
  return request(`${config.baseUrl}/console/php`, {
    method: "get",
  });
}

/*
	获取自动部署设置状态

 */
export function getAutoDeployStatus(body = { team_name, app_alias, deployment_way }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/webhooks/get-url?deployment_way=${body.deployment_way}`,
    {
      method: "get",
    },
  );
}

/*
	取消自动部署
 */
export function cancelAutoDeploy(body = { team_name, app_alias, deployment_way }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/webhooks/status`,
    {
      method: "post",
      data: {
        action: "close",
        deployment_way: body.deployment_way
      },
    },
  );
}

/*
	开启自动部署
 */
export function openAutoDeploy(body = { team_name, app_alias, deployment_way }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/webhooks/status`,
    {
      method: "post",
      data: {
        action: "open",
        deployment_way: body.deployment_way
      },
    },
  );
}

/*
	获取应用的历史操作日志
*/
export function getActionLog(body = {
  team_name,
  app_alias,
  page,
  page_size,
  start_time,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/events`,
    {
      method: "get",
      params: {
        page: body.page,
        page_size: body.page_size,
        start_time: body.start_time || "",
      },
    },
  );
}

/*
	获取应用某个操作历史的详细日志
	level {
	 info, debug, error
	}
*/
export function getActionLogDetail(body = {
  team_name,
  app_alias,
  level,
  event_id,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/event_log`,
    {
      method: "get",
      params: {
        level: body.level || "info",
        event_id: body.event_id,
      },
    },
  );
}

/*
	部署应用
*/
export function deploy(body = {
  team_name,
  app_alias,
  is_upgrate
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/deploy`,
    {
      method: "post",
      data: {
        is_upgrate: body.is_upgrate ? true : false
      }
    },
  );
}
/*
	更新滚动
*/
export function updateRolling(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/upgrade`,
    {
      method: "post",
    },
  );
}
/*
	批量部署应用
*/
export function batchDeploy(body = {
  team_name,
  serviceIds,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/batch_actions`, {
    method: "post",
    data: {
      action: "deploy",
      service_ids: body.serviceIds,
    },
  });
}

/*
	应用重启
*/
export function restart(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/restart`,
    { method: "post" },
  );
}

/*
	批量重启
*/
export function batchReStart(body = {
  team_name,
  serviceIds,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/batch_actions`, {
    method: "post",
    data: {
      action: "restart",
      service_ids: body.serviceIds,
    },
  });
}

/*
	应用启动
*/
export function start(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/start`, {
    method: "post",
  });
}
/*
	批量应用启动
*/
export function batchStart(body = {
  team_name,
  serviceIds,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/batch_actions`, {
    method: "post",
    data: {
      action: "start",
      service_ids: body.serviceIds,
    },
  });
}

/*
	应用关闭
*/
export function stop(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/stop`, {
    method: "post",
  });
}

/*
	批量应用关闭
*/
export function batchStop(body = {
  team_name,
  serviceIds,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/batch_actions`, {
    method: "post",
    data: {
      action: "stop",
      service_ids: body.serviceIds,
    },
  });
}

/*
	应用回滚
*/
export function rollback(body = {
  team_name,
  app_alias,
  deploy_version,
  upgrade_or_rollback
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/rollback`,
    {
      method: "post",
      data: {
        deploy_version: body.deploy_version,
        upgrade_or_rollback: body.upgrade_or_rollback ? body.upgrade_or_rollback : -1
      },
    },
  );
}

/*
	获取应用详细信息
*/
export async function getDetail(
  body = {
    team_name,
    app_alias,
  },
  handleError,
) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/detail`,
    {
      method: "get",
      handleError,
    },
  );
}

/*
	获取应用状态
*/
export function getStatus(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/status`,
    {
      method: "get",
      showLoading: false,
    },
  );
}

/*
	获取监控日志--日志页面
*/
export function getMonitorLog(body = {
  team_name,
  app_alias,
  lines,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/log`, {
    method: "get",
    params: {
      action: "service",
      lines: body.lines || 50,
    },
  });
}

/*
	获取监控日志的websocket地址
*/
export function getMonitorWebSocketUrl(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/log_instance`,
    { method: "get" },
  );
}

/*
	历史日志下载
*/
export function getHistoryLog(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/history_log`,
    { method: "get" },
  );
}

/*
	水平升级
	new_node : 节点数量
*/
export function horizontal(body = {
  team_name,
  app_alias,
  new_node,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/horizontal`,
    {
      method: "post",
      data: {
        new_node: body.new_node,
      },
    },
  );
}

/*
	垂直升级
	new_memory : 内存数量 单位 MB
*/
export function vertical(body = {
  team_name,
  app_alias,
  new_memory,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/vertical`,
    {
      method: "post",
      data: {
        new_memory: body.new_memory,
      },
    },
  );
}

/*
  获取应用已依赖的其他应用
*/
export function getRelationedApp(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/dependency`,
    { method: "get" },
  );
}

/*
  获取应用可以依赖的应用
*/
export function getUnRelationedApp(body = {
  team_name,
  app_alias,
  page,
  page_size,
  search_key,
  condition,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/un_dependency`,
    {
      method: "get",
      params: {
        page: body.page || 1,
        page_size: body.page_size || 8,
        condition: body.condition,
        search_key: body.search_key,
      },
    },
  );
}

/*
  添加依赖的应用
*/
export function addRelationedApp(body = {
  team_name,
  app_alias,
  dep_service_id,
  container_port,
  open_inner
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/dependency`,
    {
      method: "post",
      data: {
        dep_service_id: body.dep_service_id,
        container_port: body.container_port ? body.container_port : "",
        open_inner: body.open_inner ? body.open_inner : ""
      },
    },
  );
}

/*
  添加依赖的应用
*/
export function batchAddRelationedApp(body = {
  team_name,
  app_alias,
  dep_service_id,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/dependency`,
    {
      method: "patch",
      data: {
        dep_service_ids: body.dep_service_ids.join(","),
      },
    },
  );
}

/*
	删除依赖的应用
*/
export function removeRelationedApp(body = {
  team_name,
  app_alias,
  dep_service_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/dependency/${body.dep_service_id}`,
    { method: "delete" },
  );
}

/*
	获取挂载或未挂载的目录
	type: 查询的类别 mnt（已挂载的,默认）| unmnt (未挂载的)
*/
export function getMnt(body = {
  team_name,
  app_alias,
  page,
  pageSize,
  type: "mnt",
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/mnt`, {
    method: "get",
    params: {
      page: body.page,
      page_size: body.page_size,
      type: body.type,
    },
  });
}

/*
   为应用挂载其他应用共享的存储
   body [{"id":49,"path":"/add"},{"id":85,"path":"/dadd"}]
*/
export function addMnt(body = {
  team_name,
  app_alias,
  body,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/mnt`, {
    method: "post",
    data: {
      body: JSON.stringify(body.body || []),
    },
  });
}

/*
  取消挂载依赖
*/
export async function deleteMnt(body = {
  team_name,
  app_alias,
  dep_vol_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/mnt/${body.dep_vol_id}`,
    { method: "delete" },
  );
}

/*
	获取应用的端口
*/
export async function getPorts(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports`, {
    method: "get",
  });
}

/*
   修改端口协议
*/

export async function changePortProtocal(body = {
  team_name,
  app_alias,
  port,
  protocol,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports/${body.port}`,
    {
      method: "put",
      data: {
        action: "change_protocol",
        protocol: body.protocol,
      },
    },
  );
}

/*
	打开端口外部访问
*/
export async function openPortOuter(body = {
  team_name,
  app_alias,
  port,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports/${body.port}`,
    {
      method: "put",
      data: {
        action: "open_outer",
      },
    },
  );
}

/*
	关闭端口外部访问
*/
export async function closePortOuter(body = {
  team_name,
  app_alias,
  port,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports/${body.port}`,
    {
      method: "put",
      data: {
        action: "close_outer",
      },
    },
  );
}

/*
	打开端口内部访问
*/
export async function openPortInner(body = {
  team_name,
  app_alias,
  port,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports/${body.port}`,
    {
      method: "put",
      data: {
        action: "open_inner",
      },
    },
  );
}

/*
	关闭端口内部访问
*/
export async function closePortInner(body = {
  team_name,
  app_alias,
  port,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports/${body.port}`,
    {
      method: "put",
      data: {
        action: "close_inner",
      },
    },
  );
}

/*
   修改端口别名
*/
export async function editPortAlias(body = {
  team_name,
  app_alias,
  port,
  port_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports/${body.port}`,
    {
      method: "put",
      data: {
        action: "change_port_alias",
        port_alias: body.port_alias,
      },
    },
  );
}

/*
	删除端口
*/
export async function deletePort(body = {
  team_name,
  app_alias,
  port,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports/${body.port}`,
    { method: "delete" },
  );
}

/*
	绑定域名
*/
export async function bindDomain(body = {
  team_name,
  app_alias,
  port,
  domain,
  protocol,
  certificate_id,
  group_id,
  rule_extensions
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/domain`,
    {
      method: "post",
      data: {
        domain_name: body.domain,
        container_port: body.port,
        protocol: body.protocol,
        certificate_id: body.certificate_id,
        group_id: body.group_id,
        rule_extensions: body.rule_extensions.length > 0 ? body.rule_extensions : []
      },
    },
  );
}

/*
	解绑域名
*/
export async function unbindDomain(body = {
  team_name,
  app_alias,
  port,
  domain,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/domain`,
    {
      method: "delete",
      data: {
        domain_name: body.domain,
        container_port: body.port,
      },
    },
  );
}

/*
	添加端口
*/
export async function addPort(body = {
  team_name,
  app_alias,
  port,
  protocol,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/ports`, {
    method: "post",
    data: {
      port: body.port,
      protocol: body.protocol,
    },
  });
}
/*
 获取应用的自定义环境变量
 evn
*/
export async function getInnerEnvs(body = {
  team_name,
  app_alias,
  env_type,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/envs`, {
    method: "get",
    params: {
      env_type: body.env_type?body.env_type:"inner",
    },
  });
}

/*
 添加应用的自定义环境变量
 name ： 说明
*/
export async function addInnerEnvs(body = {
  team_name,
  app_alias,
  name,
  attr_name,
  attr_value,
  scope
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/envs`, {
    method: "post",
    data: {
      name: body.name,
      attr_name: body.attr_name,
      attr_value: body.attr_value,
      scope: body.scope? body.scope:"inner",
      is_change: true,
    },
  });
}

/*
 获取应用的自定义环境变量
 evn
*/
export async function getOuterEnvs(body = {
  team_name,
  app_alias,
  env_type,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/envs`, {
    method: "get",
    params: {
      env_type: "outer",
    },
  });
}

/*
 添加应用的自定义环境变量
 name ： 说明
*/
export async function addOuterEnvs(body = {
  team_name,
  app_alias,
  name,
  attr_name,
  attr_value,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/envs`, {
    method: "post",
    data: {
      name: body.name,
      attr_name: body.attr_name,
      attr_value: body.attr_value,
      scope: "outer",
    },
  });
}

/*
 修改应用的环境变量
 name ： 说明
*/
export async function editEvns(body = {
  team_name,
  app_alias,
  name,
  attr_name,
  attr_value,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/envs/${body.attr_name}`,
    {
      method: "put",
      data: {
        name: body.name,
        attr_value: body.attr_value,
      },
    },
  );
}

/*
 删除应用的环境变量
*/
export async function deleteEvns(body = {
  team_name,
  app_alias,
  attr_name,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/envs/${body.attr_name}`,
    { method: "delete" },
  );
}
/*
 获取实例数据 teams/(?P<tenantName>[\w\-]+)/apps/(?P<serviceAlias>[\w\-]+)/third_party/pods
*/

export async function getInstanceList(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/third_party/pods`,
    { method: "get", },
  );
}
/*
 删除实例数据
*/
export async function deleteInstanceList(body = {
  team_name,
  app_alias,
  ep_id
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/third_party/pods`,
    {
      method: "delete",
      data: {
        ep_id: body.ep_id,
      },
    },
  );
}
/*
	添加/编辑实例数据
*/
export async function modifyInstanceList(body = {
  team_name,
  app_alias,
  ep_id,
  is_online
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/third_party/pods`,
    {
      method: "put",
      data: {
        ep_id: body.ep_id,
        is_online: body.is_online
      },
    });
}

/*
	添加/编辑实例数据
*/
export async function addInstanceList(body = {
  team_name,
  app_alias,
  endpoints_type,
  is_online
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/third_party/pods`,
    {
      method: "POST",
      data: {
        ip	: body.ip	,
        is_online: body.is_online,
      },
    });
}
/*
  编辑实例数据
*/
export async function editUpDatekey(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/third_party/updatekey`,
    {
      method: "put",
    });
}

/*
 获取实例数据 teams/(?P<tenantName>[\w\-]+)/apps/(?P<serviceAlias>[\w\-]+)/third_party/pods
*/

export async function getHealthList(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/3rd-party/health`,
    { method: "get", },
  );
}


export async function editorHealthList(body = {
  team_name,
  app_alias,
  scheme,
  time_interval,
  port,
  max_error_num,
  action,
  path
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/3rd-party/health`,
    { method: "put",
    data: {
      mode: "readiness",
      scheme: body.scheme,
      time_interval: body.time_interval,
      port: body.port,
      max_error_num: body.max_error_num,
      action: body.action,
      path: body.path,
    },
  },
  );
}

/*

/*
	获取应用运行时探测的信息
*/
export async function getRunningProbe(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/probe`, {
    method: "get",
    params: {
      mode: "liveness",
    },
  });
}

/*
	获取应用启动时探测的信息
*/
export async function getStartProbe(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/probe`, {
    method: "get",
    params: {
      mode: "readiness",
    },
  });
}

/*
	添加/编辑应用启动时探测
*/
export async function addStartProbe(body = {
  team_name,
  app_alias,
  scheme,
  path,
  port,
  initial_delay_second,
  period_second,
  timeout_second,
  success_threshold,
  mode
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/probe`, {
    method: "post",
    data: {
      mode:body.mode? body.mode:"readiness",
      scheme: body.scheme,
      path: body.path,
      port: body.port,
      http_header: body.http_header,
      initial_delay_second: body.initial_delay_second,
      period_second: body.period_second,
      timeout_second: body.timeout_second,
      success_threshold: body.success_threshold,
    },
  });
}

/*
	添加/编辑应用运行时探测
*/
export async function addRunningProbe(body = {
  team_name,
  app_alias,
  scheme,
  path,
  port,
  initial_delay_second,
  period_second,
  timeout_second,
  failure_threshold,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/probe`, {
    method: "post",
    data: {
      mode: "liveness",
      scheme: body.scheme,
      path: body.path,
      port: body.port,
      http_header: body.http_header,
      initial_delay_second: body.initial_delay_second,
      period_second: body.period_second,
      timeout_second: body.timeout_second,
      failure_threshold: body.failure_threshold,
    },
  });
}

/*
	添加/编辑应用启动时探测
*/
export async function editStartProbe(body = {
  team_name,
  app_alias,
  scheme,
  path,
  port,
  initial_delay_second,
  period_second,
  timeout_second,
  success_threshold,
  is_used,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/probe`, {
    method: "put",
    data: {
      mode:body.mode? body.mode:"readiness",
      scheme: body.scheme,
      path: body.path,
      port: body.port,
      http_header: body.http_header,
      initial_delay_second: body.initial_delay_second,
      period_second: body.period_second,
      timeout_second: body.timeout_second,
      success_threshold: body.success_threshold,
      is_used: body.is_used === void 0 ? true : body.is_used,
    },
  });
}

/*
	添加/编辑应用运行时探测
*/
export async function editRunningProbe(body = {
  team_name,
  app_alias,
  scheme,
  path,
  port,
  initial_delay_second,
  period_second,
  timeout_second,
  failure_threshold,
  is_used,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/probe`, {
    method: "put",
    data: {
      mode: "liveness",
      scheme: body.scheme,
      path: body.path,
      port: body.port,
      http_header: body.http_header,
      initial_delay_second: body.initial_delay_second,
      period_second: body.period_second,
      timeout_second: body.timeout_second,
      failure_threshold: body.failure_threshold,
      is_used: body.is_used === void 0 ? true : body.is_used,
    },
  });
}

/*
	获取应用基本详情
*/
export async function getBaseInfo(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/brief`, {
    method: "get",
  });
}

/*
	获取应用的持久化路径
*/
export async function getVolumes(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/volumes`,
    { method: "get" },
  );
}

/*
	添加应用的持久化路径
*/
export async function addVolume(body = {
  team_name,
  app_alias,
  volume_name,
  volume_type,
  volume_path,
  file_content
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/volumes`,
    {
      method: "post",
      data: {
        volume_name: body.volume_name,
        volume_type: body.volume_type,
        volume_path: body.volume_path,
        file_content: body.volume_type == "config-file" ? body.file_content : ''
      },
    },
  );
}

/*
	删除应用的某个持久化目录
*/
export async function deleteVolume(body = {
  team_name,
  app_alias,
  volume_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/volumes/${body.volume_id}`,
    { method: "delete" },
  );
}

/*
	 获取应用平均响应时间监控数据(当前请求时间点的数据)
*/
export async function getAppRequestTime(body = {
  team_name,
  app_alias,
  serviceId,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query`,
    {
      method: "get",
      showMessage: false,
      params: {
        query: `ceil(avg(app_requesttime{mode="avg",service_id="${body.serviceId}"}))`,
      },
      showLoading: false,
    },
  );
}

/*
	 获取应用平均响应时间监控数据(一段时间内数据)
*/
export async function getAppRequestTimeRange(body = {
  team_name,
  app_alias,
  serviceId,
  step: 7,
  start,
  end,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query_range`,
    {
      method: "get",
      showMessage: false,
      params: {
        query: `ceil(avg(app_requesttime{mode="avg",service_id="${body.serviceId}"}))`,
        start: body.start,
        end: body.end || new Date().getTime() / 1000,
        step: body.step,
      },
      showLoading: false,
    },
  );
}

/*
	 获取应用吞吐率监控数据(当前请求时间点的数据)
*/
export async function getAppRequest(body = {
  team_name,
  app_alias,
  serviceId,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query`,
    {
      method: "get",
      showMessage: false,
      params: {
        query:
          `sum(ceil(increase(app_request{service_id="${
          body.serviceId
          }",method="total"}[1m])/12))`,
      },
      showLoading: false,
    },
  );
}

/*
	 获取应用吞磁盘监控数据(当前请求时间点的数据)
*/
export async function getAppDisk(body = {
  team_name,
  app_alias,
  serviceId,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query`,
    {
      method: "get",
      showMessage: false,
      params: {
        query: `app_resource_appfs{service_id="${body.serviceId}"}`,
      },
      showLoading: false,
    },
  );
}

/*
	 获取应用吞磁盘监控数据(当前请求时间点的数据)
*/
export async function getAppMemory(body = {
  team_name,
  app_alias,
  serviceId,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query`,
    {
      method: "get",
      showMessage: false,
      params: {
        query: `app_resource_appmemory{service_id="${body.serviceId}"}`,
      },
      showLoading: false,
    },
  );
}

/*
	 获取应用吞吐率监控数据(一段时间内数据)
*/
export async function getAppRequestRange(body = {
  team_name,
  app_alias,
  serviceId,
  step: 7,
  start,
  end,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query_range`,
    {
      method: "get",
      showMessage: false,
      params: {
        query:
          `sum(ceil(increase(app_request{service_id="${
          body.serviceId
          }",method="total"}[1m])/12))`,
        start: body.start,
        end: body.end || new Date().getTime() / 1000,
        step: body.step,
      },
      showLoading: false,
    },
  );
}

/*
	获取应用在线人数监控数据(当前请求时间点的数据)
*/
export async function getAppOnlineNumber(body = {
  team_name,
  app_alias,
  serviceId,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query`,
    {
      method: "get",
      showMessage: false,
      params: {
        query: `max(app_requestclient{service_id="${body.serviceId}"})`,
      },
      showLoading: false,
    },
  );
}

/*
	获取应用在线人数监控数据(一段时间内数据)
*/
export async function getAppOnlineNumberRange(body = {
  team_name,
  app_alias,
  serviceId,
  step: 7,
  start,
  end,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/monitor/query_range`,
    {
      method: "get",
      showMessage: false,
      params: {
        query: `max(app_requestclient{service_id="${body.serviceId}"})`,
        start: body.start,
        end: body.end || new Date().getTime() / 1000,
        step: body.step,
      },
      showLoading: false,
    },
  );
}

/* 获取应用的代码分支 */
export function getCodeBranch(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/code/branch`,
    { method: "get" },
  );
}

/* 设置应用的代码分支 */
export function setCodeBranch(body = {
  team_name,
  app_alias,
  branch,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/code/branch`,
    {
      method: "put",
      data: {
        branch: body.branch,
      },
    },
  );
}

/*
获取应用的伸缩信息
*/
export async function getExtendInfo(
  body = {
    team_name,
    app_alias,
  },
  handleError,
) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/extend_method`,
    {
      method: "get",
      handleError,
    },
  );
}

/*
	获取应用的实例
*/
export async function getPods(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/pods`, {
    method: "get",
  });
}

/*
	管理实例
*/
export async function managePods(body = {
  team_name,
  app_alias,
  pod_name,
  manage_name,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/pods`, {
    method: "post",
    data: {
      c_id: body.pod_name,
      h_id: body.manage_name,
    },
  });
}

/*
   获取应用的访问信息
*/
export async function getVisitInfo(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/visit`, {
    method: "get",
    showLoading: false,
  });
}

/*
	获取应用标签
*/
export async function getTags(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/labels`,
    { method: "get" },
  );
}

/*
	删除应用标签
*/
export async function deleteTag(body = {
  team_name,
  app_alias,
  label_id,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/labels`,
    {
      method: "delete",
      data: {
        label_id: body.label_id,
      },
    },
  );
}

/*
	添加标签
*/
export async function addTags(body = {
  teamName,
  app_alias,
  label_ids,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/labels`,
    {
      method: "post",
      data: {
        label_ids: body.label_ids
      }
      ,
    },
  );
}

/*
	修改应用名称
*/
export async function editName(body = {
  team_name,
  app_alias,
  service_cname,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/brief`, {
    method: "put",
    data: {
      service_cname: body.service_cname,
    },
  });
}


/*
	修改对外端口拓扑图teams/(?P<tenantName>[\w\-]+)/apps/(?P<serviceAlias>[\w\-]+)/topological/ports
*/
export async function openExternalPort(body = {
  team_name,
  app_alias,
  container_port,
  open_outer,
  close_outer
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/topological/ports`, {
    method: "put",
    data: {
      open_outer: body.open_outer ? body.open_outer : "",
      container_port: body.container_port ? body.container_port : "",
      close_outer: body.close_outer ? body.close_outer : ""
    },
  });
}


/*
	转移组
*/
export async function moveName(body = {
  team_name,
  app_alias,
  service_cname,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/brief`, {
    method: "put",
    data: {
      service_cname: body.service_cname,
    },
  });
}

export function batchMove(body = {
  team_name,
  serviceIds,
  move_group_id,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/batch_actions`, {
    method: "post",
    data: {
      action: "move",
      service_ids: body.serviceIds,
      move_group_id: body.move_group_id,
    },
  });
}



/*
	获取设置了权限的团队成员
*/
export async function getMembers(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/perms`, {
    method: "get",
  });
}

/*
	获取团队成员
*/
export async function getPermissions(body = {
  team_name,
  app_alias,
}) {
  return request(`${config.baseUrl}/console/teams/three_service/operate_options`, {
    method: "get",
  });
}

/*
	设置用户权限
*/
export async function setMemberAction(body = {
  team_name,
  app_alias,
  user_ids: [],
  perm_ids,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/perms`, {
    method: "post",
    data: {
      user_ids: body.user_ids.join(","),
      perm_ids: body.perm_ids,
    },
  });
}

/*
	删除成员应用权限
*/
export async function deleteMember(body = {
  team_name,
  app_alias,
  user_id,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/perms`, {
    method: "delete",
    data: {
      user_id: body.user_id,
    },
  });
}

/*
	修改用户权限
*/
export async function editMemberAction(body = {
  team_name,
  app_alias,
  user_id,
  perm_ids,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/perms`, {
    method: "put",
    data: {
      user_id: body.user_id,
      perm_ids: body.perm_ids,
    },
  });
}

/*
	获取变量的信息
*/
export async function getVariableList(body = {
  attr_name,
  attr_value,
  team_name
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/services/envs`,
    {
      method: "get",
      params: {
        attr_name: body.attr_name ? body.attr_name : "",
        attr_value: body.attr_value ? body.attr_value : "",
      },
    },
  );
}

/*
	修改应用所属组
*/
export async function moveGroup(body = {
  team_name,
  app_alias,
  group_id,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/group`, {
    method: "put",
    data: {
      group_id: body.group_id,
    },
  });
}

/*
	获取应用的运行环境信息
*/
export async function getRuntimeInfo(body = {
  team_name,
  app_alias,
  group_id,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/compile_env`,
    { method: "get" },
  );
}

/*
	修改应用的运行环境信息
*/
export async function editRuntimeInfo(body = {
  team_name,
  app_alias,
  service_runtimes,
  service_server,
  service_dependency,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/compile_env`,
    {
      method: "put",
      data: {
        // 服务运行版本，如php5.5等
        service_runtimes: body.service_runtimes,
        // 服务使用的服务器，如tomcat,apache,nginx等
        service_server: body.service_server,
        // 服务依赖，如php-mysql扩展等
        service_dependency: body.service_dependency,
      },
    },
  );
}

/*
	应用未创建阶段的信息修改
	可部分修改
*/

export async function editAppCreateInfo(body = {
  team_name,
  app_alias,
  service_cname,
  image,
  cmd,
  git_url,
  min_memory,
  extend_method,
  user_name,
  password,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/check_update`,
    {
      method: "put",
      data: body,
    },
  );
}

/*
	删除应用
	is_force:	true直接删除，false进入回收站
	未创建成功的直接删除、 已经创建的进入回收站
*/
export async function deleteApp(body = {
  team_name,
  app_alias,
  is_force,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/delete`,
    {
      method: "delete",
      data: {
        is_force: true,
      },
    },
  );
}

/*
	批量应用删除
*/
export function batchDelete(body = {
  team_name,
  serviceIds,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/batch_delete`, {
    method: "delete",
    data: {
      service_ids: body.serviceIds,
    },
  });
}

/*
	二次确认强制删除
*/
export function reDelete(body = {
  team_name,
  service_id,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/again_delete`, {
    method: "delete",
    data: {
      service_id: body.service_id,
    },
  });
}

/*
	查询应用的性能分析插件
*/
export async function getAnalyzePlugins(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/analyze_plugins`,
    { method: "get" },
  );
}

/*
	获取应用的插件信息, 包括已安装的和未安装的
*/
export async function getPlugins(body = {
  team_name,
  app_alias,
  category,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/pluginlist`,
    {
      method: "get",
      params: {
        category: body.category,
      },
    },
  );
}

/*
	开通插件
*/
export async function installPlugin(body = {
  team_name,
  app_alias,
  plugin_id,
  build_version,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/plugins/${body.plugin_id}/install`,
    {
      method: "post",
      data: {
        build_version: body.build_version,
      },
    },
  );
}

/*
	卸载插件
*/
export async function unInstallPlugin(body = {
  team_name,
  app_alias,
  plugin_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/plugins/${body.plugin_id}/install`,
    { method: "delete" },
  );
}

/*
  启用插件
*/
export async function startPlugin(body = {
  team_name,
  app_alias,
  plugin_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/plugins/${body.plugin_id}/open`,
    {
      method: "put",
      data: {
        is_switch: true,
        min_memory: body.min_memory,
      },
    },
  );
}

/*
  更新插件内存
*/
export async function updatePluginMemory(body = {
  team_name,
  app_alias,
  plugin_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/plugins/${body.plugin_id}/open`,
    {
      method: "put",
      data: {
        min_memory: body.min_memory,
      },
    },
  );
}

/*
  停用插件
*/
export async function stopPlugin(body = {
  team_name,
  app_alias,
  plugin_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/plugins/${body.plugin_id}/open`,
    {
      method: "put",
      data: {
        is_switch: false,
      },
    },
  );
}

/*
   获取插件的配置信息
*/
export async function getPluginConfigs(body = {
  team_name,
  app_alias,
  plugin_id,
  build_version,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/plugins/${body.plugin_id}/configs`,
    {
      method: "get",
      params: {
        build_version: body.build_version,
      },
    },
  );
}

/*
   更新插件的配置信息
*/
export async function editPluginConfigs(body = {
  team_name,
  app_alias,
  plugin_id,
  data,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.app_alias}/plugins/${body.plugin_id}/configs`,
    {
      method: "put",
      data: body.data,
    },
  );
}

/* 查询应用的内存和磁盘使用情况 */
export async function getAppResource(body = { team_name, app_alias }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/resource`,
    {
      method: "get",
    },
  );
}

/*
   查询自定义二级域名后缀
*/
export async function getSubDomain(body = {
  team_name,
  service_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.service_alias}/sld-domain`,
    {
      method: "get",
      params: {
        team_name: body.team_name,
        service_alias: body.service_alias,
      },
    },
  );
}

/*
   修改二级域名
*/
export async function SubDomain(body = {
  team_name,
  service_alias,
  domain_name,
  container_port,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.service_alias}/sld-domain`,
    {
      method: "put",
      data: {
        domain_name: body.domain_name,
        container_port: body.container_port,
      },
    },
  );
}

/*
   查询可修改tcp端口
*/
export async function getSubPort(body = {
  team_name,
  service_alias,
  port,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.service_alias}/tcp-ports/${body.port}`,
    {
      method: "get",
      params: {
        team_name: body.team_name,
        service_alias: body.service_alias,
        port: body.port,
      },
    },
  );
}

/*
   修改端口
*/
export async function SubPort(body = {
  team_name,
  service_alias,
  port,
  lb_mapping_port,
  service_id,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.service_alias}/tcp-ports/${body.port}`,
    {
      method: "put",
      data: {
        lb_mapping_port: body.lb_mapping_port,
        service_id: body.service_id,
      },
    },
  );
}

/*
   修改自动构建API秘钥
*/
export async function putAutoDeploySecret(body = {
  team_name,
  service_alias,
  secret_key,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.service_alias}/webhooks/updatekey`,
    {
      method: "put",
      data: {
        secret_key: body.secret_key,
      },
    },
  );
}


/*
   修改自动构建命令
*/
export async function putAutoDeployCommand(body = {
  team_name,
  service_alias,
  keyword,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.service_alias}/keyword'`,
    {
      method: "put",
      data: {
        keyword: body.keyword,
      },
    },
  );
}





/*
  获取应用构建源信息
*/
export async function getAppBuidSource(body = {
  team_name,
  service_alias,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.service_alias}/buildsource`,
    {
      method: "get",
    },
  );
}

/*
  获取标签信息
*/
export async function getTagInformation(body = {
  team_name,
  app_alias,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/labels/available`,
    {
      method: "get",
    },
  );
}



/*
  修改应用构建源信息
*/
export async function putAppBuidSource(body = {
  team_name,
  service_alias,
}) {
  return request(
    `${config.baseUrl
    }/console/teams/${body.team_name}/apps/${body.service_alias}/buildsource`,
    {
      method: "put",
      data: {
        service_source: body.service_source,
        git_url: body.git_url,
        code_version: body.code_version,
        image: body.image,
        cmd: body.cmd,
        user_name: body.user_name,
        password: body.password,
      },
    },
  );
}

/**更改应用状态 */
export async function updateAppStatus(params) {
  console.log(params)
  return request(`${config.baseUrl}/console/teams/${params.team_name}/apps/${params.app_alias}/change/service_type`, {
    method: "put",
    data: {
      extend_method: params.extend_method
    }
  });
}

/**修改服务名称 */
export async function updateServiceName(params) {
  return request(`${config.baseUrl}/console/teams/${params.team_name}/apps/${params.app_alias}/change/service_name`, {
    method: "put",
    data: {
      service_name: params.service_name
    }
  });
}

/**修改应用状态 */
export async function changeApplicationState(params) {
  return request(`${config.baseUrl}/console/teams/${params.team_name}/apps/${params.app_alias}/set/is_upgrade`, {
    method: "put",
    data: {
      build_upgrade: params.build_upgrade
    }
  });
}
