import { stringify } from 'qs';
import request from '../utils/request';

export async function authLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getTagList(params) {
  return request(`/api/tag?${stringify(params)}`);
}

export async function addTag(params) {
  return request('/api/tag', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteTag(params) {
  return request(`/api/tag/${params}`, {
    method: 'DELETE',
  });
}

export async function updateTag(params) {
  const { _id } = params;
  return request(`/api/tag/${_id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getArticleList(params) {
  return request(`/api/article?${stringify(params)}`);
}

export async function deleteArticle(params) {
  return request(`/api/article/${params}`, {
    method: 'DELETE',
  });
}

export async function changeArticleStatus(params) {
  const { _id, publish, state } = params;
  if (publish) {
    return request(`/api/article/${_id}`, {
      method: 'PATCH',
      body: {
        publish,
      },
    });
  }
  if (state) {
    return request(`/api/article/${_id}`, {
      method: 'PATCH',
      body: {
        state,
      },
    });
  }
}

export async function postArticle(params) {
  return request('/api/article', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateArticle(params) {
  console.log(params)
  const { _id } = params;
  return request(`/api/article/${_id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getArticleDetail(params) {
  return request(`/api/article/${params}`);
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
