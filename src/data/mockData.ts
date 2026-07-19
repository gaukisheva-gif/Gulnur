import {StatusColor} from '../components/StatusBadge';

export type Declaration = {
  id: string;
  regNumber: string;
  status: string;
  statusColor: StatusColor;
  corridor: string;
  place: string;
  date: string;
  amount: string;
};

export const declarations: Declaration[] = [
  {
    id: '1',
    regNumber: '55301/120626/0001466',
    status: 'Выпущена',
    statusColor: 'green',
    corridor: 'зелёный',
    place: 'Алматы-1',
    date: '12.06.2026',
    amount: '480 312 ₸',
  },
  {
    id: '2',
    regNumber: '55301/120626/0001465',
    status: 'Под контролем',
    statusColor: 'orange',
    corridor: 'жёлтый',
    place: 'Астана',
    date: '12.06.2026',
    amount: '1 204 800 ₸',
  },
  {
    id: '3',
    regNumber: '55301/110626/0001464',
    status: 'Зарегистрирована',
    statusColor: 'gray',
    corridor: 'белый',
    place: 'Хоргос',
    date: '11.06.2026',
    amount: '328 000 ₸',
  },
  {
    id: '4',
    regNumber: '55302/110626/0000183',
    status: 'Выпущена',
    statusColor: 'green',
    corridor: 'зелёный',
    place: 'Петропавловск',
    date: '11.06.2026',
    amount: '84 520 ₸',
  },
  {
    id: '5',
    regNumber: '55301/100626/0001463',
    status: 'Под контролем',
    statusColor: 'orange',
    corridor: 'красный',
    place: 'Алматы-2',
    date: '10.06.2026',
    amount: '2 741 000 ₸',
  },
  {
    id: '6',
    regNumber: '55301/100626/0001462',
    status: 'Отказана',
    statusColor: 'red',
    corridor: 'жёлтый',
    place: 'Алматы-1',
    date: '10.06.2026',
    amount: '612 400 ₸',
  },
];

export type Contract = {
  id: string;
  number: string;
  partner: string;
  amount: string;
  date: string;
  dtCount: number | null;
  status: 'active' | 'draft' | 'archive';
};

export const contracts: Contract[] = [
  {
    id: '1',
    number: 'K-2025/0418',
    partner: 'Shenzhen Goldway · Китай',
    amount: '124 800,00 USD',
    date: '12.06.2025',
    dtCount: 3,
    status: 'active',
  },
  {
    id: '2',
    number: 'K-2025/0402',
    partner: 'TechnoLogistics GmbH · Германия',
    amount: '32 156,00 EUR',
    date: '02.06.2025',
    dtCount: 1,
    status: 'active',
  },
  {
    id: '3',
    number: 'K-2025/0388',
    partner: 'Yiwu Tianhao Imp. · Китай',
    amount: '8 460,00 USD',
    date: '28.05.2025',
    dtCount: null,
    status: 'draft',
  },
  {
    id: '4',
    number: 'K-2025/0341',
    partner: 'Hyundai Motor Company · Корея',
    amount: '4 820 000,00 KRW',
    date: '14.05.2025',
    dtCount: 5,
    status: 'active',
  },
  {
    id: '5',
    number: 'K-2024/1188',
    partner: 'ООО «Уральский трубопрокат» · Россия',
    amount: '2 415 000,00 RUB',
    date: '18.11.2024',
    dtCount: 2,
    status: 'archive',
  },
];

export type License = {
  id: string;
  number: string;
  type: string;
  desc: string;
  note: string;
  tnved: string;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expiring';
  issuer: string;
  issueDate: string;
  daysLeft?: string;
  alert?: string;
  goods?: {name: string; qty: string}[];
};

