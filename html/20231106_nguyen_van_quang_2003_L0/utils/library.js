let keyLocalStorageListSP = "DANHSACHSP";
let keyLocalStorageItemCart = "DANHSACHITEMCART";
const LocalStorageManager = (function () {
    let shoppingCart = [];
    let listData = [];
    return {

        setData(db) {
            listData = db;
        },
        saveLocalStorage(key) {
            if (!Array.isArray(listData)) {
                console.error('Dữ liệu không phải là một danh sách.');
                return null;
            }
            localStorage.setItem(key, JSON.stringify(listData));
        },
        getLocalStorage(key) {
            // Kiểm tra xem dữ liệu có tồn tại trong LocalStorage không
            if (localStorage.getItem(key)) {
                // Lấy chuỗi JSON từ LocalStorage
                const jsonData = localStorage.getItem(key);
                // Chuyển đổi chuỗi JSON thành mảng
                const listdata = JSON.parse(jsonData);
                return listdata;
            } else {
                return null;
            }
        },
        renderProductUI(listdata) {
            let html = '';
            listdata.forEach(item => {
                html += `
                    <div class="product_con ${item.category} product_sort_con_show">
                        <div class="product_img">
                            <img src="../images/background-remover/${item.img}" alt="">
                                <div class="product_sale">
                                    SALE!
                                </div>
                                <div class="overlay">
                                    <div class="text">
                                        <a href=""><i class="fa fa-heart"></i></a>
                                       <i class="fas fa-shopping-cart" data-id="${item.id}"></i>
                                        <a href=""> <i class="fa fa-eye"></i></a>
                                    </div>
                                </div>
                                <div class="product_info">
                                    <p class="product_name">${item.name_product}</p>
                                    <p class="product_price"><span style="text-decoration: line-through;opacity: 0.5;">$19</span>
                                        $${item.price}</p>
                                </div>
                        </div>
                                <input type="hidden" value="${item.id}">
                    </div>`;

            });
            const productDiv = document.querySelector('.product_sort_con');
            if (productDiv) {
                productDiv.innerHTML = html;
            }

        },
        // thêm  sản phẩm vào giỏ hàng 
        getCartLocalStorage() {
            const cartdata = LocalStorageManager.getLocalStorage(keyLocalStorageItemCart);
            shoppingCart = cartdata;
            return shoppingCart;
        },
        setCartLocalStorage() {
            localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(shoppingCart));
        },
        addSP(productId) {
            LocalStorageManager.getCartLocalStorage();
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const dataProduct = LocalStorageManager.getLocalStorage("DANHSACHSP");
            let fl = false;

            const existingProduct = shoppingCart.find((item) => item.productId === productId);
            dataProduct.forEach(function (itemproduct) {
                if (itemproduct.id == productId && itemproduct.count >= 1) {
                    if (existingProduct) {
                        // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
                        existingProduct.soLuong++;
                    } else {
                        // Nếu sản phẩm chưa tồn tại tạo đối tượng giỏ hàng mới và thêm vào danh sách
                        var newProduct = {
                            productId: productId,
                            soLuong: 1
                        };
                        shoppingCart.push(newProduct);
                    }
                    fl = true;
                }

            });
            if (fl) {
                toast({
                    title: "Thành công!",
                    message: "Sản Phẩm đã được thêm vào giỏ hàng.",
                    type: "success",
                    duration: 1000,
                });

            } else {
                toast({
                    title: "Không Thành công!",
                    message: "Hết Hàng.",
                    type: "error",
                    duration: 1000,
                });
            }

            LocalStorageManager.setCartLocalStorage();

            localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(shoppingCart));
        },
        // tính tổng sản phẩm
        totalProduct() {
            const dataCartItem = LocalStorageManager.getLocalStorage(keyLocalStorageItemCart);
            if (dataCartItem) {
                const total = dataCartItem.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.soLuong;
                }, 0);
                return total;
            }
        },
        // tính tổng tiền của sản phẩm
        totalPriceProduct() {
            const dataCartItem = LocalStorageManager.getLocalStorage(keyLocalStorageItemCart); // lấy dữ liệu của giỏ hàng
            const dataProducts = LocalStorageManager.getLocalStorage(keyLocalStorageListSP); // lấy dữ liệu của sản phẩm
            // nếu tồn tại dữ liệu
            if (dataCartItem && dataProducts) {
                const totalPrice = dataCartItem.reduce((accumulator, item) => {
                    const total = dataProducts.find(p => p.id == item.productId)
                    if (total) {

                        return accumulator + item.soLuong * total.price;
                    }
                }, 0);
                return totalPrice;
            }

        },
        // show cart ra màn hình
        showCartProduct(sanpham, giohang) {
            let html = "";
            const numberCart = 0;
            if (giohang.length == numberCart) {
                document.getElementById("show--tablecart").style.display = "none";
                document.getElementById("show--totalcart").style.display = "none";
                document.getElementById("gioHangRong").style.display = "flex";
            } else {
                for (let i = 0; i < sanpham.length; i++) {
                    for (let j = 0; j < giohang.length; j++) {
                        if (sanpham[i].id === Number(giohang[j].productId)) {
                            html += `
                            <tr>
                            <td> <img src="../images/background-remover/${sanpham[i].img}" alt="" width="48px"></td>
                            <td>${sanpham[i].name_product}</td>
                            <td>${sanpham[i].price}</td>
                            <td><input id="count" data-id="${giohang[j].productId}" min="1" type="number"  value="${giohang[j].soLuong}"/></td>
                            <td> ${giohang[j].soLuong * sanpham[i].price}</td>
                           <td>
                           <button class="btn btn-danger btncart"   
                            data-id="${giohang[j].productId}"> Xóa </button></td>
                          </tr>
                            `
                        }

                    }

                };

            }
            // tại sao lại phải cho vào setTimeOut 
            //vì Các phần tử input có thuộc tính data-id
            // không tồn tại trước khi hàm showCartProduct được gọi. 
            setTimeout(() => {
                const countInput = document.querySelectorAll('input[data-id]');
                LocalStorageManager.updateCountProducts(countInput)
            }, 2000);
            const tbody = document.querySelector('.tbody__table');
            if (tbody) {
                tbody.innerHTML = html;
            }
        },
        // cập nhật số lượng trong giỏ hàng
        updateCountProducts(countInput) {
            countInput.forEach(function (count) {
                count.addEventListener('change', function (event) {
                    let newValue = event.target.value;
                    const dataProduct = LocalStorageManager.getLocalStorage(keyLocalStorageListSP);
                    const dataCartitem = LocalStorageManager.getLocalStorage(keyLocalStorageItemCart);
                    if (newValue > 0) {
                        dataProduct.forEach((product) => {
                            if (product.id == count.dataset.id && newValue <= product.count) {
                                dataCartitem.forEach((item) => {
                                    if (item.productId === count.dataset.id) {
                                        item.soLuong = parseInt(newValue);
                                    }
                                });
                            }
                        });
                    }
                    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCartitem));
                    window.location.reload()
                })
            })
        },
        // xóa sản phẩm trong giỏ hàng 
        delCart(productId) {
            const showCart = LocalStorageManager.getLocalStorage(keyLocalStorageItemCart);
            for (let i = 0; i < showCart.length; i++) {
                if (showCart[i].productId == productId) {
                    const index = showCart.findIndex(obj => obj.productId === productId);
                    showCart.splice(index, 1);
                }
            }
            localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(showCart));
            const alertElement = document.getElementById('myAlert');
            alertElement.style.display = 'block';
            // Tự động mất đi thông báo sau khoảng thời gian
            setTimeout(function () {
                // Ẩn thông báo
                alertElement.style.display = 'none';
                window.location.reload();
            }, 2000);

        },
        // tạo id hóa đơn
        generateOrderId() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const length = 8;
            let orderId = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                orderId += characters.charAt(randomIndex);
            }

            return orderId;
        },
        // lấy ngày giờ hiện tại
        getCurrentDateTime() {
            let today = new Date();
            let date =
                today.getDate() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getFullYear();
            let time =
                today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + " " + time;

            return dateTime;
        },
        // validate
        validateInput(inputElement, validationMessageElement) {
            var inputValue = inputElement.value.trim();
            if (inputValue === "") {
                // Thay đổi class
                inputElement.classList.remove('is-valid');
                inputElement.classList.add('is-invalid');
                // Hiển thị thông báo lỗi
                validationMessageElement.style.display = "block";
                return false;
            } else {
                // Thay đổi class
                inputElement.classList.remove('is-invalid');
                inputElement.classList.add('is-valid');
                // Ẩn thông báo lỗi
                validationMessageElement.style.display = "none";
                return true;
            }
        },
        // lưu danh sách đơn hàng api
        saveObjectAPI(apiUrl, data) {
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Data added successfully:", data);
                })
                .catch(error => {
                    console.error("Error adding data:", error);
                });
        },
        // xử lý khi người dùng bấm nút đặt hàng 
        btnDatHang() {
            const lastnameInput = document.getElementById("lastname");
            const lastnameValidationMessage = document.getElementById("validatelastname");
            const firstnameInput = document.getElementById("firstname");
            const firstnameValidationMessage = document.getElementById("validatefirstname");
            const sdtInput = document.getElementById("sdt");
            const sdtValidationMessage = document.getElementById("validatesdt");
            const emailInput = document.getElementById("email");
            const emailValidationMessage = document.getElementById("validateemail");
            const diachiInput = document.getElementById("diachi");
            const diachiValidationMessage = document.getElementById("validatediachi");
            const tinhInput = document.getElementById("show_tinh");
            const tinhValidationMessage = document.getElementById("validatetinh");
            const huyenInput = document.getElementById("show_huyen");
            const huyenValidationMessage = document.getElementById("validatehuyen");
            const xaInput = document.getElementById("show_xa");
            const xaValidationMessage = document.getElementById("validatexa");
            let isValid = true;
            const datetime = LocalStorageManager.getCurrentDateTime();
            const order_id = LocalStorageManager.generateOrderId();
            const productsItemCart = LocalStorageManager.getLocalStorage(keyLocalStorageItemCart);
            //danh sách sản phẩm 
            const dataProducts = LocalStorageManager.getLocalStorage(keyLocalStorageListSP);
            const shipAddress = diachiInput.value + " ," + tinhInput.options[tinhInput.selectedIndex].innerHTML
                + ", " + huyenInput.options[huyenInput.selectedIndex].innerHTML +
                ", " + xaInput.options[xaInput.selectedIndex].innerHTML;
            const fullname = lastnameInput.value + "" + firstnameInput.value;
            const sdt = sdtInput.value;
            const emailInputa = emailInput.value;
            const apiUrl = "https://64fd3bfc596493f7af7e2166.mockapi.io/order/orders"; // api order
            // validate
            isValid = LocalStorageManager.validateInput(lastnameInput, lastnameValidationMessage) && isValid;
            isValid = LocalStorageManager.validateInput(firstnameInput, firstnameValidationMessage) && isValid;
            isValid = LocalStorageManager.validateInput(sdtInput, sdtValidationMessage) && isValid;
            isValid = LocalStorageManager.validateInput(emailInput, emailValidationMessage) && isValid;
            isValid = LocalStorageManager.validateInput(diachiInput, diachiValidationMessage) && isValid;
            isValid = LocalStorageManager.validateInput(tinhInput, tinhValidationMessage) && isValid;
            isValid = LocalStorageManager.validateInput(huyenInput, huyenValidationMessage) && isValid;
            isValid = LocalStorageManager.validateInput(xaInput, xaValidationMessage) && isValid;
            // Đóng dialog khi hoàn thành xử lý
            if (isValid) {
                // cập nhật lại số lượng từng sản phẩm 
                dataProducts.map((item) => {
                    productsItemCart.map((data) => {
                        if (item.id == data.productId) {
                            let newquantity = item.count - data.soLuong;
                            item.count = newquantity;
                        }
                    })
                })
                localStorage.setItem(keyLocalStorageListSP, JSON.stringify(dataProducts));
                const objectNew = {
                    datetime: datetime,
                    order_id: order_id,
                    fullname: fullname,
                    sdt: sdt,
                    email: emailInputa,
                    products: productsItemCart,
                    shipAddress: shipAddress,
                }
                // sau khi đặt thành công thì xóa giỏ hàng 
                localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
                LocalStorageManager.saveObjectAPI(apiUrl, objectNew);
                // closeDialog();
                document.getElementById("dialogOverlay").style.display = "none";
                setTimeout(() => {
                    window.location.href = 'order.html';

                }, 1000);
            }
        }

    }
})();

