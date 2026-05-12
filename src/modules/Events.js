export async function initEvents() {
    const calendarGrid = document.getElementById('calendarGrid');
    const eventsGrid = document.getElementById('eventsGrid');
    const eventSearchInput = document.getElementById('eventSearch');
    const filterPills = document.querySelectorAll('.filter-pill');
  
    // Only run if elements exist
    if (!calendarGrid && !eventsGrid) return;
  
    // Fetch data dynamically
    let events = [];
    try {
        const res = await fetch('/src/data/events.json');
        if (res.ok) events = await res.json();
    } catch (e) {
        console.error("Failed to fetch events.json", e);
    }
  
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let currentDate = new Date();
    let selectedDate = null;
    let currentFilter = 'all';
    let searchQuery = '';
  
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }
  
    function renderCalendar(date) {
        if (!calendarGrid) return;
        calendarGrid.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
  
        const monthYearEl = document.getElementById('currentMonthYear');
        if (monthYearEl) {
            monthYearEl.textContent = `${monthNames[month]} ${year}`;
        }
  
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
  
        let startDay = firstDay - 1;
        if (startDay < 0) startDay = 6;
  
        for (let i = 0; i < startDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(emptyDiv);
        }
  
        for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.textContent = i;
  
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
  
        if (events.some(e => e.date === dateString)) {
            dayDiv.classList.add('has-event');
        }
  
        if (selectedDate === dateString) dayDiv.classList.add('selected');
  
        const today = new Date();
        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === i) {
            dayDiv.classList.add('today');
        }
  
        dayDiv.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
            dayDiv.classList.add('selected');
            selectedDate = dateString;
            renderSidePanelEvents(dateString);
        });
  
        calendarGrid.appendChild(dayDiv);
        }
    }
  
    function renderSidePanelEvents(dateString) {
        const listContainer = document.getElementById('eventsList');
        const displayDate = document.getElementById('selectedDateDisplay');
        if (!listContainer || !displayDate) return;
  
        const [y, m, d] = dateString.split('-');
        displayDate.textContent = `${d} ${monthNames[parseInt(m) - 1]} ${y}`;
  
        const dayEvents = events.filter(e => e.date === dateString);
        listContainer.innerHTML = '';
  
        if (dayEvents.length === 0) {
            listContainer.innerHTML = '<p class="no-events">Aucun événement prévu ce jour-là.</p>';
            return;
        }
  
        dayEvents.forEach(event => {
            // Secure rendering
            const eventEl = document.createElement('div');
            eventEl.classList.add('event-item');
            eventEl.style.display = 'flex';
            eventEl.style.gap = '1rem';
            eventEl.style.alignItems = 'center';
            eventEl.style.marginBottom = '1rem';
            eventEl.style.padding = '0.5rem';
            eventEl.style.borderRadius = '8px';
            eventEl.style.background = '#f8fafc';
            
            const imgEl = document.createElement('div');
            imgEl.className = 'event-side-image';
            imgEl.style.width = '60px';
            imgEl.style.height = '60px';
            imgEl.style.borderRadius = '6px';
            imgEl.style.backgroundSize = 'cover';
            imgEl.style.backgroundPosition = 'center';
            imgEl.style.backgroundImage = `url('${escapeHTML(event.image)}')`;
            imgEl.style.flexShrink = '0';
            
            const infoEl = document.createElement('div');
            infoEl.style.flex = '1';

            const titleEl = document.createElement('div');
            titleEl.className = 'event-title';
            titleEl.style.fontWeight = '700';
            titleEl.textContent = event.title;
            
            const timeEl = document.createElement('div');
            timeEl.className = 'event-time';
            timeEl.style.fontSize = '0.85rem';
            timeEl.style.color = '#64748b';
            timeEl.innerHTML = `<span>📍 ${escapeHTML(event.location)}</span> • <span>🏷️ ${escapeHTML(event.type)}</span>`;
            
            infoEl.appendChild(titleEl);
            infoEl.appendChild(timeEl);
            eventEl.appendChild(imgEl);
            eventEl.appendChild(infoEl);
            listContainer.appendChild(eventEl);
        });
    }
  
    function renderEventsGrid() {
        if (!eventsGrid) return;
        eventsGrid.innerHTML = '';
  
        const filteredEvents = events.filter(event => {
            const matchType = currentFilter === 'all' || event.type === currentFilter;
            const matchSearch = String(event.title).toLowerCase().includes(searchQuery) || String(event.location).toLowerCase().includes(searchQuery);
            return matchType && matchSearch;
        });
  
        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = '<p class="no-events" style="grid-column: 1/-1;">Aucun événement ne correspond à votre recherche.</p>';
            return;
        }
  
        filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  
        filteredEvents.forEach(event => {
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = monthNames[dateObj.getMonth()].substring(0, 3);
  
            const card = document.createElement('article');
            card.className = 'event-card-modern reveal active';
            card.innerHTML = `
                <div class="ec-image" style="background-image: url('${escapeHTML(event.image)}');">
                    <div class="ec-date-badge">
                        <span class="ec-date-day">${day}</span>
                        <span class="ec-date-month">${month}</span>
                    </div>
                </div>
                <div class="ec-content">
                    <span class="ec-tag">${escapeHTML(event.type)}</span>
                    <h3 class="ec-title">${escapeHTML(event.title)}</h3>
                    <div class="ec-meta">
                        <span>📍 ${escapeHTML(event.location)}</span>
                    </div>
                    <div class="ec-actions">
                        <button class="btn-theme" style="flex:1;">Réserver</button>
                        <button class="btn-theme-outline btn-add-cal" title="Ajouter au calendrier" data-title="${escapeHTML(event.title)}" data-date="${event.date}" data-location="${escapeHTML(event.location)}">
                            📅
                        </button>
                    </div>
                </div>
            `;
            eventsGrid.appendChild(card);
        });

        // Add to Calendar Event Listeners securely
        eventsGrid.querySelectorAll('.btn-add-cal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.currentTarget.getAttribute('data-title');
                const date = e.currentTarget.getAttribute('data-date');
                const location = e.currentTarget.getAttribute('data-location');
                alert(`📅 Ajouté à votre calendrier :\n\n${title}\nDate : ${date}\nLieu : ${location}`);
            });
        });
    }
  
    // Listeners
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(currentDate); });
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(currentDate); });
  
    if (eventSearchInput) {
        eventSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderEventsGrid();
        });
    }
  
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.dataset.filter;
            renderEventsGrid();
        });
    });
  
    renderCalendar(currentDate);
    renderEventsGrid();
}