export const licenses: License[] = [
  {
    id: 'KZ-LIC-2026-04812',
    number: 'KZ-LIC-2026-04812',
    type: 'Лицензия Минторга',
    desc: 'Импорт криптографич. средств',
    note: 'осталось 142 из 500 шт',
    tnved: '8471 30 0008',
    validFrom: '01.03.26',
    validTo: '01.03.27',
    status: 'active',
    issuer: 'Министерство торговли и интеграции РК',
    issueDate: '01.03.2026',
    goods: [{name: 'Ноутбуки с криптомодулем', qty: '358 / 500 шт'}],
  },
  {
    id: 'KZ-EAEC-2026-1188',
    number: 'KZ-EAEC-2026-1188',
    type: 'Заключение ЕАЭК',
    desc: 'Соответствие ТР ТС электромобилей',
    note: 'не требует квоты',
    tnved: '8703 80 0000',
    validFrom: '14.04.26',
    validTo: '14.04.27',
    status: 'active',
    issuer: 'Евразийская экономическая комиссия',
    issueDate: '14.04.2026',
    goods: [{name: 'Электромобили категории M1', qty: 'без ограничений'}],
  },
  {
    id: 'KZ-MZ-2026-0492',
    number: 'KZ-MZ-2026-0492',
    type: 'Сертификат соответствия',
    desc: 'Импорт лекарственных средств',
    note: 'осталось 8 партий',
    tnved: '3004 90',
    validFrom: '10.02.26',
    validTo: '10.02.27',
    status: 'expiring',
    issuer: 'Минпромышленности РК',
    issueDate: '15.03.2024',
    daysLeft: '8 дней',
    alert: 'Лицензия истекает скоро. Продлите до 15.06.2026, иначе поставки будут приостановлены.',
    goods: [{name: 'Фармацевтические субстанции', qty: '8 партий'}],
  },
  {
    id: 'KZ-QUOTA-2026-018',
    number: 'KZ-QUOTA-2026-018',
    type: 'Тарифная квота',
    desc: 'Свинина — квота',
    note: 'осталось 84 т из 200 т',
    tnved: '0203',
    validFrom: '01.01.26',
    validTo: '31.12.26',
    status: 'active',
    issuer: 'Минсельхоз РК',
    issueDate: '01.01.2026',
    goods: [{name: 'Свинина свежая/охлаждённая', qty: '116 / 200 т'}],
  },
];

export type NotifCategory = 'dt' | 'contracts' | 'licenses';
export type NotifItem = {
  id: string;
  dot: StatusColor | 'blue';
  title: string;
  time: string;
  desc: string;
  group: string;
  category: NotifCategory;
};

export const notifications: NotifItem[] = [
  {
    id: '1',
    dot: 'green',
    title: '55301/120626/0001466 — Выпущена',
    time: '09:42',
    desc: 'Зелёный коридор · выпуск за 14 секунд',
    group: 'Сегодня',
    category: 'dt',
  },
  {
    id: '2',
    dot: 'orange',
    title: '55301/120626/0001465 — Под контролем',
    time: '09:17',
    desc: 'Жёлтый коридор · запрошены документы по графе 44',
    group: 'Сегодня',
    category: 'dt',
  },
  {
    id: '3',
    dot: 'red',
    title: '55301/100626/0001462 — Отказано в выпуске',
    time: '08:55',
    desc: 'Графа 44: не представлено СЗЗ · устраните и подайте повторно',
    group: 'Сегодня',
    category: 'dt',
  },
  {
    id: '4',
    dot: 'gray',
    title: '55301/110626/0001464 — Зарегистрирована',
    time: 'вчера',
    desc: 'Присвоен рег. номер 55301/110626/0001464',
    group: 'Вчера',
    category: 'dt',
  },
  {
    id: '5',
    dot: 'blue',
    title: 'Обеспечение по 55301/120626/0001465',
    time: 'вчера',
    desc: 'Полис АО «СК Аманат» прикреплён к графе 44',
    group: 'Вчера',
    category: 'dt',
  },
  {
    id: '6',
    dot: 'orange',
    title: 'Контракт К-2025/0341 — Hyundai Motor Company',
    time: 'пн',
    desc: 'Истекает через 12 дней · продлите для новых поставок',
    group: 'На этой неделе',
    category: 'contracts',
  },
  {
    id: '7',
    dot: 'red',
    title: 'Контракт К-2024/1188 — Уральский трубопрокат',
    time: 'вт',
    desc: 'Истёк 3 дня назад',
    group: 'На этой неделе',
    category: 'contracts',
  },
  {
    id: '8',
    dot: 'orange',
    title: 'Лицензия на ввоз спецтехники',
    time: 'ср',
    desc: 'Истекает скоро · Минпромышленности РК',
    group: 'На этой неделе',
    category: 'licenses',
  },
  {
    id: '9',
    dot: 'red',
    title: 'Разрешение Минэкологии',
    time: 'ср',
    desc: 'Истекло 02.06.2026 · требуется продление',
    group: 'На этой неделе',
    category: 'licenses',
  },
];

export type TnvedNode = {
  code: string;
  name: string;
  children?: TnvedNode[];
};

