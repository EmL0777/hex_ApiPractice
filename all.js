let product = {
  data: {
    uuid: 'd5cc7331-56ba-49f5-9c9f-6c2038f2b0a8',
    products: [],
  },
  getData() {
    let vm = this;
    const url = `https://course-ec-api.hexschool.io/api/${vm.data.uuid}/ec/products`;

    fetch(url)
    .then(function(response){
      return response.json();  // 把 ReadableStream 的物件用 JSON 格式返回給下一個 .then()
    })
    .then(function(result){
      // vm.data.products = result.data;  // 把整包資料丟給自己的陣列

      // 方法二：可以限制只存取自己想要的資料
      result.data.forEach(item => {
        const product = {
          id: item.id,
          title: item.title,
          content: item.content
        };
        vm.data.products.push(product);
      });
    })
    .catch(function(err){
      console.log('錯誤', err);
    });
  }
};

product.getData();