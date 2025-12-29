// script.js - Invitación para 15 Años

document.addEventListener('DOMContentLoaded', function() {
    // ========== VARIABLES Y ELEMENTOS DEL DOM ==========
    const celebrantName = document.getElementById('celebrantName');
    const countdownDays = document.getElementById('countdownDays');
    const countdownHours = document.getElementById('countdownHours');
    const countdownMinutes = document.getElementById('countdownMinutes');
    const countdownSeconds = document.getElementById('countdownSeconds');
    const countdownMessage = document.getElementById('countdownMessage');
    const songRequestInput = document.getElementById('songRequest');
    const addSongBtn = document.getElementById('addSongBtn');
    const songList = document.getElementById('songList');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    const confirmMaybeBtn = document.getElementById('confirmMaybe');
    const decreaseGuestsBtn = document.getElementById('decreaseGuests');
    const increaseGuestsBtn = document.getElementById('increaseGuests');
    const guestCountElement = document.getElementById('guestCount');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const confirmationDetails = document.getElementById('confirmationDetails');
    const mapLink = document.getElementById('mapLink');
    
    // ========== VARIABLES DE ESTADO ==========
    let guestCount = 1;
    let confirmationStatus = '';
    let songs = [];
    let rsvpData = null;
    
    // Fecha del evento: 12 de Julio, 2026
    const eventDate = new Date('July 12, 2026 19:00:00').getTime();
        
    
    // ========== INICIALIZACIÓN ==========
    init();
    
    // ========== FUNCIONES PRINCIPALES ==========
    
    function init() {
        // Inicializar contador regresivo
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Inicializar animación del nombre
        startNameAnimation();
        
        // Cargar canciones desde localStorage si existen
        loadSongsFromStorage();
        
        // Cargar confirmación desde localStorage si existe
        loadRSVPFromStorage();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Configurar efectos visuales iniciales
        setupVisualEffects();
    }
    
    function setupEventListeners() {
        // Botones de confirmación de asistencia
        confirmYesBtn.addEventListener('click', () => handleRSVP('confirmar'));
        confirmNoBtn.addEventListener('click', () => handleRSVP('cancelar'));
        confirmMaybeBtn.addEventListener('click', () => handleRSVP('talvez'));
        
        // Contador de invitados
        decreaseGuestsBtn.addEventListener('click', decreaseGuestCount);
        increaseGuestsBtn.addEventListener('click', increaseGuestCount);
        
        // Sistema de canciones
        addSongBtn.addEventListener('click', addSong);
        songRequestInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addSong();
        });
        
        // Modal
        closeModalBtn.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);
        window.addEventListener('click', function(e) {
            if (e.target === confirmationModal) closeModal();
        });
        
        // Enlace del mapa
        mapLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Ubicación: Salón de Fiestas "La Luna"\nAv. Principal #456, Ciudad Jardín\n\nSe abrirá Google Maps en la versión final.');
        });
    }
    
    function setupVisualEffects() {
        // Efecto de entrada para las tarjetas
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
        
        // Efecto de entrada para el contador
        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 800 + (index * 100));
        });
    }
    
    // ========== ANIMACIÓN DEL NOMBRE ==========
    
    function startNameAnimation() {
        // Cambiar el nombre cada 4 segundos
        setInterval(changeCelebrantName, 4000);
    }
    
    function changeCelebrantName() {
        currentNameIndex = (currentNameIndex + 1) % possibleNames.length;
        const newName = possibleNames[currentNameIndex];
        
        // Efecto de desvanecimiento
        celebrantName.style.opacity = '0';
        celebrantName.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            celebrantName.textContent = newName;
            celebrantName.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            celebrantName.style.opacity = '1';
            celebrantName.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // ========== CONTADOR REGRESIVO ==========
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = eventDate - now;
        
        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            // Actualizar elementos del DOM con efecto
            updateCounterWithEffect(countdownDays, days);
            updateCounterWithEffect(countdownHours, hours);
            updateCounterWithEffect(countdownMinutes, minutes);
            updateCounterWithEffect(countdownSeconds, seconds);
            
            // Actualizar mensaje según el tiempo restante
            updateCountdownMessage(days);
        } else {
            // Evento ya pasó
            countdownDays.textContent = '00';
            countdownHours.textContent = '00';
            countdownMinutes.textContent = '00';
            countdownSeconds.textContent = '00';
            countdownMessage.textContent = '¡El evento ya terminó! Gracias por ser parte de este momento especial.';
            countdownMessage.style.color = '#ff69b4';
        }
    }
    
    function updateCounterWithEffect(element, value) {
        if (element.textContent !== value.toString().padStart(2, '0')) {
            element.style.transform = 'scale(1.2)';
            element.style.color = '#ff4d9e';
            
            setTimeout(() => {
                element.textContent = value.toString().padStart(2, '0');
                element.style.transform = 'scale(1)';
                element.style.color = '#ff69b4';
            }, 200);
        }
    }
    
    function updateCountdownMessage(days) {
        if (days > 30) {
            countdownMessage.textContent = '¡Prepárate para una noche inolvidable!';
        } else if (days > 7) {
            countdownMessage.textContent = '¡Falta poco! Ya casi es la gran noche';
        } else if (days > 1) {
            countdownMessage.textContent = '¡La emoción crece! Ya casi estamos allí';
        } else if (days === 1) {
            countdownMessage.textContent = '¡Mañana es la gran noche! ¿Listo para celebrar?';
            countdownMessage.style.color = '#ff4d9e';
        } else {
            countdownMessage.textContent = '¡HOY ES LA GRAN NOCHE! Nos vemos en unas horas';
            countdownMessage.style.color = '#ff4d9e';
        }
    }
    
    // ========== SISTEMA DE CANCIONES ==========
    
    function addSong() {
        const songTitle = songRequestInput.value.trim();
        
        if (!songTitle) {
            showNotification('Por favor, escribe el nombre de una canción', 'warning');
            return;
        }
        
        if (songs.length >= 10) {
            showNotification('Límite de canciones alcanzado (10 máximo)', 'warning');
            return;
        }
        
        // Agregar canción a la lista
        songs.push({
            id: Date.now(),
            title: songTitle,
            addedBy: 'Tú',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        
        // Guardar en localStorage
        saveSongsToStorage();
        
        // Actualizar la lista visual
        updateSongList();
        
        // Limpiar el input
        songRequestInput.value = '';
        
        // Mostrar notificación
        showNotification(`¡"${songTitle}" agregada a la lista!`, 'success');
        
        // Efecto visual
        songRequestInput.focus();
    }
    
    function updateSongList() {
        if (songs.length === 0) {
            songList.innerHTML = '<p class="empty-list">Aún no hay canciones solicitadas. ¡Sé el primero!</p>';
            return;
        }
        
        songList.innerHTML = songs.map(song => `
            <div class="song-item">
                <div>
                    <strong>${song.title}</strong>
                    <div style="font-size: 0.8em; color: #888;">
                        Agregada por ${song.addedBy} a las ${song.timestamp}
                    </div>
                </div>
                <button class="remove-song" data-id="${song.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.remove-song').forEach(button => {
            button.addEventListener('click', function() {
                const songId = parseInt(this.getAttribute('data-id'));
                removeSong(songId);
            });
        });
    }
    
    function removeSong(songId) {
        songs = songs.filter(song => song.id !== songId);
        saveSongsToStorage();
        updateSongList();
        showNotification('Canción eliminada de la lista', 'info');
    }
    
    function saveSongsToStorage() {
        localStorage.setItem('quinceSongs', JSON.stringify(songs));
    }
    
    function loadSongsFromStorage() {
        const savedSongs = localStorage.getItem('quinceSongs');
        if (savedSongs) {
            songs = JSON.parse(savedSongs);
            updateSongList();
        }
    }
    
    // ========== SISTEMA DE CONFIRMACIÓN (RSVP) ==========
    
    function handleRSVP(status) {
        confirmationStatus = status;
        
        // Crear objeto con datos de confirmación
        rsvpData = {
            status: status,
            guests: guestCount,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
        
        // Guardar en localStorage
        saveRSVPToStorage();
        
        // Mostrar modal de confirmación
        showConfirmationModal();
        
        // Actualizar interfaz según la respuesta
        updateRSVPButtons(status);
        
        // Mostrar notificación
        const statusMessages = {
            'confirmar': '¡Genial! Te esperamos en la fiesta',
            'cancelar': 'Lamentamos que no puedas asistir',
            'talvez': 'Te esperamos, ¡confirma cuando puedas!'
        };
        
        showNotification(statusMessages[status], status === 'confirmar' ? 'success' : 'info');
    }
    
    function updateRSVPButtons(selectedStatus) {
        // Remover clase activa de todos los botones
        [confirmYesBtn, confirmNoBtn, confirmMaybeBtn].forEach(btn => {
            btn.classList.remove('active');
            btn.style.opacity = '0.7';
        });
        
        // Aplicar estilo al botón seleccionado
        const selectedButton = {
            'confirmar': confirmYesBtn,
            'cancelar': confirmNoBtn,
            'talvez': confirmMaybeBtn
        }[selectedStatus];
        
        if (selectedButton) {
            selectedButton.classList.add('active');
            selectedButton.style.opacity = '1';
            selectedButton.style.transform = 'scale(1.05)';
        }
    }
    
    function showConfirmationModal() {
        const statusTexts = {
            'confirmar': 'Confirmada',
            'cancelar': 'Cancelada',
            'talvez': 'Pendiente'
        };
        
        const statusColors = {
            'confirmar': '#4CAF50',
            'cancelar': '#f44336',
            'talvez': '#2196F3'
        };
        
        const statusIcons = {
            'confirmar': 'fa-check-circle',
            'cancelar': 'fa-times-circle',
            'talvez': 'fa-question-circle'
        };
        
        // Crear contenido del modal
        confirmationDetails.innerHTML = `
            <h4 style="color: ${statusColors[confirmationStatus]}">
                <i class="fas ${statusIcons[confirmationStatus]}"></i> 
                Confirmación ${statusTexts[confirmationStatus]}
            </h4>
            <p><strong>Estado:</strong> <span style="color: ${statusColors[confirmationStatus]}">${statusTexts[confirmationStatus]}</span></p>
            <p><strong>Invitados:</strong> ${guestCount} persona${guestCount !== 1 ? 's' : ''}</p>
            <p><strong>Fecha de confirmación:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
            <p><strong>Hora:</strong> ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
            ${confirmationStatus === 'confirmar' ? 
                '<p style="margin-top: 15px; padding: 10px; background: #e8f5e9; border-radius: 8px;"><i class="fas fa-info-circle"></i> ¡Te esperamos! Llega 15 minutos antes para no perderte nada.</p>' : 
                ''}
        `;
        
        // Mostrar modal
        confirmationModal.style.display = 'flex';
        
        // Efecto de entrada
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modalContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
    }
    
    function closeModal() {
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            confirmationModal.style.display = 'none';
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 300);
    }
    
    // ========== CONTADOR DE INVITADOS ==========
    
    function decreaseGuestCount() {
        if (guestCount > 1) {
            guestCount--;
            updateGuestCountDisplay();
            animateCounterChange();
        }
    }
    
    function increaseGuestCount() {
        if (guestCount < 8) {
            guestCount++;
            updateGuestCountDisplay();
            animateCounterChange();
        } else {
            showNotification('Máximo 8 invitados por confirmación', 'warning');
        }
    }
    
    function updateGuestCountDisplay() {
        guestCountElement.textContent = guestCount;
        
        // Guardar en localStorage si ya hay una confirmación
        if (rsvpData) {
            rsvpData.guests = guestCount;
            saveRSVPToStorage();
        }
    }
    
    function animateCounterChange() {
        guestCountElement.style.transform = 'scale(1.3)';
        guestCountElement.style.color = '#ff4d9e';
        
        setTimeout(() => {
            guestCountElement.style.transform = 'scale(1)';
            guestCountElement.style.color = '#ff69b4';
        }, 300);
    }
    
    // ========== ALMACENAMIENTO LOCAL ==========
    
    function saveRSVPToStorage() {
        if (rsvpData) {
            localStorage.setItem('quinceRSVP', JSON.stringify(rsvpData));
        }
    }
    
    function loadRSVPFromStorage() {
        const savedRSVP = localStorage.getItem('quinceRSVP');
        if (savedRSVP) {
            rsvpData = JSON.parse(savedRSVP);
            confirmationStatus = rsvpData.status;
            guestCount = rsvpData.guests;
            
            // Actualizar interfaz
            updateGuestCountDisplay();
            updateRSVPButtons(confirmationStatus);
        }
    }
    
    // ========== UTILIDADES ==========
    
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.4s ease;
        `;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar animación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 3000);
    }
    
    // ========== ELEMENTOS DE NOTIFICACIÓN EN CSS ==========
    // Agregar estilos para las notificaciones
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 500;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .btn-rsvp.active {
            box-shadow: 0 0 0 3px white, 0 0 0 6px #ff69b4 !important;
        }
    `;
    document.head.appendChild(style);
});