export const tnvedTree: TnvedNode[] = [
  {
    code: '84',
    name: 'Реакторы ядерные, котлы, оборудование и механические устройства',
    children: [
      {
        code: '8471',
        name: 'Вычислительные машины и их блоки',
        children: [
          {code: '8471 30 000 1', name: 'Портативные компьютеры массой ≤10 кг (ноутбуки)'},
          {code: '8471 30 000 8', name: 'Планшетные компьютеры и аналогичные устройства'},
          {code: '8471 70 980 0', name: 'Устройства хранения данных, прочие'},
        ],
      },
      {
        code: '8473',
        name: 'Части и принадлежности машин товарной позиции 8471',
        children: [{code: '8473 30 800 0', name: 'Части и принадлежности прочие'}],
      },
    ],
  },
  {
    code: '85',
    name: 'Электрические машины и оборудование',
    children: [
      {
        code: '8517',
        name: 'Аппаратура телефонная и телеграфная',
        children: [
          {code: '8517 13 000 0', name: 'Смартфоны'},
          {code: '8517 62 000 0', name: 'Аппаратура для приёма/передачи данных (сетевое оборудование)'},
        ],
      },
      {
        code: '8518',
        name: 'Микрофоны, громкоговорители, наушники, гарнитуры',
        children: [{code: '8518 30 000 0', name: 'Гарнитуры и наушники'}],
      },
      {
        code: '8525',
        name: 'Аппаратура передающая для радиовещания/телевидения, телекамеры',
        children: [{code: '8525 80 190 0', name: 'Веб-камеры и телевизионные камеры прочие'}],
      },
      {
        code: '8528',
        name: 'Мониторы и проекторы, телевизионная аппаратура',
        children: [{code: '8528 52 000 0', name: 'Мониторы, способные подключаться к ЭВМ'}],
      },
      {
        code: '8504',
        name: 'Трансформаторы, преобразователи, индукционные катушки',
        children: [{code: '8504 40 900 0', name: 'Источники питания статические, прочие'}],
      },
    ],
  },
  {
    code: '87',
    name: 'Средства наземного транспорта',
    children: [
      {code: '8703', name: 'Легковые автомобили', children: [{code: '8703 80 000 0', name: 'Электромобили с электродвигателем'}]},
    ],
  },
];

export function tnvedSearch(query: string): {code: string; name: string; confidence: number}[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const flat: {code: string; name: string}[] = [];
  const walk = (nodes: TnvedNode[]) => {
    nodes.forEach(n => {
      flat.push({code: n.code, name: n.name});
      if (n.children) walk(n.children);
    });
  };
  walk(tnvedTree);
  return flat
    .filter(n => n.name.toLowerCase().includes(q) || n.code.includes(q))
    .map((n, i) => ({...n, confidence: Math.max(60, 96 - i * 8)}))
    .slice(0, 8);
}

export type TnvedPermit = {name: string; note: string; url?: string};
export type TnvedResult = {
  code: string;
  name: string;
  duty: string;
  vat: string;
  excise: string;
  conf: 'high' | 'mid';
  pct: number;
  permits: TnvedPermit[];
};

const TNVED_MOCK: Record<string, TnvedResult[]> = {
  'ноутбук': [
    {
      code: '8471 30 000 1',
      name: 'Портативные машины АОД (ноутбуки, планшеты)',
      duty: '0%',
      vat: '12%',
      excise: '—',
      conf: 'high',
      pct: 94,
      permits: [
        {
          name: 'Декларация соответствия ТР ТС 020',
          note: 'электромагнитная совместимость — обязательна',
          url: 'https://egov.kz/cms/ru/services/437pass_knb',
        },
      ],
    },
    {
      code: '8471 41 000 0',
      name: 'Машины АОД прочие, с дисплеем в одном корпусе',
      duty: '0%',
      vat: '12%',
      excise: '—',
      conf: 'mid',
      pct: 72,
      permits: [
        {
          name: 'Декларация соответствия ТР ТС 020',
          note: 'электромагнитная совместимость — обязательна',
          url: 'https://egov.kz/cms/ru/services/437pass_knb',
        },
      ],
    },
  ],
  'запчасти': [
    {
      code: '8708 99 970 9',
      name: 'Части и принадлежности для автомобилей прочие',
      duty: '5%',
      vat: '12%',
      excise: '—',
      conf: 'high',
      pct: 88,
      permits: [{name: 'Декларация соответствия ТР ТС 018', note: 'безопасность колёсных транспортных средств'}],
    },
    {
      code: '8431 49 900 0',
      name: 'Части машин и механизмов прочие',
      duty: '0%',
      vat: '12%',
      excise: '—',
      conf: 'mid',
      pct: 65,
      permits: [],
    },
  ],
  'телефон': [
    {
      code: '8517 12 000 0',
      name: 'Телефоны для сотовых сетей, смартфоны',
      duty: '0%',
      vat: '12%',
      excise: '—',
      conf: 'high',
      pct: 98,
      permits: [
        {
          name: 'Декларация соответствия ТР ТС 020',
          note: 'электромагнитная совместимость — обязательна',
          url: 'https://egov.kz/cms/ru/services/437pass_knb',
        },
        {name: 'Нотификация о ввозе шифровальных средств', note: 'обязательна для смартфонов с шифрованием'},
      ],
    },
  ],
  'бумага': [
    {code: '4802 56 800 0', name: 'Бумага и картон для письма/печати, немелованные', duty: '5%', vat: '12%', excise: '—', conf: 'high', pct: 91, permits: []},
    {code: '4810 13 800 0', name: 'Бумага мелованная прочая', duty: '5%', vat: '12%', excise: '—', conf: 'mid', pct: 63, permits: []},
  ],
  'default': [
    {code: '9999 00 000 0', name: 'Прочие товары (уточните описание)', duty: '—', vat: '—', excise: '—', conf: 'mid', pct: 40, permits: []},
  ],
};

