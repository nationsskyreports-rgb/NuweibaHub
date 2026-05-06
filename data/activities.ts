export interface Activity {
  id: string;
  nameEn: string;
  nameAr: string;
  type: 'snorkeling' | 'camel' | 'desert' | 'atv' | 'diving';
  descriptionEn: string;
  descriptionAr: string;
  duration: string;
  durationAr: string;
  priceMin: number;
  priceMax: number;
  difficulty: 'easy' | 'moderate' | 'hard';
  whatsapp: string;
  image: string;
  highlights: string[];
  highlightsAr: string[];
  area: string;
  areaAr: string;
  included: string[];
  includedAr: string[];
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    nameEn: 'Reef Snorkeling Tour',
    nameAr: 'جولة الغطس السطحي في الشعاب',
    type: 'snorkeling',
    descriptionEn: 'Explore the world-famous coral reefs of the Red Sea right from the Nuweiba coastline. Swim alongside colorful fish, sea turtles, and vibrant coral gardens in the crystal-clear waters of the Gulf of Aqaba.',
    descriptionAr: 'استكشف الشعاب المرجانية الشهيرة في البحر الأحمر مباشرة من ساحل نويبع. سبح جنباً إلى جنب مع الأسماك الملونة والسلاحف البحرية وحدائق المرجان النابضة في المياه الصافية لخليج العقبة.',
    duration: '3 hours',
    durationAr: '٣ ساعات',
    priceMin: 150,
    priceMax: 250,
    difficulty: 'easy',
    whatsapp: '+201078901234',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
    highlights: ['Equipment provided', 'Guide included', 'Suitable for beginners'],
    highlightsAr: ['المعدات متوفرة', 'دليل مرافق', 'مناسب للمبتدئين'],
    area: 'Ras Shitan',
    areaAr: 'رأس شيطان',
    included: ['Snorkel gear', 'Life jacket', 'Guide', 'Water'],
    includedAr: ['معدات الغطس', 'سترة النجاة', 'دليل', 'مياه'],
  },
  {
    id: 'a2',
    nameEn: 'Camel Trek at Sunset',
    nameAr: 'رحلة جمال عند الغروب',
    type: 'camel',
    descriptionEn: 'Ride through the dramatic Sinai desert landscape on the back of a camel as the sun sets over the mountains. A classic Bedouin experience guided by local tribesmen who share stories of the ancient desert trails.',
    descriptionAr: 'امتطِ الجمال عبر المشهد الصحراوي الدرامي لسيناء مع غروب الشمس وراء الجبال. تجربة بدوية كلاسيكية بقيادة رجال القبائل المحليين الذين يشاركون قصص دروب الصحراء القديمة.',
    duration: '2 hours',
    durationAr: '٢ ساعة',
    priceMin: 100,
    priceMax: 180,
    difficulty: 'easy',
    whatsapp: '+201089012345',
    image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800',
    highlights: ['Sunset views', 'Bedouin tea included', 'Photo stops'],
    highlightsAr: ['إطلالات على الغروب', 'شاي بدوي متضمن', 'توقفات للتصوير'],
    area: 'Tarabin',
    areaAr: 'طرابين',
    included: ['Camel ride', 'Guide', 'Bedouin tea', 'Photos'],
    includedAr: ['ركوب الجمال', 'دليل', 'شاي بدوي', 'صور'],
  },
  {
    id: 'a3',
    nameEn: 'Desert Overnight Camp',
    nameAr: 'تخييم ليلي في الصحراء',
    type: 'desert',
    descriptionEn: 'Spend a magical night under a canopy of a million stars deep in the Sinai desert. Sleep in traditional Bedouin tents, enjoy a campfire dinner with local food, and wake up to the most breathtaking sunrise in Egypt.',
    descriptionAr: 'أمضِ ليلة ساحرة تحت سقف مليون نجمة في أعماق صحراء سيناء. نم في خيام بدوية تقليدية واستمتع بعشاء على نار المخيم مع الطعام المحلي واستيقظ على أجمل شروق شمس في مصر.',
    duration: '18 hours',
    durationAr: '١٨ ساعة',
    priceMin: 300,
    priceMax: 500,
    difficulty: 'easy',
    whatsapp: '+201090123456',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800',
    highlights: ['Stargazing', 'Campfire dinner', 'Bedouin breakfast'],
    highlightsAr: ['مراقبة النجوم', 'عشاء على نار المخيم', 'فطور بدوي'],
    area: 'Wadi Hamada',
    areaAr: 'وادي حمادة',
    included: ['Tent', 'Dinner & breakfast', 'Guide', 'Transport'],
    includedAr: ['خيمة', 'عشاء وفطور', 'دليل', 'نقل'],
  },
  {
    id: 'a4',
    nameEn: 'ATV Desert Adventure',
    nameAr: 'مغامرة دراجات الصحراء',
    type: 'atv',
    descriptionEn: 'Tear through sand dunes and rocky desert terrain on powerful ATVs with an adrenaline-pumping tour through the Sinai hinterland. No experience needed — guides will train you before the ride.',
    descriptionAr: 'اخترق الكثبان الرملية والتضاريس الصحراوية الصخرية على دراجات رباعية قوية في جولة مثيرة عبر أرياف سيناء. لا حاجة لخبرة — سيدربك المرشدون قبل الانطلاق.',
    duration: '2.5 hours',
    durationAr: '٢.٥ ساعة',
    priceMin: 200,
    priceMax: 350,
    difficulty: 'moderate',
    whatsapp: '+201001234567',
    image: 'https://images.unsplash.com/photo-1596627116790-af6f46dddbfd?w=800',
    highlights: ['No experience needed', 'Safety gear provided', 'Desert photo spots'],
    highlightsAr: ['لا حاجة لخبرة', 'معدات أمان متوفرة', 'مواقع تصوير صحراوية'],
    area: 'North Nuweiba',
    areaAr: 'شمال نويبع',
    included: ['ATV rental', 'Helmet', 'Safety gear', 'Guide', 'Water'],
    includedAr: ['تأجير الدراجة', 'خوذة', 'معدات أمان', 'دليل', 'مياه'],
  },
  {
    id: 'a5',
    nameEn: 'Scuba Diving Day',
    nameAr: 'يوم الغطس العميق',
    type: 'diving',
    descriptionEn: 'Discover the underwater paradise of the Red Sea with a professionally guided scuba diving experience. Explore coral walls, sunken shipwrecks, and encounter rays, octopus, and the dazzling marine life of the Gulf of Aqaba.',
    descriptionAr: 'اكتشف الجنة الجوفية للبحر الأحمر في تجربة غطس احترافية بإرشاد متخصص. استكشف جدران المرجان والسفن الغارقة والتقِ بالشفانين والأخطبوطات والحياة البحرية المبهرة في خليج العقبة.',
    duration: 'Full day (6 hours)',
    durationAr: 'يوم كامل (٦ ساعات)',
    priceMin: 500,
    priceMax: 800,
    difficulty: 'hard',
    whatsapp: '+201012309876',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    highlights: ['PADI certified instructors', 'Two dives included', 'Equipment provided'],
    highlightsAr: ['مدربون معتمدون من PADI', 'غطستان متضمنتان', 'المعدات متوفرة'],
    area: 'Ras Shitan',
    areaAr: 'رأس شيطان',
    included: ['All equipment', 'Instructor', 'Boat', 'Lunch', 'Certification card'],
    includedAr: ['جميع المعدات', 'مدرب', 'قارب', 'غداء', 'بطاقة شهادة'],
  },
];
