/**
 * 主函数 - 脚本的入口点
 * @param {Object} context - 脚本执行上下文
 * @returns {Object|Array} RSS格式的数据或文章数组
 */
async function main(context) {
  const { routeParams, utils, auth, console, dayjs, require } = context;
  
  try {
    // 在这里编写您的脚本逻辑
    console.log('脚本开始执行，路由参数:', routeParams);

    const { period = 'day' } = routeParams;

    const rootUrl = 'https://wallstreetcn.com';
    const apiRootUrl = 'https://api-one-wscn.awtmt.com';
    const apiUrl = `${apiRootUrl}/apiv1/content/articles/hot?period=all`;

    const response = await utils.fetchApi(apiUrl);

    let items = response.data.data[`${period}_items`].map((item) => ({
      guid: item.id,
      link: item.uri,
      pubDate: (item.display_time * 1000),
    }));

    items = await Promise.all(items.map(async (item) => {
      const detailResponse = await utils.fetchApi(`${apiRootUrl}/apiv1/content/articles/${item.guid}?extract=0`);

      const data = detailResponse.data.data;

      item.title = data.title || data.content_text;
      item.author = data.source_name ?? data.author.display_name;
      item.content = data.content + (data.content_more ?? '');
      item.category = data.asset_tags?.map((t) => t.name) ?? [];

      if (data.audio_uri) {
        item.enclosure_type = 'audio/mpeg';
        item.enclosure_url = data.audio_uri;
        item.itunes_item_image = data.image?.uri ?? '';
        item.itunes_duration = data.audio_info?.duration ?? '';
      }

      return item;
    }));
    
    return {
      title: '华尔街见闻 - 最热文章',
      link: rootUrl,
      items: items,
      itunes_author: '华尔街见闻',
      description: '华尔街见闻 - 最热文章',
      image: 'https://static.wscn.net/wscn/_static/favicon.png',
    };
    
  } catch (error) {
    console.error('脚本执行失败:', error);
    throw error;
  }
}

// 导出主函数
module.exports = { main };
