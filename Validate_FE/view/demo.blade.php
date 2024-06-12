<form action="" method="post" class="changePasswordFields" id="changePasswordFields" style="display: none;">
    <div>
        {{$admin->id}}
        <div class="form-group row mt-2">

            <label for="newPassword" class="col-sm-2 col-form-label">Mật khẩu hiện tại</label>
            <div class="col-sm-10">
                <input type="password" class="form-control  is-invalid " id="password" name="password" placeholder="Mật khẩu hiện tại">
            </div>
            <span class="invalid-feedback d-block" style="font-weight: 500" id="password_error"></span>
        </div>
    </div>
    <button type="button" class="btn btn-outline-primary btn-sm" onclick="submitForm(event)">Lưu</button>
</form>



<script>
    var formEconomyEdit = {
        'password': {  // passwword thì nên đặt là name trong input đó 
            'element': document.getElementById('password'), // id trong input đó 
            'error': document.getElementById('password_error'), // thẻ hiển thị lỗi 
            'validations': [
                {
                    'func': function(value) {
                        return checkRequired(value);
                    },
                    'message': generateErrorMessage('E001')
                }, // viết tiếp điều kiện validate vào đây (validations)
            ]
        },
    }

    function submitForm(event) { // hàm này đặt trong  nút submit  của form
        event.preventDefault();
        if (validateAllFields(formEconomyEdit)) {
            document.getElementById('changePasswordFields').submit(); // là id trong form
        }
    }
</script>