document.addEventListener('DOMContentLoaded', function () {
    const ramos = document.querySelectorAll('.ramo');
    const estado = {};

    // Inicializa el estado y bloquea los ramos con requisitos
    ramos.forEach(ramo => {
        const reqs = ramo.dataset.requisitos;
        if (reqs) {
            ramo.classList.add('bloqueado');
        }
        estado[ramo.id] = false;
    });

    // Al hacer clic en un ramo
    ramos.forEach(ramo => {
        ramo.addEventListener('click', function () {
            if (ramo.classList.contains('bloqueado') || ramo.classList.contains('aprobado')) return;

            ramo.classList.add('aprobado');
            estado[ramo.id] = true;

            // Desbloquea los ramos que dependan de este
            ramos.forEach(otro => {
                const requisitos = otro.dataset.requisitos ? otro.dataset.requisitos.split(',') : [];
                if (
                    requisitos.length > 0 &&
                    requisitos.every(req => estado[req.trim()])
                ) {
                    otro.classList.remove('bloqueado');
                }
            });
        });
    });
});
