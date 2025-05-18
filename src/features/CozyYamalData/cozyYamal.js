const dataGallery = [
  {
    name: 'afisha/afisha-image-1.png',
    realName: '-scKg2mKFRc.jpeg',
    author: 'Антон Мясин',
    source: 'https://vk.com/dkchgu',
  },
  {
    name: 'afisha/afisha-image-1.png',
    realName: '1.jpeg',
    author: 'Стас Дергунов',
    source: 'https://vk.com/dkchgu',
  },
  {
    name: 'afisha/afisha-image-1.png',
    realName: '-scKg2mKFRc.jpeg',
    author: 'Антон Мясин',
    source: 'https://vk.com/dkchgu',
  },
];

const ideas = [
  {
    id: 0,
    date: '02.03.2023',
    persone: {
      name: 'Аман',
      surname: 'Константинопольский',
      post: 'Главный специалист отдела национальной политики управления  политики и общественных отношений департамента внутренней политики Ямало-Ненецкого автономного округа',
      expert: true,
      links: [
        {
          name: 'vkontakte-social',
          url: 'https://vk.com/zhivemnasevere',
          title: 'ВКонтакте',
        },
        {
          name: 'telegram-social',
          url: 'https://t.me/zhivem_na_severe',
          title: 'Telegram',
        },
        {
          name: 'odnoklassniki-social',
          url: 'https://ok.ru/group/53447323877518',
          title: 'Одноклассники',
        },
      ],
    },
    text: 'Моя идея заключается в том, чтобы была общероссийская база достигших совершеннолетнего возраста. При розничной продаже алкоголя покупка привязывается к конкретному физическому лицу. В личном кабинете можно посмотреть, сколько алкогольной продукции уже приобретено в этом году, месяце. Невозможно приобрести физическому лицу объем спиртного больший допустимого. А норму должны разработать наркологи и другие специалисты здравоохранения. Таким образом, люди, страдающие от алкогольной зависимости, не будут иметь бесконтрольный доступ к спиртным напиткам. Это убережёт будущие поколения от зависимости и заболеваний, которые могут быть вызваны чрезмерным употреблением алкоголя.',
    likes: 12,
    end: true,
    experts: [
      {
        name: 'Аманес',
        surname: 'Константинопольскай',
        img: '/images/avatar/expert-3.png',
        post: 'Главный специалист отдела национальной политики управления политики и общественных отношений департамента внутренней политики Ямало-Ненецкого автономного округа',
        links: [
          {
            name: 'vkontakte-social',
            url: 'https://vk.com/zhivemnasevere',
            title: 'ВКонтакте',
          },
        ],
      },
      {
        name: 'Жанна',
        surname: 'Дарк',
        img: '/images/avatar/expert-2.png',
        post: 'Главный специалист отдела национальной политики управления политики и общественных отношений департамента внутренней политики Ямало-Ненецкого автономного округа',
        links: [
          {
            name: 'vkontakte-social',
            url: 'https://vk.com/zhivemnasevere',
            title: 'ВКонтакте',
          },
        ],
      },
    ],
  },
  {
    id: 1,
    date: '04.05.2023',
    persone: {
      name: 'Петр',
      surname: 'Спиридонов',
      post: 'Главный энегетик предприятия ООО Россельхоз',
      img: '/images/avatar/expert-3.png',
    },
    text: 'Если у человека день рождения выпадает на праздник, то предлагаю ему продавать по паспорту.',
    likes: 7,
    end: true,
    experts: [
      {
        name: 'Петр',
        surname: 'Спиридонов',
        img: '/images/avatar/expert-3.png',
        post: 'Главный специалист отдела национальной политики управления политики и общественных отношений департамента внутренней политики Ямало-Ненецкого автономного округа',
        links: [
          {
            name: 'vkontakte-social',
            url: 'https://vk.com/zhivemnasevere',
            title: 'ВКонтакте',
          },
        ],
      },
      {
        name: 'Аманес',
        surname: 'Константинопольскай',
        img: '/images/avatar/expert-1.png',
        post: 'Главный специалист отдела национальной политики управления политики и общественных отношений департамента внутренней политики Ямало-Ненецкого автономного округа',
        links: [
          {
            name: 'vkontakte-social',
            url: 'https://vk.com/zhivemnasevere',
            title: 'ВКонтакте',
          },
        ],
      },
      {
        name: 'Игорь',
        surname: 'Гром',
        post: 'Главный специалист отдела по придумыванию дожностей',
        img: '/images/avatar/expert-1.png',
        links: [
          {
            name: 'telegram-social',
            url: 'https://t.me/zhivem_na_severe',
            title: 'Telegram',
          },
          {
            name: 'odnoklassniki-social',
            url: 'https://ok.ru/group/53447323877518',
            title: 'Одноклассники',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    date: '05.05.2023',
    persone: {
      name: 'Игорь',
      surname: 'Гром',
      img: '/images/avatar/expert-1.png',
      expert: true,
      post: 'Майор полиции',
      links: [
        {
          name: 'vkontakte-social',
          url: 'https://vk.com/zhivemnasevere',
          title: 'ВКонтакте',
        },
        {
          name: 'odnoklassniki-social',
          url: 'https://ok.ru/group/53447323877518',
          title: 'Одноклассники',
        },
      ],
    },
    text: 'Если у человека день рождения выпадает на праздник, то предлагаю ему продавать по паспорту.',
    likes: 10,
    end: false,
    experts: [
      {
        name: 'Жанна',
        surname: 'Дарк',
        post: 'Писатель',
        img: '/images/avatar/expert-2.png',
      },
    ],
  },
  {
    id: 3,
    date: '04.06.2023',
    persone: {
      name: 'Иван',
      surname: 'Придубный',
      img: '/images/avatar/expert-1.png',
      expert: false,
    },
    text: 'Я думаю это хорошая идея',
    likes: 1,
    end: false,
    experts: [
      {
        name: 'Жанна',
        surname: 'Дарк',
        post: 'Писатель',
        img: '/images/avatar/expert-2.png',
      },
    ],
  },
  {
    id: 4,
    date: '05.06.2023',
    persone: {
      name: 'Степан',
      surname: 'Подлужный',
      img: '/images/avatar/expert-1.png',
      expert: true,
    },
    text: 'Если у человека день рождения выпадает на праздник, то предлагаю ему продавать по паспорту.',
    likes: 4,
    end: false,
    experts: [
      {
        name: 'Жанна',
        surname: 'Дарк',
        post: 'Писатель',
        img: '/images/avatar/expert-2.png',
      },
    ],
  },
  {
    id: 5,
    date: '06.07.2023',
    persone: {
      name: 'Игорь',
      surname: 'Завойлов',
      expert: false,
    },
    text: 'Мне не нравятся все идеи!',
    likes: 0,
    end: false,
  },
  {
    id: 7,
    date: '15.08.2023',
    persone: {
      name: 'Дмитрий',
      surname: 'Стародубов',
      expert: true,
      post: 'Главный представитель консалтинга',
      links: [
        {
          name: 'vkontakte-social',
          url: 'https://vk.com/zhivemnasevere',
          title: 'ВКонтакте',
        },
      ],
    },
    text: 'Предалагаю размещения компаний в регионе и продвижение товаров быстрого питания',
    likes: 5,
    end: false,
  },
];

const votess1 = [
  {
    voteID: 1,
    text: {
      title: 'Если у человека день рождения выпадает на праздник, то предлагаю ему продавать по паспорту.',
      content: '',
    },
    voteVolume: 100,
    check: true,
  },
  {
    voteID: 2,
    text: {
      title: 'Если у человека день рождения выпадает на праздник, то предлагаю ему продавать по паспорту.',
      content: '',
    },
    voteVolume: 750,
    check: false,
  },
  {
    voteID: 3,
    text: {
      title: 'Моя идея заключается в том, чтобы была общероссийская база достигших совершеннолетнего возраста.',
      content: 'При розничной продаже алкоголя покупка привязывается к конкретному физическому лицу. В личном кабинете можно посмотреть, сколько алкогольной продукции уже приобретено в этом году, месяце. Невозможно приобрестифы зическому лицу объем спиртного больший допустимого. А норму должны разработать наркологи и другие специалисты здравоохранения. Таким образом, люди, страдающие от алкогольной зависимости, не будут иметь бесконтрольный доступ к спиртным напиткам. Это убережёт будущие поколения от зависимости и заболеваний, которые могут быть вызваны чрезмерным употреблением алкоголя.',
    },
    images: [
      'https://mobimg.b-cdn.net/v3/fetch/4a/4af0bcc2b0c34fd573eca9f1be9ab245.jpeg?w=1470&r=0.5625',
      'https://s1.1zoom.ru/big3/977/Mountains_Scenery_473520.jpg',
    ],
    gallery: dataGallery,
    voteVolume: 500,
    check: false,
  },
  {
    voteID: 4,
    text: {
      title: 'При розничной продаже алкоголя покупка привязывается к конкретному физическому лицу.',
      content: 'Моя идея заключается в том, чтобы была общероссийская база достигших совершеннолетнего возраста. При розничной продаже алкоголя покупка привязывается к конкретному физическому лицу. В личном кабинете можно посмотреть, сколько алкогольной продукции уже приобретено в этом году, месяце. Невозможно приобрестифы зическому лицу объем спиртного больший допустимого. А норму должны разработать наркологи и другие специалисты здравоохранения. Таким образом, люди, страдающие от алкогольной зависимости, не будут иметь бесконтрольный доступ к спиртным напиткам. Это убережёт будущие поколения от зависимости и заболеваний, которые могут быть вызваны чрезмерным употреблением алкоголя.',
    },
    voteVolume: 1000,
    check: true,
  },
];

const data = [
  {
    id: 1,
    status: 'active',
    type: 'discussion',
    title: 'уютный ямал',
    ideasAll: 16,
    peopleAll: 12,
    tags: ['Муравленко', 'Общество'],
    question: 'Как вы хотите провести новогодние праздники? 1',
    text: 'На сайте управления социальной защиты населения размещен банк данных граждан, находящихся в трудной жизненной ситуации и нуждающихся в помощи. Как бы вы хотели узнавать о таких гражданах?',
    start: 1838427600000,
    users: [{ name: 'Dffa', surname: 'dasdas' }, { name: 'nbvcbvn', surname: 'fsd' }, { name: 'czxc', surname: 'bvcj' }, { name: 'hdfad', surname: 'czxn' }],
    step: 1,
    ideas,
  },

  {
    id: 2,
    status: 'active',
    type: 'discussion',
    title: 'уютный ямал',
    ideasAll: 0,
    votesAll: 0,
    people: 0,
    question: 'Как привлечь внимание горожан к нуждающимся? 0',
    text: 'На сайте управления социальной защиты населения размещен банк данных граждан, находящихся в трудной жизненной ситуации и нуждающихся в помощи. Как бы вы хотели узнавать о таких гражданах?',
    tags: ['Новый Уренгой', 'Общество'],
    start: 1828427600000,
    users: [{ name: 'Dffa', surname: 'dasdas' }, { name: 'nbvcbvn', surname: 'fsd' }, { name: 'czxc', surname: 'bvcj' }, { name: 'hdfad', surname: 'czxn' }],
    step: 2,
    ideas,
  },
  {
    id: 3,
    title: 'уютный ямал',
    question: 'Как вы хотите провести новогодние праздники?',
    text: 'На сайте управления социальной защиты населения размещен банк данных граждан, находящихся в трудной жизненной ситуации и нуждающихся в помощи. Как бы вы хотели узнавать о таких гражданах?',
    votesAll: 500,
    tags: ['Салехард', 'Социальная среда'],
    start: 1858427600000,
    users: [{ name: 'Dffa', surname: 'dasdas' }, { name: 'nbvcbvn', surname: 'fsd' }, { name: 'czxc', surname: 'bvcj' }, { name: 'hdfad', surname: 'czxn' }],
    type: 'voting',
    votesData: votess1,
    step: 3,
    status: 'active',
    maxVotes: 1,
  },
  {
    id: 4,
    type: 'voting',
    title: 'уютный ямал',
    ideasAll: 24,
    votesAll: 3,
    peopleAll: 2350,
    tags: ['Лабытнанги', 'Уютный-Ямал'],
    question: 'Как привлечь внимание горожан к нуждающимся во внимании горожан жителям Нового Уренгоя?',
    text: 'На сайте управления социальной защиты населения размещен банк данных граждан, находящихся в трудной жизненной ситуации и нуждающихся в помощи. Как бы вы хотели узнавать о таких гражданах?',
    start: 1868427600000,
    users: [{ name: 'Dffa', surname: 'dasdas' }, { name: 'nbvcbvn', surname: 'fsd' }, { name: 'czxc', surname: 'bvcj' }, { name: 'hdfad', surname: 'czxn' }],
    votesData: votess1,
    ideasPicked: votess1.length,
    step: 4,
    status: 'archive',
    maxVotes: 2,
  },
];

export default data;
