/**
 * 主函数 - 脚本的入口点
 * @param {Object} context - 脚本执行上下文
 * @returns {Object|Array} RSS格式的数据或文章数组
 */
async function main(context) {
  const { routeParams, utils, auth, console, dayjs, require } = context;
  
  // 获取路由参数
  const { uid, type='video' } = routeParams;

  let rssObj = null;
  let items = [];

  // 使用utils.fetchApi会自动应用配置的授权信息
  const result = await utils.fetchApi(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?type=${type}&host_mid=${uid}&platform=web`);
    // 处理返回的数据
  result.data.data.items.forEach((post, index)=> {
    // 文章和视频取的不一样
    let article = utils.safeGet(post.modules.module_dynamic.major, 'article', post.modules.module_dynamic.major.archive)

    let author = utils.safeGet(post.modules.module_author, 'name', '')

    let face = utils.safeGet(post.modules.module_author, 'face', '')

    if (!rssObj) {
      rssObj = {
        title: `${author}的个人动态-哔哩哔哩视频`,
        description: `${author}的个人动态-哔哩哔哩视频`,
        site_url: `https: //space.bilibili.com/${uid}/dynamic`,
        language: "zh-CN",
        image: face,
      }
    }
 
    items.push({
      title: utils.safeGet(article, 'title', ''),
      link: utils.safeGet(article, 'jump_url', ''),
      content: utils.safeGet(article, 'desc', ''),
      author: utils.safeGet(post.modules.module_author, 'name', ''),
      pubDate: utils.parseDate(post.modules.module_author.pub_time)
    });
  });

  rssObj.items = items;

  return rssObj;
}
// 导出主函数
module.exports = { main };