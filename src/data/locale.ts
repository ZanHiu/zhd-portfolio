export type LocaleKey =
  | 'nav.home' | 'nav.about' | 'nav.projects' | 'nav.skills' | 'nav.credentials' | 'nav.contact'
  | 'available' | 'theme.dark' | 'theme.light' | 'contact.email' | 'contact.github' | 'contact.linkedin' | 'contact.slack'

type LocaleDictionary = Record<LocaleKey, string>

const english: LocaleDictionary = {
  'nav.home': 'HOME', 'nav.about': 'ABOUT', 'nav.projects': 'PROJECTS', 'nav.skills': 'SKILLS', 'nav.credentials': 'CREDENTIALS', 'nav.contact': 'CONTACT',
  available: 'AVAILABLE FOR WORK', 'theme.dark': 'Switch to dark theme', 'theme.light': 'Switch to light theme',
  'contact.email': 'EMAIL', 'contact.github': 'GITHUB', 'contact.linkedin': 'LINKEDIN', 'contact.slack': 'SLACK',
}

const dictionaries: Record<string, Partial<LocaleDictionary>> = {
  VI: { 'nav.home': 'TRANG CHỦ', 'nav.about': 'GIỚI THIỆU', 'nav.projects': 'DỰ ÁN', 'nav.skills': 'KỸ NĂNG', 'nav.credentials': 'HỒ SƠ', 'nav.contact': 'LIÊN HỆ', available: 'SẴN SÀNG LÀM VIỆC', 'theme.dark': 'Chuyển sang nền tối', 'theme.light': 'Chuyển sang nền sáng' },
  FR: { 'nav.home': 'ACCUEIL', 'nav.about': 'À PROPOS', 'nav.projects': 'PROJETS', 'nav.skills': 'COMPÉTENCES', 'nav.credentials': 'DOSSIER', 'nav.contact': 'CONTACT', available: 'DISPONIBLE POUR TRAVAILLER', 'theme.dark': 'Passer au thème sombre', 'theme.light': 'Passer au thème clair' },
  ES: { 'nav.home': 'INICIO', 'nav.about': 'SOBRE MÍ', 'nav.projects': 'PROYECTOS', 'nav.skills': 'HABILIDADES', 'nav.credentials': 'EXPEDIENTE', 'nav.contact': 'CONTACTO', available: 'DISPONIBLE PARA TRABAJAR', 'theme.dark': 'Cambiar a tema oscuro', 'theme.light': 'Cambiar a tema claro' },
  IT: { 'nav.home': 'HOME', 'nav.about': 'PROFILO', 'nav.projects': 'PROGETTI', 'nav.skills': 'COMPETENZE', 'nav.credentials': 'ARCHIVIO', 'nav.contact': 'CONTATTO', available: 'DISPONIBILE AL LAVORO', 'theme.dark': 'Passa al tema scuro', 'theme.light': 'Passa al tema chiaro' },
  DE: { 'nav.home': 'START', 'nav.about': 'ÜBER MICH', 'nav.projects': 'PROJEKTE', 'nav.skills': 'FÄHIGKEITEN', 'nav.credentials': 'UNTERLAGEN', 'nav.contact': 'KONTAKT', available: 'OFFEN FÜR ARBEIT', 'theme.dark': 'Dunkles Design aktivieren', 'theme.light': 'Helles Design aktivieren' },
  PT: { 'nav.home': 'INÍCIO', 'nav.about': 'SOBRE', 'nav.projects': 'PROJETOS', 'nav.skills': 'HABILIDADES', 'nav.credentials': 'ARQUIVO', 'nav.contact': 'CONTATO', available: 'DISPONÍVEL PARA TRABALHAR', 'theme.dark': 'Mudar para tema escuro', 'theme.light': 'Mudar para tema claro' },
  JA: { 'nav.home': 'ホーム', 'nav.about': 'プロフィール', 'nav.projects': 'プロジェクト', 'nav.skills': 'スキル', 'nav.credentials': '記録', 'nav.contact': '連絡先', available: '仕事のご相談受付中', 'theme.dark': 'ダークテーマに切替', 'theme.light': 'ライトテーマに切替' },
  KO: { 'nav.home': '홈', 'nav.about': '소개', 'nav.projects': '프로젝트', 'nav.skills': '기술', 'nav.credentials': '기록', 'nav.contact': '연락처', available: '업무 제안 환영', 'theme.dark': '다크 테마로 전환', 'theme.light': '라이트 테마로 전환' },
  ZH: { 'nav.home': '首页', 'nav.about': '关于', 'nav.projects': '项目', 'nav.skills': '技能', 'nav.credentials': '档案', 'nav.contact': '联系', available: '可接受工作机会', 'theme.dark': '切换深色主题', 'theme.light': '切换浅色主题' },
  RU: { 'nav.home': 'ГЛАВНАЯ', 'nav.about': 'ОБО МНЕ', 'nav.projects': 'ПРОЕКТЫ', 'nav.skills': 'НАВЫКИ', 'nav.credentials': 'АРХИВ', 'nav.contact': 'КОНТАКТЫ', available: 'ОТКРЫТ К РАБОТЕ', 'theme.dark': 'Включить тёмную тему', 'theme.light': 'Включить светлую тему' },
  AR: { 'nav.home': 'الرئيسية', 'nav.about': 'نبذة', 'nav.projects': 'المشاريع', 'nav.skills': 'المهارات', 'nav.credentials': 'السجل', 'nav.contact': 'تواصل', available: 'متاح للعمل', 'theme.dark': 'تبديل إلى الوضع الداكن', 'theme.light': 'تبديل إلى الوضع الفاتح' },
  HI: { 'nav.home': 'होम', 'nav.about': 'परिचय', 'nav.projects': 'प्रोजेक्ट', 'nav.skills': 'कौशल', 'nav.credentials': 'रिकॉर्ड', 'nav.contact': 'संपर्क', available: 'काम के लिए उपलब्ध', 'theme.dark': 'डार्क थीम पर जाएँ', 'theme.light': 'लाइट थीम पर जाएँ' },
  TH: { 'nav.home': 'หน้าแรก', 'nav.about': 'เกี่ยวกับ', 'nav.projects': 'โปรเจกต์', 'nav.skills': 'ทักษะ', 'nav.credentials': 'ประวัติ', 'nav.contact': 'ติดต่อ', available: 'พร้อมรับงาน', 'theme.dark': 'เปลี่ยนเป็นธีมมืด', 'theme.light': 'เปลี่ยนเป็นธีมสว่าง' },
  MS: { 'nav.home': 'UTAMA', 'nav.about': 'TENTANG', 'nav.projects': 'PROJEK', 'nav.skills': 'KEMAHIRAN', 'nav.credentials': 'REKOD', 'nav.contact': 'HUBUNGI', available: 'TERSEDIA UNTUK BEKERJA', 'theme.dark': 'Tukar ke tema gelap', 'theme.light': 'Tukar ke tema cerah' },
  SV: { 'nav.home': 'HEM', 'nav.about': 'OM MIG', 'nav.projects': 'PROJEKT', 'nav.skills': 'KOMPETENSER', 'nav.credentials': 'ARKIV', 'nav.contact': 'KONTAKT', available: 'TILLGÄNGLIG FÖR ARBETE', 'theme.dark': 'Växla till mörkt tema', 'theme.light': 'Växla till ljust tema' },
  TR: { 'nav.home': 'ANA SAYFA', 'nav.about': 'HAKKIMDA', 'nav.projects': 'PROJELER', 'nav.skills': 'YETENEKLER', 'nav.credentials': 'ARŞİV', 'nav.contact': 'İLETİŞİM', available: 'ÇALIŞMAYA UYGUN', 'theme.dark': 'Koyu temaya geç', 'theme.light': 'Açık temaya geç' },
  PL: { 'nav.home': 'START', 'nav.about': 'O MNIE', 'nav.projects': 'PROJEKTY', 'nav.skills': 'UMIEJĘTNOŚCI', 'nav.credentials': 'ARCHIWUM', 'nav.contact': 'KONTAKT', available: 'DOSTĘPNY DO PRACY', 'theme.dark': 'Przełącz na ciemny motyw', 'theme.light': 'Przełącz na jasny motyw' },
}

export function translate(code: string, key: LocaleKey) {
  return dictionaries[code]?.[key] ?? english[key]
}