export function tnvedDetailedSearch(query: string): TnvedResult[] {
  const q = query.trim().toLowerCase();
  for (const key of Object.keys(TNVED_MOCK)) {
    if (key !== 'default' && q.indexOf(key) !== -1) return TNVED_MOCK[key];
  }
  return TNVED_MOCK.default;
}

export const kbkRows = [
  {
    code: '105102',
    name: 'НДС на товары, ввозимые из третьих стран',
    note: '12% от таможенной стоимости',
    balance: '842 600',
    written: '182 400',
  },
  {
    code: '105113',
    name: 'Таможенная пошлина',
    note: 'ставка ЕТТ ЕАЭС, для ТН ВЭД 8471 = 0%',
    balance: '120 000',
    written: '0',
  },
  {
    code: '105114',
    name: 'Таможенный сбор за оформление декларации',
    note: 'фикс. ставка по объёму ДТ',
    balance: '75 000',
    written: '25 000',
  },
  {
    code: '105115',
    name: 'Акциз на ввозимые табачные изделия',
    note: 'неприменимо',
    balance: '0',
    written: '0',
  },
  {
    code: '105116',
    name: 'Акциз на ввозимые алкогольные изделия',
    note: 'неприменимо',
    balance: '0',
    written: '0',
  },
  {
    code: '105119',
    name: 'Специальная защитная / антидемпинговая пошлина',
    note: 'не применяется к данному товару',
    balance: '50 000',
    written: '0',
  },
  {
    code: '105120',
    name: 'Утилизационный сбор',
    note: 'для авто/спецтехники, у вас 0',
    balance: '0',
    written: '0',
  },
  {
    code: '105202',
    name: 'Госпошлина за выдачу лицензий и заключений',
    note: 'разрешительные документы',
    balance: '15 000',
    written: '0',
  },
];

export const fallbackRates: {code: string; name: string; rate: number}[] = [
  {code: 'USD', name: 'Доллар США', rate: 480.72},
  {code: 'EUR', name: 'Евро', rate: 548.07},
  {code: 'CNY', name: 'Китайский юань', rate: 70.85},
  {code: 'RUB', name: 'Российский рубль', rate: 6.14},
  {code: 'GBP', name: 'Фунт стерлингов', rate: 636.23},
  {code: 'TRY', name: 'Турецкая лира', rate: 10.3},
  {code: 'AED', name: 'Дирхам ОАЭ', rate: 130.88},
  {code: 'CHF', name: 'Швейцарский франк', rate: 594.44},
  {code: 'JPY', name: 'Японская йена', rate: 2.96},
  {code: 'KRW', name: 'Южно-корейская вона', rate: 0.3101},
];

export type ContractJournalEntry = {
  id: string;
  type: 'ПИ' | 'ТД' | 'ДТ';
  regNumber: string;
  product: string;
  tnved: string;
  date: string;
  corridor: string;
  corridorColor: StatusColor;
  status: string;
  statusColor: StatusColor;
  payment: string;
  finance: string;
  financeColor: StatusColor;
};

export type ContractStats = {
  totalCreated: number;
  released: number;
  inProgress: number;
  totalPayments: string;
  docsCount: number;
  unk: string;
  journal: ContractJournalEntry[];
};

