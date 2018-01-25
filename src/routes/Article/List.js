import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, List, Form, Tag, Icon, Button, Radio } from 'antd';

import DropOption from '../../components/DropOption';
import StandardFormRow from '../../components/StandardFormRow';
import HeaderSearch from '../../components/HeaderSearch';
import styles from './List.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@Form.create()
@connect(({ article, tag, loading }) => ({
  article,
  tag,
  loading: loading.models.article,
}))
export default class SearchList extends Component {
  state = {
    size: 'small',
  }

  componentDidMount() {
    this.fetchMore();
  }

  handleMenuClick = (item, e) => {
    const { _id, publish, state } = item;
    const newPublish = publish === 1 ? 2 : 1;
    const newState = state === 1 ? 2 : 1;
    if (e.key === '1') {
      console.log(item)
    } else if (e.key === '2') {
      this.handleDelete(_id);
    } else if (e.key === '3') {
      this.handlePublishStatus(_id, newPublish);
    } else if (e.key === '4') {
      this.handleStateStatus(_id, newState);
    }
  }

  handleSearch = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetch',
      payload: {
        keyword: value,
      },
    });
  }

  fetchMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tag/fetch',
    });
    dispatch({
      type: 'article/fetch',
    });
  }

  handleTagRadio = (e) => {
    const { dispatch } = this.props;
    this.props.form.setFieldsValue({ tag: e.target.value });
    const params = this.props.form.getFieldsValue();
    console.log(params)
    dispatch({
      type: 'article/fetch',
      payload: params,
    });
  }

  handlePublishRadio = (e) => {
    const { dispatch } = this.props;
    this.props.form.setFieldsValue({ publish: e.target.value });
    const params = this.props.form.getFieldsValue();
    dispatch({
      type: 'article/fetch',
      payload: params,
    });
  }

  handleStateRadio = (e) => {
    const { dispatch } = this.props;
    this.props.form.setFieldsValue({ state: e.target.value });
    const params = this.props.form.getFieldsValue();
    dispatch({
      type: 'article/fetch',
      payload: params,
    });
  }

  handlePublishStatus = (_id, newPublish) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/changePublish',
      payload: {
        _id,
        publish: newPublish,
      },
    });
  }

  handleStateStatus = (_id, newState) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/changeState',
      payload: {
        _id,
        state: newState,
      },
    });
  }

  handleDelete = (_id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/delete',
      payload: _id,
    });
  }

  render() {
    const tagList = this.props.tag.data.result.list;
    const articleList = this.props.article.data.result.list;
    const { getFieldDecorator } = this.props.form;
    const loading = false;
    const { size } = this.state;

    const formatEnumOptions = (value, source) => {
      for (const item of source) {
        if (value === item.id) {
          return item.name;
        }
      }
      return '';
    };

    const publishStatus = [
      { name: '公开', id: 1 },
      { name: '私密', id: 2 },
    ];

    const state = [
      { name: '已发布', id: 1 },
      { name: '草稿', id: 2 },
    ];

    const articleNameList = [];
    articleList.map(item => articleNameList.push(item.title));

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { descript, create_at, meta, publish, state, tag } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{descript}</div>
        <div className={styles.extra}>
          <em>{moment(create_at).format('YYYY-MM-DD HH:mm')}</em>
        </div>
      </div>
    );

    const menuList = [
      { key: '1', name: '编辑' },
      { key: '2', name: '删除' },
      { key: '3', name: '切换公开/私密' },
      { key: '4', name: '切换发布/草稿' },
    ];

    const loadMore = articleList.length > 0 ? (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loading ? <span><Icon type="loading" /> 加载中...</span> : '加载更多'}
        </Button>
      </div>
    ) : null;

    return (
      <div>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="标签" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('tag')(
                  <RadioGroup onChange={this.handleTagRadio}>
                    <RadioButton>全部</RadioButton>
                    {
                      tagList.map(item =>
                        <RadioButton key={item.id} value={item._id}>{item.name}</RadioButton>
                      )
                    }
                  </RadioGroup>
                  )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="公开" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('publish')(
                  <RadioGroup onChange={this.handlePublishRadio}>
                    <RadioButton>全部</RadioButton>
                    {
                      publishStatus.map(item =>
                        <RadioButton key={item.id} value={item.id}>{item.name}</RadioButton>
                      )
                    }
                  </RadioGroup>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="状态" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('state')(
                  <RadioGroup onChange={this.handleStateRadio}>
                    <RadioButton>全部</RadioButton>
                    {
                      state.map(item =>
                        <RadioButton key={item.id} value={item.id}>{item.name}</RadioButton>
                      )
                    }
                  </RadioGroup>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="搜索" block style={{ paddingBottom: 11 }}>
              <HeaderSearch
                placeholder="站内搜索"
                dataSource={articleNameList}
                onPressEnter={this.handleSearch}
              />
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={articleList.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={articleList}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="eye-o" text={item.meta.views} />,
                  <IconText type="like-o" text={item.meta.likes} />,
                  <IconText type="message" text={item.meta.comments} />,
                  // <Button>修改</Button>,
                  // <Button>删除</Button>,
                  <DropOption onMenuClick={e => this.handleMenuClick(item, e)} menuOptions={menuList} />,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={(
                    <a className={styles.listItemMetaTitle} href={item.href}>{item.title}</a>
                  )}
                  description={
                    <div>
                      {/* Adjacent JSX elements must be wrapped in an enclosing tag */}
                      <span>
                        {
                          item.tag.map(tag =>
                            <Tag key={tag.id}>{tag.name}</Tag>
                          )
                        }
                      </span>
                      <span>
                        <Tag>{formatEnumOptions(item.publish, publishStatus)}</Tag>
                        <Tag>{formatEnumOptions(item.state, state)}</Tag>
                      </span>
                    </div>
                  }
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
