const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => {
    if (current.likes > max.likes) {
      return current;
    } else {
      return max;
    }
  });
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");
  console.log(groupedByAuthor);
  const authorBlogCounts = _.mapValues(
    groupedByAuthor,
    (authorBlogs) => authorBlogs.length
  );
  const maxBlogsAuthor = _.maxBy(
    _.keys(authorBlogCounts),
    (author) => authorBlogCounts[author]
  );

  return {
    author: maxBlogsAuthor,
    blogs: authorBlogCounts[String(maxBlogsAuthor)],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
