// --- BACKUP & RESTORE MODULE ---
const exportBtn = document.getElementById('exportBtn');
const importInput = document.getElementById('importInput');

if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `active_brain_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });
}

if (importInput) {
  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          notes = imported;
          saveNotes();
          alert('База мыслей успешно импортирована!');
        }
      } catch (err) {
        alert('Ошибка чтения файла резервной копии.');
      }
    };
    reader.readAsText(file);
  });
}

// Первоначальное заполнение при первом входе
if (notes.length === 0) {
  notes = [
    {
      id: 'ab_init_1',
      rawText: 'Позвонить Тимуру завтра в 15:00 по поводу сайта #клиенты',
      title: 'Позвонить Тимуру по поводу сайта',
      type: 'task',
      dueAt: new Date(Date.now() + 86400000).toISOString(),
      tags: ['#клиенты'],
      status: 'pending',
      nagCount: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 'ab_init_2',
      rawText: 'Идея: Сделать сервис автоматизации коротких видео для бизнеса #стартап',
      title: 'Сервис автоматизации коротких видео',
      type: 'idea',
      dueAt: null,
      tags: ['#стартап'],
      status: 'pending',
      nagCount: 0,
      createdAt: new Date().toISOString()
    }
  ];
  saveNotes();
}
