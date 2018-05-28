## WP REST API

Спомощью curl получены заголовки постов на моем wp сайте https://redbear95.000webhostapp.com

```bash
echo module.exports = > posts.js
curl https://redbear95.000webhostapp.com/wp-json/wp/v2/posts >> posts.js
```

Получил заголовки используюя скрипт: `node titles.js`
