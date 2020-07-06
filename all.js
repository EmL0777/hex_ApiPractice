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
          content: item.content,
          imgUrl: item.imageUrl[0],
          price: item.price
        };
        vm.data.products.push(product);
      });

      vm.render();
    })
    .catch(function(err){
      console.log('錯誤', err);
    });
  },

  render() {
    const app = document.querySelector('#app');
    const products = this.data.products;
    let str = '';

    products.forEach((product) => {
      str += `<div class="card" id="${product.id}">
      <img src="${product.imgUrl}" class="card-img-top" alt="img title">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.content}</p>
      </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">原價：${product.price} 美元</li>
          <li class="list-group-item">特價：${product.price} 美元</li>
        </ul>
      </div>`
    });

    app.innerHTML = str;
  }
};

product.getData();