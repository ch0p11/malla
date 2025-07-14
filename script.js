document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Inicialización: bloquea los ramos que tienen prerrequisitos
  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs?.split(',').filter(Boolean);
    if (prereqs.length > 0) {
      ramo.classList.add("bloqueado");
    }
  });

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      // Alternar estado de aprobación
      const aprobado = ramo.classList.toggle("aprobado");

      // Revisar si se puede desbloquear otros ramos
      document.querySelectorAll(".ramo").forEach(destino => {
        const prereqs = destino.dataset.prereqs?.split(',').filter(Boolean);
        if (prereqs.length === 0) return;

        const allApproved = prereqs.every(id => {
          const reqRamo = document.getElementById(id);
          return reqRamo?.classList.contains("aprobado");
        });

        if (allApproved) {
          destino.classList.remove("bloqueado");
        } else {
          destino.classList.add("bloqueado");
          destino.classList.remove("aprobado");
        }
      });
    });
  });
});