const APIManager = (function () {
    return {
        // lấy ra api
        fetchData(url, successCallback, errorCallback) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    successCallback(data);
                })
                .catch(error => {
                    errorCallback(error);
                });
        },
        // show order
        renderOrder(apiUrl) {
            this.fetchData(apiUrl, (data) => {
                let i = 1;
                let htmls = data.map((item) => {
                    return `
                    <tr>
                        <th scope="row">${i++}</th>
                        <td>${item.order_id}</td>
                        <td>${item.datetime}</td>
                        <td>
                        <button class="btn btn-primary"  data-id="${item.id}">Detail</button>
                        </td>
                    </tr>
                     `
                })
                const tb_order = document.querySelector('.tb_order');
                let html = htmls.join("");
                tb_order.innerHTML = html;

                // lấy giá trị data-id
                APIManager.getDataIds(apiUrl);
            }, function (error) {
                console.log("không có dữ liệu", error);
            })
        },
        getDataIds(apiUrl) {
            // Lấy tất cả các phần tử thẻ <button> có thuộc tính data-id
            let orderButtons = document.querySelectorAll('button[data-id]');
            // Lặp qua từng phần tử thẻ <button> để lấy giá trị data-id
            orderButtons.forEach(function (orderButton) {
                let dataId = orderButton.getAttribute("data-id");
                orderButton.addEventListener('click', function () {
                    APIManager.fetchData(apiUrl, (data) => {
                        data.map((item) => {
                            if (item.id === dataId) {
                                document.getElementById('table_block').style.display = 'none';
                                document.getElementById('table_info').style.display = 'block';
                                // callback
                                APIManager.renderOrderInfo(apiUrl, dataId);
                                APIManager.renderOrderProducts(apiUrl, dataId);
                                APIManager.renderOrderDetail(apiUrl, dataId);
                            }
                        })
                    })
                })
            });
        },
        // hiển thị thông tin người dùng
        renderOrderInfo(apiUrl, dataId) {
            APIManager.fetchData(apiUrl, (data) => {
                let htmls = data.map((item) => {
                    if (item.id === dataId) {
                        return `
                                <p>Cảm ơn bản đã đặt hàng </p>
                                <p>Một email xác nhận đã được gửi tới ${item.email}.
                                    Xin vui lòng kiểm tra email của bạn</p>
                                <div class="cart__info_detail">
                                    <div class="info_client">
                                        <p>Thông tin mua hàng</p>
                                        <p>FullName:    <span> ${item.fullname}</span></p>
                                        <p>Phone:       <span> ${item.sdt}</span> </p>
                                        <p>Email:       <span> ${item.email}</span></p>
                                        <p>DateTime:    <span> ${item.datetime}</span></p>
                                    </div>
                                    <div class="address_info">
                                        <p>Địa chỉ nhận hàng </p>
                                        <p>FullName:    <span> ${item.fullname}</span></p>
                                        <p>Address:    <span> ${item.shipAddress}</span></p>
                                        <p>Phone:        <span> ${item.sdt}</span></p>
                                        <p>Hoàn trả hàng <a href="" data-id="${item.id}">tại đây!!!</a></p>
                                    </div>
                                </div>
                                `
                    }
                })

                const cart__info_client = document.querySelector('.cart__info_client');
                let html = htmls.join("");
                cart__info_client.innerHTML = html;
                // bắt giá trị data-id
                APIManager.returnsOrder();
            })
        },
        // mở dialog nhập lý do muốn hòa hàng 
        returnsOrder() {
            const returnsOrder = document.querySelector('a[data-id]');
            if (returnsOrder) {
                returnsOrder.addEventListener('click', function (event) {
                    event.preventDefault();
                    document.getElementById("dialogOverlay").style.display = "flex";
                })
            }

        },
        // xóa đơn hàng api
        deleteOrder(apiUrl, dataId) {
            fetch(`${apiUrl}/${dataId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then((data) => {
                    // sau khi hoàn trả hàng thì cập nhật lại số lượng của kho
                    const dataProducts = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
                    const productsOder = data.products;
                    console.log(productsOder);
                    dataProducts.map((item) => {
                        productsOder.map((productsOder) => {
                            if (item.id == productsOder.productId) {
                                var newquantity = item.count + productsOder.soLuong;
                                item.count = newquantity;
                            }
                        })
                    })
                    const updatedDataProducts = JSON.stringify(dataProducts);
                    localStorage.setItem(keyLocalStorageListSP, updatedDataProducts);
                    // toast({
                    //     title: "Không Thành công!",
                    //     message: "Hết Hàng.",
                    //     type: "error",
                    //     duration: 1000,
                    // });
                })
                .catch(error => {

                    console.error('Lỗi xảy ra khi xóa đối tượng:', error);
                });
        },
        btnReturnOrder() {
            let inputOrder = document.getElementById("inputoder");
            let validateorderMessage = document.getElementById("validateorder");
            let dataIdOrder = document.querySelector('a[data-id]');
            let isValid = true;
            const apiUrl = "https://64fd3bfc596493f7af7e2166.mockapi.io/order/orders";
            isValid = LocalStorageManager.validateInput(inputOrder, validateorderMessage) && isValid;
            if (isValid) {
                var dataId = dataIdOrder.dataset.id;
                APIManager.deleteOrder(apiUrl, dataId);
                document.getElementById("dialogOverlay").style.display = "none";
                setTimeout(() => {
                    window.location.href = 'order.html';
                }, 1000);
            }
        },
        // hiển thị mã đơn hang đã mua 
        renderOrderProducts(apiUrl, dataId) {
            APIManager.fetchData(apiUrl, (data) => {
                let htmls = data.map((item) => {
                    if (item.id === dataId) {
                        return `
                        <p style="margin-left: 20px;">Đơn Hàng:${item.order_id}</p>
                        `
                    }
                })
                const order_id = document.getElementById('order_id');
                let html = htmls.join('');
                order_id.innerHTML = html;
            })
        },
        renderOrderDetail(apiUrl, dataId) {
            APIManager.fetchData(apiUrl, (data) => {
                data.map((item) => {
                    if (item.id == dataId) {
                        APIManager.renderListProduct(item.products);
                        APIManager.SumPriceOrder(item.products);
                    }
                })
            })
        },
        // hiển thị ra danh sách sản phẩm trong oder
        renderListProduct(listproductoder) {
            const dataProducts = localStorage.getItem(keyLocalStorageListSP); // danh sách sản phẩm 
            const listdata = JSON.parse(dataProducts);
            const oderProducts = listproductoder; // các sản phẩm trong order
            let tong = 0;
            let htmls = '';
            for (let i = 0; i < oderProducts.length; i++) {
                for (let j = 0; j < listdata.length; j++) {
                    if (oderProducts[i].productId == listdata[j].id) {
                        tong = oderProducts[i].soLuong * listdata[j].price;
                        htmls += `
                            <div class="productdetail">
                                <div class="productdetail__order">
                                    <img src="../images/background-remover/${listdata[j].img}" alt="" width="60px">
                                </div>
                                <div class="productdetail__order">
                                    <p>${listdata[j].name_product}</p>
                                    <p>Price: ${listdata[j].price}</p>
                                    <p>Quantity: ${oderProducts[i].soLuong}</p>
                                </div>
                                 <p style="float:right;margin-left:120px">Tổng: $${tong}</p>
                            </div>
                         `
                    }
                }
            }
            const product_order = document.querySelector('.product_order');
            product_order.innerHTML = htmls;
        },
        // hiển thị tông tiển oder
        SumPriceOrder(listproductoder) {
            const dataProducts = localStorage.getItem(keyLocalStorageListSP); // danh sách sản phẩm 
            const listdata = JSON.parse(dataProducts);
            const oderProducts = listproductoder; // các sản phẩm trong order
            let tong = 0;

            for (let i = 0; i < oderProducts.length; i++) {
                for (let j = 0; j < listdata.length; j++) {
                    if (oderProducts[i].productId == listdata[j].id) {
                        let htmls = '';
                        tong = tong + oderProducts[i].soLuong * listdata[j].price;
                        htmls += `
                                <p style="margin-left: 20px;">Tổng Cộng :<span style="float: right;">$${tong}</span></p>   
                         `
                        const price__oder = document.querySelector('.price__oder');
                        price__oder.innerHTML = htmls;
                    }

                }
            }

        }

    }
})();
// LocalStorageManager.setData(db)
// LocalStorageManager.saveLocalStorage(keyLocalStorageListSP);



