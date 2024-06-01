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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
