function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log("加载中...");
sleep(1000).then(() => console.log("加载完成"));
