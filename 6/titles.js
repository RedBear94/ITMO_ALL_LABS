const posts = require('./posts');

const titles = posts.map(post => {
  return post.title.rendered;
});

console.log(titles);
