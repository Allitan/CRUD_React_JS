import Swall from 'sweetalert2';

const alertaSuccess = (mensaje) => {
    Swall.fire({
        title: mensaje,
        icon: 'success',
    });
}

const alertaError = (mensaje) => {
    Swall.fire({
        title: mensaje,
        icon: 'error',
    });
}

const alertaWarning = (mensaje, id='') => {
    onFocus(id);
    Swall.fire({
        title: mensaje,
        icon: 'warning',
    });
}

const onFocus = (id) => {
    if(id !== ''){
        document.getElementById(id).focus();
    }
}

export{
    alertaSuccess,
    alertaError,
    alertaWarning,
}