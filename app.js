/* ==========================================================================
   SERTIC - Dynamic Calculator & Web Mobile Responsive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initContactForm();
  initMobileMenu();
});

// Mobile Navbar Menu Toggle
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (icon) {
      if (menu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    }
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

// Dynamic Data per Device Type
const servicesData = {
  camaras: {
    label: 'Cámaras de Seguridad',
    issues: [
      { id: 'mobile_cam', name: 'Configuración Monitoreo en Celular', icon: 'fa-mobile', cost: 50 },
      { id: 'punto_cam', name: 'Instalación de Punto Nuevo de Cámara', icon: 'fa-screwdriver-wrench', cost: 100 },
      { id: 'mant_cam', name: 'Mantenimiento de Sistema CCTV / Fuentes', icon: 'fa-video', cost: 60 },
      { id: 'dvr_cam', name: 'Instalación / Cambio Disco Duro DVR', icon: 'fa-hard-drive', cost: 40 },
      { id: 'reset_cam', name: 'Reset Clave DVR / Recuperar Grabaciones', icon: 'fa-key', cost: 80 }
    ]
  },
  laptop: {
    label: 'Laptop / Notebook',
    issues: [
      { id: 'mant_laptop', name: 'Mantenimiento + Pasta Térmica', icon: 'fa-broom', cost: 60 },
      { id: 'pant_laptop', name: 'Pantalla Rota / Teclado / Bisagras', icon: 'fa-mobile-screen', cost: 120 },
      { id: 'ssd_laptop', name: 'Optimización + Disco SSD NVMe', icon: 'fa-bolt', cost: 40 },
      { id: 'power_laptop', name: 'No Enciende / Reparación Placa Madre', icon: 'fa-power-off', cost: 80 },
      { id: 'format_laptop', name: 'Formateo + Backup + Antivirus Pro', icon: 'fa-bug-slash', cost: 30 }
    ]
  },
  impresora: {
    label: 'Impresora (Tinta, Láser, Térmica)',
    issues: [
      { id: 'head_print', name: 'Limpieza de Cabezales e Inyectores', icon: 'fa-broom', cost: 50 },
      { id: 'pads_print', name: 'Cambio Almohadillas / Reset Contador', icon: 'fa-rotate', cost: 40 },
      { id: 'paper_print', name: 'Reparación de Atascos / Fusor / Rodillos', icon: 'fa-print', cost: 70 },
      { id: 'power_print', name: 'No Enciende / Fuente de Poder', icon: 'fa-power-off', cost: 80 },
      { id: 'wifi_print', name: 'Configuración Impresión Wi-Fi / Red', icon: 'fa-wifi', cost: 30 }
    ]
  },
  pc: {
    label: 'PC de Escritorio',
    issues: [
      { id: 'mant_pc', name: 'Mantenimiento Limpieza + Pasta Térmica', icon: 'fa-broom', cost: 50 },
      { id: 'gamer_pc', name: 'Ensamble PC Gamer / Edición', icon: 'fa-gamepad', cost: 90 },
      { id: 'ssd_pc', name: 'Optimización + Disco SSD / Memoria RAM', icon: 'fa-bolt', cost: 40 },
      { id: 'power_pc', name: 'No Enciende / Cambio Fuente de Poder', icon: 'fa-power-off', cost: 70 },
      { id: 'format_pc', name: 'Formateo + Antivirus Pro', icon: 'fa-bug-slash', cost: 30 }
    ]
  },
  servidor: {
    label: 'Servidor / Mac',
    issues: [
      { id: 'mant_server', name: 'Mantenimiento Servidor / Mac', icon: 'fa-server', cost: 120 },
      { id: 'net_server', name: 'Configuración Red & Backup Corporativo', icon: 'fa-network-wired', cost: 150 },
      { id: 'raid_server', name: 'Reparación Hardware / Arreglo RAID', icon: 'fa-database', cost: 200 },
      { id: 'mac_format', name: 'Optimización / Formateo macOS & Windows', icon: 'fa-apple-whole', cost: 100 },
      { id: 'mac_ssd', name: 'Ampliación SSD NVMe / Memoria RAM', icon: 'fa-bolt', cost: 90 }
    ]
  }
};

let selectedDeviceKey = 'camaras';
let selectedIssueObj = servicesData.camaras.issues[0];

function initCalculator() {
  const deviceOptions = document.querySelectorAll('#device-options .option-card');

  deviceOptions.forEach(card => {
    card.addEventListener('click', () => {
      deviceOptions.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedDeviceKey = card.dataset.value;
      renderIssuesForDevice(selectedDeviceKey);
    });
  });

  renderIssuesForDevice(selectedDeviceKey);
}

function renderIssuesForDevice(deviceKey) {
  const devData = servicesData[deviceKey] || servicesData.camaras;
  const container = document.getElementById('issue-options');
  if (!container) return;

  container.innerHTML = '';

  devData.issues.forEach((issue, index) => {
    const card = document.createElement('div');
    card.className = `option-card ${index === 0 ? 'active' : ''}`;
    card.innerHTML = `
      <div class="option-icon"><i class="fa-solid ${issue.icon}"></i></div>
      <div class="option-name">${issue.name}</div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('#issue-options .option-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedIssueObj = issue;
      updateCalculatorSummary(devData.label, issue);
    });

    container.appendChild(card);
  });

  selectedIssueObj = devData.issues[0];
  updateCalculatorSummary(devData.label, selectedIssueObj);
}

function updateCalculatorSummary(deviceLabel, issueObj) {
  const priceDisplay = document.getElementById('calc-total-price');
  const summaryText = document.getElementById('calc-summary-text');
  const wsBtn = document.getElementById('calc-ws-btn');

  if (priceDisplay) priceDisplay.textContent = `S/ ${issueObj.cost}.00`;
  if (summaryText) summaryText.textContent = `${deviceLabel} - ${issueObj.name}`;

  if (wsBtn) {
    const text = encodeURIComponent(
      `¡Hola SERTIC! Solicito cotización para el servicio:\n` +
      `📌 Equipo/Requerimiento: ${deviceLabel}\n` +
      `🔧 Trabajo: ${issueObj.name}\n` +
      `💰 Est. preliminar: S/ ${issueObj.cost}.00\n` +
      `¿Tienen disponibilidad de atención hoy?`
    );
    wsBtn.href = `https://wa.me/51905937509?text=${text}`;
  }
}

// Contact Form Handler -> Envío de Formulario a Correo Electrónico
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando a tu Correo...';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('¡Gracias! Tu mensaje ha sido enviado exitosamente a nuestro correo personal. Te responderemos a la brevedad.');
        form.reset();
      } else {
        alert('Mensaje recibido. Si deseas respuesta rápida, también puedes escribirnos directamente al WhatsApp +51 905 937 509.');
        form.reset();
      }
    } catch (err) {
      alert('Hubo un detalle de red. Puedes escribirnos directamente por WhatsApp al +51 905 937 509.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
}
