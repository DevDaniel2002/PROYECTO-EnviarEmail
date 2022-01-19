// Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Variables para campos

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');



eventListener();
function eventListener(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reinicia el form
    btnReset.addEventListener('click', resetearForm);

    // Enviar Email
    formulario.addEventListener('submit', enviarEmail);
}



// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
    if(e.target.value.length > 0) {
        // Elimina los errores...
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }
    else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }
        else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(msj) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = msj;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 
    'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0 ) {
        formulario.appendChild(mensajeError);
    }
}


// Envia el email
function enviarEmail(e){
    e.preventDefault();

    // MOSTRAR EL SPINNER
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

        // mensaje de exito al enviar
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se agrego correctamente';
        parrafo.classList.add('rext-center','my-10', 'p-2', 'bg-green-500','text-white', 'fond-bold','uppercase' );

        // inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(()=>{
            parrafo.remove(); // Eliminar el mensaje de exito.
            resetearForm();
        }, 5000 );
    }, 3000 );
}

// Funncion que resetea el formulario  
function resetearForm(){
    formulario.reset();
    iniciarApp();
}