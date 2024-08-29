
const check = document.getElementById('check');
const body = document.body;
check.addEventListener('click', function () {
    if (check.checked) {

        body.classList.add('overflow')
    } else {

        body.classList.remove('overflow')
    }
})
