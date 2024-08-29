function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");
    
            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);
    
            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };
    
            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);
    
            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
    
            toast.innerHTML = `
                          <div class="toast__icon">
                              <i class="${icon}"></i>
                          </div>
                          <div class="toast__body">
                              <h3 class="toast__title">${title}</h3>
                              <p class="toast__msg">${message}</p>
                          </div>
                          <div class="toast__close">
                              <i class="fas fa-times"></i>
                          </div>
                      `;
            main.appendChild(toast);
        }
    }

    // open dialog
function openDialog() {
    document.getElementById("dialogOverlay").style.display = "flex";
}
// close dialog
function closeDialog() {
    document.getElementById("dialogOverlay").style.display = "none";
}
// validate
function validateInput(inputElement, validationMessageElement) {
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
}

// mở dialog
const dat_hang = document.getElementById('dat_hang');
if (dat_hang) {
    dat_hang.addEventListener('click', function () {
        openDialog()
    })
}
// đóng dialog
const close_dialog = document.getElementById('close--dialog');
if (close_dialog) {
    close_dialog.addEventListener('click', function () {
        closeDialog();
    })
}
const conscious = document.getElementById("show_tinh");
const districts = document.getElementById("show_huyen");
const ward = document.getElementById("show_xa");


const consciousAPI = "https://provinces.open-api.vn/api/";// api tỉnh
const districtsAPI = "https://provinces.open-api.vn/api/d/"; // api huyện
const wardsAPI = "https://provinces.open-api.vn/api/w/";// api xã
function fetchData(url, successCallback, errorCallback) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            successCallback(data);
        })
        .catch(error => {
            errorCallback(error);
        });
}
fetchData(consciousAPI, function (data) {
    var htmls = data.map(function (data) {
        return `<option value="${data.code}">${data.name}</option> `
    })
    var html = htmls.join("");
    var defaultOption = '<option value="" selected>Chọn một tỉnh</option>';
    html = html + defaultOption;
    conscious.innerHTML = html;
}, function (error) {
    console.log("không có dữ liệu", error);
})
// kiểm tra nếu chọn tỉnh nào thì show option ra huyện  đấy 
if (conscious) {
    conscious.addEventListener("change", function (event) {
        if (event.target.value) {
            let codeID = event.target.value;
            fetchData(districtsAPI, function (data) {
                var htmls = data.map(function (data) {
                    if (data.province_code == codeID) {
                        return `<option value="${data.code}">${data.name} </option>`
                    }
                })
                var html = htmls.join("");
                var defaultOption = '<option value="" selected>Chọn một huyện</option>';
                html = html + defaultOption;
                districts.innerHTML = html;
            })
        }
    })
}
if (districts) {
    districts.addEventListener("change", function (event) {
        if (event.target.value) {
            let codeID = event.target.value;
            fetchData(wardsAPI, function (data) {
                var htmls = data.map(function (data) {
                    if (data.district_code == codeID) {
                        return `<option value="${data.code}">${data.name} </option>`
                    }
                })
                var html = htmls.join("");
                var defaultOption = '<option value="" selected>Chọn một xã</option>';
                html = html + defaultOption;
                ward.innerHTML = html;
            })
        }
    })

}
