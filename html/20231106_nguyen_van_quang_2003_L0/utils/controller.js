(function start() {
    // nếu localStorage keyLocalStorageListSP rỗng thì mới lưu dữ liệu ở db vào 
    if (localStorage.getItem(keyLocalStorageListSP) === null) {
        LocalStorageManager.setData(db)
        LocalStorageManager.saveLocalStorage(keyLocalStorageListSP);
    }
    console.log(keyLocalStorageListSP.length);
    // hiển thị order ra màn hình
    const apiUrl = "https://64fd3bfc596493f7af7e2166.mockapi.io/order/orders";
    APIManager.renderOrder(apiUrl);
    // xóa đơn hàng api 
    const btnoder = document.getElementById('btnoder');
    if (btnoder) {
        btnoder.addEventListener("click", function (event) {
            event.preventDefault();
            APIManager.btnReturnOrder();
        });
    }

    // end api

    // hiển thị sản phẩm ra  màn hình 
    const listdata = LocalStorageManager.getLocalStorage(keyLocalStorageListSP);

    LocalStorageManager.renderProductUI(listdata);

    // thêm sản phẩm vào giỏ hàng 
    let icons = document.querySelectorAll('i[data-id]');
    icons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            let id = icon.getAttribute('data-id'); //để lấy giá trị của thuộc tính data-id
            LocalStorageManager.addSP(id)
        });
    });

    // hiển thị cart ra màn hình 
    const showCart = LocalStorageManager.getLocalStorage(keyLocalStorageItemCart);
    const showProduct = LocalStorageManager.getLocalStorage(keyLocalStorageListSP);
    LocalStorageManager.showCartProduct(showProduct, showCart);

    // hiển thị số lượng sản phẩm 
    const iconCart = document.querySelectorAll('.item-count');
    if (iconCart.length > 0) {
        iconCart.forEach((item) => {
            item.innerHTML = LocalStorageManager.totalProduct();
        })

    }
    // hiển thị số lượng sản phẩm và tổng tiền các sản phẩm 
    const soLuongSanPham = document.querySelector('.totalproduct');
    if (soLuongSanPham) {
        soLuongSanPham.innerHTML = "Tổng Sản Phẩm:  " + LocalStorageManager.totalProduct();
    }
    const TongTienSanPham = document.querySelector('.totalproductprice');
    if (TongTienSanPham) {
        TongTienSanPham.innerHTML = "Tổng Tiền:  " + "$ " + LocalStorageManager.totalPriceProduct();
    }
    // xóa sản phẩm trong giỏ hàng
    const btncart = document.querySelectorAll('button[data-id]');
    btncart.forEach((btn) => {
        btn.addEventListener('click', function () {
            let id = btn.getAttribute('data-id');
            if (confirm('Bạn có chắc chắn muốn xoá?')) {
                LocalStorageManager.delCart(id);
            }
        })
    });
    // bấm đặt hàng
    const myform = document.getElementById("btnform");
    if (myform) {
        myform.addEventListener("click", function (event) {
            event.preventDefault();
            LocalStorageManager.btnDatHang();
        });
    }

})();
