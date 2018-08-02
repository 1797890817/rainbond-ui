import React, { PureComponent } from "react";
import { Table } from "antd";

class TeamListTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps() {}

  handleTableChange = (pagination, filters, sorter) => {
    if (this.props.onChange) {
      this.props.onChange(pagination, filters, sorter);
    }
  };

  render() {
    const { list, pagination, onDelete } = this.props;

    const columns = [
      {
        title: "团队名称",
        dataIndex: "tenant_alias",
      },
      {
        title: "拥有人",
        dataIndex: "tenant_name",
        render(val) {
          return <span>{val}</span>;
        },
      },
      {
        title: "资源分配策略",
        dataIndex: "",
        render(val) {
          return <span>企业共享</span>;
        },
      },
      {
        title: "操作",
        dataIndex: "action",
        render(val, data) {
          return (
            <div>
              <a
                href="javascript:;"
                onClick={() => {
                  onDelete(data.tenant_name);
                }}
              >
                删除
              </a>
            </div>
          );
        },
      },
    ];

    return (
      <Table
        pagination={pagination}
        dataSource={list}
        columns={columns}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default TeamListTable;