export const contractStats: Record<string, ContractStats> = {
  '1': {
    totalCreated: 10,
    released: 7,
    inProgress: 3,
    totalPayments: '23 970 444 ₸',
    docsCount: 6,
    unk: '25061534/8562/0418/1/1',
    journal: [
      {
        id: 'j1',
        type: 'ДТ',
        regNumber: 'ИМ40 20250612/101523/0012847',
        product: 'Ноутбуки HP ProBook 450',
        tnved: '8471 30 000 1',
        date: '12.06.2025',
        corridor: 'Зелёный',
        corridorColor: 'green',
        status: 'Выпущена',
        statusColor: 'green',
        payment: '4 269 894',
        finance: 'Завершён',
        financeColor: 'green',
      },
      {
        id: 'j2',
        type: 'ДТ',
        regNumber: 'ИМ40 20250605/101523/0012710',
        product: 'Мониторы 27"',
        tnved: '8528 52 000 0',
        date: '05.06.2025',
        corridor: 'Зелёный',
        corridorColor: 'green',
        status: 'Выпущена',
        statusColor: 'green',
        payment: '2 980 100',
        finance: 'Завершён',
        financeColor: 'green',
      },
      {
        id: 'j3',
        type: 'ДТ',
        regNumber: 'ИМ40 20250528/101523/0012461',
        product: 'Смартфоны',
        tnved: '8517 13 000 0',
        date: '28.05.2025',
        corridor: 'Зелёный',
        corridorColor: 'green',
        status: 'Выпущена',
        statusColor: 'green',
        payment: '6 120 400',
        finance: 'Завершён',
        financeColor: 'green',
      },
      {
        id: 'j4',
        type: 'ДТ',
        regNumber: 'ИМ40 20250520/101523/0012298',
        product: 'Планшеты',
        tnved: '8471 30 000 1',
        date: '20.05.2025',
        corridor: 'Жёлтый',
        corridorColor: 'orange',
        status: 'Контроль',
        statusColor: 'orange',
        payment: '1 845 200',
        finance: 'Частично',
        financeColor: 'orange',
      },
      {
        id: 'j5',
        type: 'ДТ',
        regNumber: 'ИМ40 20250515/101523/0012109',
        product: 'Аксессуары и кабели',
        tnved: '8473 30 800 0',
        date: '15.05.2025',
        corridor: 'Зелёный',
        corridorColor: 'green',
        status: 'Выпущена',
        statusColor: 'green',
        payment: '845 600',
        finance: 'Завершён',
        financeColor: 'green',
      },
      {
        id: 'j6',
        type: 'ДТ',
        regNumber: 'ИМ40 20250507/101523/0011980',
        product: 'Сетевое оборудование',
        tnved: '8517 62 000 0',
        date: '07.05.2025',
        corridor: 'Синий',
        corridorColor: 'blue',
        status: 'Выпущена',
        statusColor: 'green',
        payment: '3 410 700',
        finance: 'Завершён',
        financeColor: 'green',
      },
      {
        id: 'j7',
        type: 'ДТ',
        regNumber: 'ИМ40 20250428/101523/0011802',
        product: 'Внешние накопители',
        tnved: '8471 70 980 0',
        date: '28.04.2025',
        corridor: 'Зелёный',
        corridorColor: 'green',
        status: 'Выпущена',
        statusColor: 'green',
        payment: '1 220 050',
        finance: 'Завершён',
        financeColor: 'green',
      },
      {
        id: 'j8',
        type: 'ДТ',
        regNumber: 'ИМ40 20250419/101523/0011655',
        product: 'Источники питания',
        tnved: '8504 40 900 0',
        date: '19.04.2025',
        corridor: 'Красный',
        corridorColor: 'red',
        status: 'Контроль',
        statusColor: 'orange',
        payment: '2 075 300',
        finance: 'Частично',
        financeColor: 'orange',
      },
      {
        id: 'j9',
        type: 'ДТ',
        regNumber: 'ИМ40 20250410/101523/0011501',
        product: 'Веб-камеры',
        tnved: '8525 80 190 0',
        date: '10.04.2025',
        corridor: 'Белый',
        corridorColor: 'gray',
        status: 'Зарегист.',
        statusColor: 'blue',
        payment: '690 400',
        finance: 'Нет ФВ',
        financeColor: 'gray',
      },
      {
        id: 'j10',
        type: 'ДТ',
        regNumber: 'ИМ40 20250401/101523/0011340',
        product: 'Гарнитуры',
        tnved: '8518 30 000 0',
        date: '01.04.2025',
        corridor: 'Зелёный',
        corridorColor: 'green',
        status: 'Выпущена',
        statusColor: 'green',
        payment: '512 800',
        finance: 'Завершён',
        financeColor: 'green',
      },
    ],
  },
};

export const flagMap: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  CNY: '🇨🇳',
  RUB: '🇷🇺',
  GBP: '🇬🇧',
  TRY: '🇹🇷',
  AED: '🇦🇪',
  CHF: '🇨🇭',
  JPY: '🇯🇵',
  KRW: '🇰🇷',
};
