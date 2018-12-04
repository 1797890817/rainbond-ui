import request from "../utils/request";
import config from "../config/config";

/**获取http数据 */
export async function queryHttpData(param) {
    return request(`${config.baseUrl}/console/teams/${param.team_name}/domain/query`, {
        method: "get",
        params: {
            page: param.page_num || 1,
            page_size: param.page_size || 15,
        }
    });
}

/**获取连接信息 */
export async function fetchEnvs(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/apps/${params.app_alias}/envs`, {
        method: "get",
        params: {
            env_type: "outer",
        },
    });
}

/**获取所证书列表 */
export async function fetchAllLicense(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/certificates`, {
        method: "get",
        params: {
            page_size: params.page_size || 10,
            page_num: params.page_num || 1,
        },
    });
}

/**添加证书 */
export async function addLicense(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/certificates`, {
        method: "post",
        data: {
            alias: params.alias,
            private_key: params.private_key,
            certificate: params.certificate,
            certificate_type: params.certificate_type
        },
    });
}
/**编辑证书 */
export async function editLicense(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/certificates/${params.certifiate_id}`, {
        method: "PUT",
        data: {
            alias: params.alias,
            private_key: params.private_key,
            certificate: params.certificate,
            certificate_type: params.certificate_type,
        },
    });
}
/**删除证书 */
export async function deleteLicense(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/certificates/${params.certifiate_id}`, {
        method: "DELETE",
    });
}
/**查看证书详情 */
export async function queryDetail(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/certificates/${params.certifiate_id}`, {
        method: "get",
    });
}
/**搜索http */
export async function searchHttp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/domain/query`, {
        method: "get",
        params: {
            search_conditions: params.search_conditions,
            page_size: params.page_size || 10,
            page_num: params.page_num || 1,
        }
    });
}

/**添加http策略 */
export async function addHttpStrategy(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/httpdomain`, {
        method: "post",
        data: {
            container_port: params.values.container_port,
            certificate_id: params.values.certificate_id||'',
            domain_cookie: params.values.domain_cookie,
            domain_heander: params.values.domain_heander,
            domain_name: params.values.domain_name,
            domain_path: params.values.domain_path,
            group_id: params.values.group_id,
            rule_extensions: params.rule_extensions && params.rule_extensions.length ? params.rule_extensions : [],
            the_weight: params.values.the_weight,
            service_id: params.values.service_id,
            group_name: params.group_name,
            whether_open: params.values.whether_open ? true : false//是否开启对外访问
        }
    });
}

/**删除http */
export async function deleteHttp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/httpdomain`, {
        method: "DELETE",
        data: {
            container_port: params.container_port,
            domain_name: params.domain_name,
            service_id: params.service_id,
            http_rule_id: params.http_rule_id,
        }
    });
}
/**查询编辑详情 */
export async function queryDetail_http(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/httpdomain`, {
        method: "get",
        params: {
            http_rule_id: params.http_rule_id
        }
    });
}

/**编辑http */
export async function editHttpStrategy(params) {
    console.log(params)
    return request(`${config.baseUrl}/console/teams/${params.team_name}/httpdomain`, {
        method: "put",
        data: {
            container_port: params.values.container_port,
            certificate_id: params.values.certificate_id||'',
            domain_cookie: params.values.domain_cookie,
            domain_heander: params.values.domain_heander,
            domain_name: params.values.domain_name,
            domain_path: params.values.domain_path,
            group_id: params.values.group_id,
            rule_extensions: params.rule_extensions && params.rule_extensions.length ? params.rule_extensions : [],
            the_weight: params.values.the_weight,
            service_id: params.values.service_id,
            group_name: params.group_name,
            http_rule_id: params.http_rule_id
        }
    });
}
/**查询tcp */
export async function queryTcpData(param) {
    return request(`${config.baseUrl}/console/teams/${param.team_name}/tcpdomain/query`, {
        method: "get",
        params: {
            page: param.page_num || 1,
            page_size: param.page_size || 15,
        }
    });
}
/**搜索tcp */
export async function searchTcp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/tcpdomain/query`, {
        method: "get",
        params: {
            search_conditions: params.search_conditions,
            page_size: params.page_size || 10,
            page_num: params.page_num || 1,
        }
    });
}
/**删除tcp */
export async function deleteTcp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/tcpdomain`, {
        method: "DELETE",
        data: {
            tcp_rule_id: params.tcp_rule_id,
            service_id: params.service_id
        }
    });
}
/**查询ip */
export async function querydomain_port(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/domain/get_port`, {
        method: "get"
    });
}
/**查询tcp详细信息 */
export async function queryDetail_tcp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/tcpdomain`, {
        method: "get",
        params: {
            tcp_rule_id: params.tcp_rule_id
        }
    });
}
/**添加tcp */
export async function addTcp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/tcpdomain`, {
        method: "post",
        data: {
            container_port: params.values.container_port,
            end_point: `${params.values.end_point.ip}:${params.values.end_point.port}`,
            group_id: params.values.group_id.key,
            group_name: params.values.group_id.label,
            service_id: params.values.service_id,
            default_port: params.values.end_point.port,
            whether_open: params.values.whether_open ? true : false,
            rule_extensions: params.rule_extensions && params.rule_extensions.length ? params.rule_extensions : [],
            default_ip:params.values.end_point.currency
        }
    });
}
/**编辑tcp */
export async function editTcp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/tcpdomain`, {
        method: "put",
        data: {
            container_port: params.values.container_port,
            end_point: `${params.values.end_point.ip}:${params.values.end_point.port}`,
            group_id: params.values.group_id.key,
            group_name: params.values.group_id.label,
            service_id: params.values.service_id,
            default_port: params.values.end_point.port,
            whether_open: params.values.whether_open ? true : false,
            rule_extensions: params.rule_extensions && params.rule_extensions.length ? params.rule_extensions : [],
            tcp_rule_id: params.tcp_rule_id,
            default_ip:params.values.end_point.currency
        }
    });
}

/**查询应用状态 */
export async function query_app_status(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/apps/${params.app_alias}/status`, {
        method: "get",
    });
}

export async function startApp(params) {
    return request(`${config.baseUrl}/console/teams/${params.team_name}/apps/${params.app_alias}/start`, {
        method: "post",
    });
}