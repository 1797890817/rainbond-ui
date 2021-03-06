import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Icon, Dropdown, Input, notification } from 'antd';
import style from './index.less';
import { Link } from 'dva/router';
import CreateTeam from '../CreateTeam';
import userUtil from '../../utils/user';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
export default class SelectTeam extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queryName: '',
      page: 1,
      page_size: 5,
      userTeamList: [],
      userTeamsLoading: true,
      showCreateTeam: false,
      loading: true,
      visible: false,
    };
  }
  componentDidMount() {
    this.loadUserTeams('');
  }
  queryTeams = queryName => {
    this.setState({ queryName }, () => {
      this.loadUserTeams();
    });
  };
  loadUserTeams = () => {
    this.setState({ loading: true });
    const { dispatch, currentUser, currentEnterprise } = this.props;
    const { page, page_size, queryName } = this.state;
    dispatch({
      type: 'global/fetchUserTeams',
      payload: {
        enterprise_id: currentEnterprise.enterprise_id,
        user_id: currentUser.user_id,
        name: queryName,
        page,
        page_size,
      },
      callback: res => {
        if (res && res._code === 200) {
          this.setState({
            userTeamList: res.list,
            userTeamsLoading: false,
            loading: false,
          });
        }
      },
    });
  };
  showCreateTeam = () => {
    this.handleOut();
    this.setState({ showCreateTeam: true });
  };

  handleCreateTeam = values => {
    const { dispatch } = this.props;

    dispatch({
      type: 'teamControl/createTeam',
      payload: values,
      callback: () => {
        // 获取最新的用户信息
        dispatch({ type: 'user/fetchCurrent' });
        notification.success({ message: formatMessage({ id: 'add.success' }) });
        this.cancelCreateTeam();
        this.loadUserTeams();
      },
    });
  };

  cancelCreateTeam = () => {
    this.handleOut();
    this.setState({ showCreateTeam: false });
  };

  handleEnter = () => {
    this.setState({ visible: true });
  };
  handleOut = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      className,
      currentTeam,
      currentEnterprise,
      currentRegion,
      currentUser,
      active,
    } = this.props;
    const { userTeamList, loading, showCreateTeam, visible } = this.state;
    const currentTeamLink = `/team/${currentTeam.team_name}/region/${currentRegion.team_region_name}/index`;
    const currentEnterpriseTeamPageLink = `/enterprise/${currentEnterprise.enterprise_id}/teams`;
    const items = [];
    userTeamList.map(team => {
      const teamInfo = userUtil.getTeamByTeamName(currentUser, team.team_name);
      teamInfo.region.map(region => {
        const link = `/team/${team.team_name}/region/${region.team_region_name}/index`;
        const item = {
          name: `${team.team_alias} | ${region.team_region_alias}`,
          link,
        };
        items.push(item);
      });
    });
    const dropdown = (
      <div className={style.dropBox}>
        <div>
          <div className={style.dropBoxSearch}>
            <div className={style.dropBoxSearchInput}>
              <Icon
                className={style.dropBoxSearchInputIcon}
                loading={`${loading}`}
                type="search"
              />
              <Input.Search
                onSearch={this.queryTeams}
                className={style.dropBoxSearchInputContrl}
                placeholder={formatMessage({ id: 'header.team.search' })}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={style.dropBoxList}>
            <ul>
              {items.map(item => {
                return (
                  <li key={item.name}>
                    <Link to={item.link} title={item.name}>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {currentUser.is_user_enter_amdin && (
              <div
                className={style.dropBoxListCreate}
                onClick={this.showCreateTeam}
              >
                <Icon type="plus" />
                <FormattedMessage id="header.team.create" />
              </div>
            )}
          </div>
          <Link className={style.dropBoxAll} to={currentEnterpriseTeamPageLink}>
            <span>
              <FormattedMessage id="header.team.getall" />
            </span>
            <Icon type="right" />
          </Link>
        </div>
      </div>
    );
    const showstyle = { background: '#1890ff', color: '#ffffff' };
    return (
      <div
        className={className}
        onMouseLeave={this.handleOut}
        onMouseEnter={this.handleEnter}
      >
        <Dropdown overlay={dropdown} visible={showCreateTeam ? false : visible}>
          <div>
            {active && (
              <div className={style.selectButton}>
                <div className={style.selectButtonName} style={showstyle}>
                  <span>
                    {currentTeam.team_alias} | {currentRegion.team_region_alias}
                  </span>
                  <Icon className={style.selectButtonArray} type="caret-down" />
                </div>
              </div>
            )}
            {!active && (
              <Link className={style.selectButtonLink} to={currentTeamLink}>
                {currentTeam.team_alias} | {currentRegion.team_region_alias}
              </Link>
            )}
          </div>
        </Dropdown>
        {showCreateTeam && (
          <CreateTeam
            enterprise_id={currentEnterprise.enterprise_id}
            onOk={this.handleCreateTeam}
            onCancel={this.cancelCreateTeam}
          />
        )}
      </div>
    );
  }
}
