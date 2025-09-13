# 华尔街见闻 - 最热文章

华尔街见闻 - 最热文章

## 路由信息

- **路径**: `/wallstreetcn/hot`
- **方法**: `GET`
- **刷新间隔**: 60 分钟

## 参数说明

- **period** （可选）:  时期，可选 day 即 当日 或 week 即 当周，默认为当日 默认值: `day`

## 使用示例

```bash
# 基本调用
curl "http://localhost:8008/wallstreetcn/hot"

# 带参数调用（如果有参数）
curl "http://localhost:8008/wallstreetcn/hot?param1=value1&param2=value2"
```

## 可用上下文对象

脚本执行时可以使用以下上下文对象：

- `routeParams`: 路由参数对象
- `utils`: 工具函数集合
- `auth`: 授权信息（如果配置了授权凭证）
- `console`: 日志输出对象
- `dayjs`: 日期处理库
- `helpers`: 辅助函数
- `customRequire`: 自定义require函数

## 返回格式

脚本应该返回以下格式的数据：

```javascript
{
  title: 'RSS标题',
  description: 'RSS描述',
  link: 'RSS链接',
  items: [
    {
      title: '文章标题',
      link: '文章链接',
      content: '文章内容',
      author: '作者',
      pubDate: '发布时间（ISO格式）'
    }
  ]
}
```

## 注意事项

1. 所有参数都是字符串类型，需要时请进行类型转换
2. 建议对参数进行验证和默认值处理
3. 错误处理：使用try-catch包装可能出错的代码
4. 性能考虑：避免过度复杂的逻辑，合理使用缓存

## 更新日志

- 初始版本：基础脚本模板
