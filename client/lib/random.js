// a number between 1/2 n and 3/2 n
randomLike = function(n) {
  return (0.5 + Math.random()) * n;
}

randomBetween = function(max, min) {
  return Math.random() * (max - min) + min;
}