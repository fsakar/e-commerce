var Filter = {
    Apis: {
        products: "https://dummyjson.com/products/",
    },
    Elements: {
        productTitle: document.getElementById("product-title")

    },

    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            Filter.Actions.getProductDetails(); //  get all products
        },

        //ürün detaylarını getiren endpoint çalışacak
        getProductDetails: () => {

            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            if (id) {
                fetch(Filter.Apis.products + id)
                    .then(res => res.json())
                    .then(res => {
                        Filter.Elements.productTitle.innerText = res.title;
                        Filter.Elements.desc.innerText = res.description;
                        Filter.Elements.price.innerText = res.price;
                        Filter.Elements.rating.innerText = res.rating;
                        Filter.Elements.bigImage.setAttribute("src", res.images[0]);

                        for (let i = 0; i < res.images.length; i++) {
                            const imgSrc = res.images[i];
                            const imgEl = document.createElement("img");
                            imgEl.setAttribute("src", imgSrc);
                            imgEl.setAttribute("onclick", "Filter.Actions.changeImage");

                            if (i === 0) {
                                imgEl.classList.add("active");

                            }
                            Filter.Elements.smallImagesContainer.appendChild(imgEl);

                            if (i === 2) {
                                break;
                                
                            }
                        }

                    });
            }
            else {
                alert("hatalı url")
            }


        }

    },
};

Filter.Actions.init();