const renderimg = (url: string) => {
  if (url.startsWith("https")) {
    return url;
  } else {
    url = `http://backend-api-01.newbee.ltd${url}`;
    return url;
  }
};
export { renderimg };
