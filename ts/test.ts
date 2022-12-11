function loading() {
  const h = ['|', '/', '-', '\\'];
  let i = 0;

  return setInterval(() => {
    i = (i > 3) ? 0 : i;
    console.clear();
    console.log(h[i]);
    i++;
  }, 300);
}

loading();