import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "4000",
    "extendedTimeOut": "800",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function showMessage(title, message, type) {
    toastr[type](message, title);
}

export function errorMessage(message) {
    showMessage("Error", message, "error");
}

export function successMessage(message) {
    showMessage("Success", message, "success");
}

export function alertMessage(message) {
    showMessage("Warning", message, "warning");
}