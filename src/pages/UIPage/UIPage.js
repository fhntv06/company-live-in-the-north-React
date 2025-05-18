/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useForm as useFormValidation } from 'react-hook-form';
import { useForm } from 'react-hooks-helper';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../components/Inputs/InputField/InputField';
import CyrillicInput, { getCyrillicInputRef } from '../../components/Inputs/CyrillicInput/CyrillicInput';
import PhoneInput, { getPhoneInputRef } from '../../components/Inputs/PhoneInput/PhoneInput';
import SearchInput from '../../components/Inputs/SearchInput/SearchInput';
import DateInput from '../../components/Inputs/DateInput/DateInput';
import TextArea from '../../components/Inputs/TextArea/TextArea';
import Button from '../../components/Button/Button';
import ProjectCard from '../../components/ProjectsCard/ProjectCard/ProjectCard';
import AddIdia from '../../components/AddIdia/AddIdia';
import AllEvents from '../../components/AllEvents/AllEvents';
import CardListView from '../../components/CardListView/CardListView';
import Wallet from '../../components/Wallet/Wallet';
import ProjectCardBig from '../../components/ProjectsCard/ProjectCardBig/ProjectCardBig';
import TickerPrice from '../../components/TickerPrice/TickerPrice';
import EventCardSmall from '../../components/Event/EventCardSmall/EventCardSmall';
import SearchHint from '../../components/Search/SearchHint/SearchHint';
// import Search from '../../components/Search/Search';
import Tag from '../../components/Tags/Tag';
import Select from '../../components/Select/Select';
// import TagSearch from '../../components/TagSearch/TagSearch';
// import Tags from '../../components/Tags/Tags';
import Header from '../../components/Header/Header';
import Avatar from '../../components/Avatar/Avatar';
import ExpertAvatars from '../../components/Expert/ExpertAvatars/ExpertAvatars';
// import ExpertSupport from '../../components/Expert/ExpertSupport/ExpertSupport';
import BottomMenuMobile from '../../components/BottomMenuMobile/BottomMenuMobile';
import ExpertsGrade from '../../components/Expert/ExpertsGrade/ExpertsGrade';
import LikesControl from '../../components/LikesControl/LikesControl';
import BonusCard from '../../components/BonusCard/BonusCard';
import DiscussionSortedList from '../../components/Discussion/DiscussionSortedList/DiscussionSortedList';
// import ProjectCardInner from '../../components/ProjectsCard/ProjectCardInner/ProjectCardInner';
import TimeCard from '../../components/TimeCard/TimeCard';
// import ProjectCardSmall from '../../components/ProjectsCard/ProjectCardSmall/ProjectCardSmall';
// import ProjectCardAbout from '../../components/ProjectsCard/ProjectCardAbout/ProjectCardAbout';
import Checkbox from '../../components/Checkbox/Checkbox';
import SpecialCard from '../../components/SpecialCard/SpecialCard';
import OversizedLink from '../../components/OversizedLink/OversizedLink';
import HowWorkDiscussion from '../../components/HowWorkDiscussion/HowWorkDiscussion';
import Stages from '../../components/Stages/Stages';
import OrderCard from '../../components/OrderCard/OrderCard';
// import SheduleCard from '../../components/SheduleCard/SheduleCard';
// import ModalOrderAgree from '../../components/ModalOrderAgree/ModalOrderAgree';

// import AboutImg from '../../images/icon_about_component.png'; // TEST
// import SmallImgV1 from '../../images/background_small-v1.png'; // TEST
// import SmallImgV1contrast from '../../images/background_small-v1contrast.png'; // TEST
// import SmallImgV11 from '../../images/background_small-v1.1.png'; // TEST
// import SmallImgV2 from '../../images/background_small-v2.png'; // TEST
import DocumentLink from '../../components/Documents/DocumentLink';
import FileUploadController from '../../components/FileUpload/FileUploadController';
import VoteCards from '../../components/VoteCards/VoteCards';

import AllIdea from '../../components/AllIdea/AllIdea';
import AllComments from '../../components/AllComments/AllComments';

// Lk
import Qr from '../../components/Profile/Qr/Qr';
import ProfileTIle from '../../components/Profile/ProfileTile/ProfileTile';
import BasketStatus from '../../components/Profile/BasketStatus/BasketStatus';
import ActionCard from '../../components/Profile/ActionCard/ActionCard';

// Images for testing
// import AboutImg from '../../images/icon_about_component.png';
// import SmallImgV2 from '../../images/background_small-v2.png';
// import SmallImgV3 from '../../images/background_small-v3.png';
// import SmallImgV4 from '../../images/background_small-v4.png';

// import styles from './UIPage.module.scss';
// import InternalLink from '../../components/Links/InternalLink';
// import Calendar from '../../components/Calendar/Calendar';
import { fetchEvents, selectAllEvents } from '../../features/AfishEvents/eventsSlice';
// import OfferFirst from '../../components/OfferFirst/OfferFirst';
import BasketItem from '../../components/BasketItem/BasketItem';
import FaqCard from '../../components/FaqCard/FaqCard';
import WhereGetOrder from '../../components/Questions/WhereGetOrder';

// const dataSliderAfisha = [
//   {
//     category: 'спорт и игры',
//     day: '13',
//     month: 'декабря',
//     name: 'Хоккей. Первенство УФО, СФО, ПВО',
//     img: 'images/soon-card.jpg',
//     location: 'Новый Уренгой',
//     price: 2500,
//     type: 'event',
//     variant: 'soon',
//     long: true,
//   },
//   // {
//   //   category: 'спорт и игры',
//   //   day: '13',
//   //   month: 'декабря',
//   //   name: 'Хоккей. Первенство УФО, СФО, ПВО',
//   //   img: 'images/soon-card.jpg',
//   //   location: 'Новый Уренгой',
//   //   price: 2500,
//   //   type: 'event',
//   //   variant: 'soon',
//   //   long: true,
//   // },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/small-card-gru.png',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/actual-event-card.jpg',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/actual-event-card.jpg',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
//   {
//     category: 'спорт и игры',
//     day: '13',
//     month: 'декабря',
//     name: 'Хоккей. Первенство УФО, СФО, ПВО',
//     img: 'images/soon-card.jpg',
//     location: 'Новый Уренгой',
//     price: 2500,
//     type: 'event',
//     variant: 'soon',
//     long: true,
//   },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/small-card-gru.png',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/actual-event-card.jpg',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/small-card-gru.png',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/actual-event-card.jpg',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
//   {
//     category: 'спорт и игры',
//     day: '13',
//     month: 'декабря',
//     name: 'Хоккей. Первенство УФО, СФО, ПВО',
//     img: 'images/soon-card.jpg',
//     location: 'Новый Уренгой',
//     price: 2500,
//     type: 'event',
//     variant: 'soon',
//     long: true,
//   },
//   {
//     category: 'спорт и игры',
//     day: '13',
//     month: 'декабря',
//     name: 'Хоккей. Первенство УФО, СФО, ПВО',
//     img: 'images/soon-card.jpg',
//     location: 'Новый Уренгой',
//     price: 2500,
//     type: 'event',
//     variant: 'soon',
//     long: true,
//   },
//   {
//     category: 'туризм',
//     name: 'Лагерь ГУЛАГа «Кинжальный мыс»',
//     img: 'images/small-card-gru.png',
//     location: 'Новый Уренгой',
//     description: 'Уникальный тур по локациям Ямала',
//     price: 2500,
//     variant: 'actual',
//     type: 'event',
//     icon: 'face',
//     tickerPriceColor: '#9164F0',
//   },
// ];

// const dataSliderBottom = [
//   {
//     type: 'small',
//     text: 'Вы можете быть полезны прямо сейчас',
//     variant: 'big',
//     project: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: 'elka',
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'уютный ямал',
//     title: 'Предложите идею по улучшению жизни в своем регионе',
//     background: SmallImgV1,
//     description: 'Благотворительная акция в помощь детям Ямала',
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'уютный ямал',
//     title: 'Предложите идею по улучшению жизни в своем регионе',
//     background: SmallImgV11,
//     description: 'Благотворительная акция в помощь детям Ямала',
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'кибердружина',
//     title: 'Позаботьтесь о безопасности интернета',
//     description: 'Жалобы на деструктивный и опасный контент',
//     background: SmallImgV1contrast,
//     contrast: true,
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'уютный ямал',
//     title: 'Предложите идею по улучшению жизни в своем регионе',
//     background: SmallImgV1,
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'питомцы ямала',
//     title: 'Заведите себе нового друга',
//     description: 'Бездомные животные из природы',
//     background: SmallImgV11,
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'кибердружина',
//     title: 'Позаботьтесь о безопасности интернета',
//     description: 'Жалобы на деструктивный и опасный контент',
//     background: SmallImgV1contrast,
//     contrast: true,
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'уютный ямал',
//     title: 'Предложите идею по улучшению жизни в своем регионе',
//     background: SmallImgV1,
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'питомцы ямала',
//     title: 'Заведите себе нового друга',
//     description: 'Бездомные животные из природы',
//     background: SmallImgV11,
//   },
//   {
//     type: 'small',
//     variant: 'small',
//     project: 'кибердружина',
//     title: 'Позаботьтесь о безопасности интернета',
//     description: 'Жалобы на деструктивный и опасный контент',
//     background: SmallImgV1contrast,
//     contrast: true,
//   },
// ];

// const dataSliderMain = [
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/ui',
//   },
//   {
//     type: 'about',
//     title: 'Сообщество активных жителей Ямала',
//     description: 'Портал для тех, кому не&nbsp;безразлично, что происходит в&nbsp;его округе, городе, посёлке, дворе',
//     tex: 'подробнее о проекте',
//     href: '/ui',
//     img: AboutImg,
//   },
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/ui',
//   },
//   {
//     type: 'about',
//     title: 'Сообщество активных жителей Ямала',
//     description: 'Портал для тех, кому не&nbsp;безразлично, что происходит в&nbsp;его округе, городе, посёлке, дворе',
//     tex: 'подробнее о проекте',
//     href: '/ui',
//     img: AboutImg,
//   },
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/ui',
//   },
//   {
//     type: 'about',
//     title: 'Сообщество активных жителей Ямала',
//     description: 'Портал для тех, кому не&nbsp;безразлично, что происходит в&nbsp;его округе, городе, посёлке, дворе',
//     tex: 'подробнее о проекте',
//     href: '/ui',
//     img: AboutImg,
//   },
//   {
//     type: 'about',
//     title: 'Сообщество активных жителей Ямала',
//     description: 'Портал для тех, кому не&nbsp;безразлично, что происходит в&nbsp;его округе, городе, посёлке, дворе',
//     tex: 'подробнее о проекте',
//     href: '/ui',
//     img: AboutImg,
//   },
//   {
//     type: 'about',
//     title: 'Сообщество активных жителей Ямала',
//     description: 'Портал для тех, кому не&nbsp;безразлично, что происходит в&nbsp;его округе, городе, посёлке, дворе',
//     tex: 'подробнее о проекте',
//     href: '/ui',
//     img: AboutImg,
//   },
// ];

// const discussions = [
//   {
//     question: 'Как привлечь внимание горожан к нуждающимся во внимании горожан жителям Нового Уренгоя?',
//     tags: ['Новый Уренгой', 'Общество'],
//     day: '01',
//     month: 'февраля',
//     users: [{ name: 'Dffa', surname: 'dasdas' }, { name: 'nbvcbvn', surname: 'fsd' }, { name: 'czxc', surname: 'bvcj' }, { name: 'hdfad', surname: 'czxn' }],
//     type: 'discussion',
//   },
//   {
//     question: 'Как вы хотите провести новогодние праздники?',
//     tags: ['Новый Уренгой', 'Общество'],
//     day: '01',
//     month: 'февраля',
//     users: [{ name: 'Dffa', surname: 'dasdas' }, { name: 'nbvcbvn', surname: 'fsd' }, { name: 'czxc', surname: 'bvcj' }, { name: 'hdfad', surname: 'czxn' }],
//   },
// ];
import FiltersWrapper from '../../components/Calendar/FiltersWrapper';

const ideas = [
  {
    id: 0,
    date: '02.03.2023',
    persone: {
      name: 'Аман',
      surname: 'Константинопольский',
      href: '/lk',
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
        // img: 'images/avatar/expert-1.png',
        href: '/lk',
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
        img: '',
        href: '/lk',
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
        name: 'Длинный',
        surname: 'Названий',
        // img: 'images/avatar/expert-3.png',
        href: '/lk',
        post: 'Главный специалист отдела по придумыванию дожностей',
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
      {
        name: 'Аманес',
        surname: 'Константинопольскай',
        img: '',
        href: '/lk',
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
        img: '',
        href: '/lk',
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
        img: '',
        href: '/lk',
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
      name: 'Я первый написа',
      surname: 'Л',
      href: '/lk',
      post: 'post',
    },
    text: 'Если у человека день рождения выпадает на праздник, то предлагаю ему продавать по паспорту.',
    likes: 1,
    end: false,
    experts: [
      {
        name: 'Аманес',
        surname: 'Константинопольскай',
        // img: 'images/avatar/expert-1.png',
        href: '/lk',
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
        img: '',
        href: '/lk',
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
        name: 'Длинный',
        surname: 'Названий',
        // img: 'images/avatar/expert-3.png',
        href: '/lk',
        post: 'Главный специалист отдела по придумыванию дожностей',
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
      {
        name: 'Аманес',
        surname: 'Константинопольскай',
        img: '',
        href: '/lk',
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
        img: '',
        href: '/lk',
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
        img: '',
        href: '/lk',
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
    id: 2,
    date: '04.05.2023',
    persone: {
      name: 'Я первый написа',
      surname: 'Л',
      href: '/lk',
      expert: true,
      post: 'post',
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
    likes: 0,
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
    gallery: [
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
    ],
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

const votes = {
  id: 3,
  type: 'vote',
  status: 'archive',
  title: 'благоустройство городской среды',
  votesAll: 3,
  peopleAll: 2350,
  tags: ['Лабытнанги', 'Уютный-Ямал'],
  question: 'Как привлечь внимание горожан к нуждающимся во внимании горожан жителям Нового Уренгоя?',
  text: 'На сайте управления социальной защиты населения размещен банк данных граждан, находящихся в трудной жизненной ситуации и нуждающихся в помощи. Как бы вы хотели узнавать о таких гражданах?',
  start: 1869427600000,
  users: [{ name: 'Dffa', surname: 'dasdas' }, { name: 'nbvcbvn', surname: 'fsd' }, { name: 'czxc', surname: 'bvcj' }, { name: 'hdfad', surname: 'czxn' }],
  votesData: votess1,
  maxVotes: 3,
};

const comments = [
  {
    person: { name: 'Alex', surname: 'IzZoosada', href: '/' },
    textComment: 'Если у человека день рождения выпадает на праздник, то предлагаю ему продавать по паспорту.',
    end: true,
  },
];

const UIPage = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const { isOpen, openModalHandler, closeModalHandler } = useModal();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormValidation({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [{
    name,
    phone,
    message,
    date,
    searchValue,
  }, setForm] = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
    date: '',
    searchValue: '',
  });

  const galleyStore = [
    {
      src: 'https://swiperjs.com/demos/images/nature-2.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-3.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-4.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-5.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-6.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-7.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-8.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-9.jpg',
    },
    {
      src: 'https://swiperjs.com/demos/images/nature-10.jpg',
    },
  ];

  const options = [
    { value: '1', label: 'Новый Уренгой' },
    { value: '2', label: 'Губкинский' },
    { value: '3', label: 'Лабытнанги' },
    { value: '4', label: 'Муравленко' },
    { value: '5', label: 'Ноябрьск' },
    { value: '6', label: 'Салехард' },
    { value: '7', label: 'Фоновый Уренгой' },
    { value: '8', label: 'Новый Лабытнанги' },
    { value: '9', label: 'Новый Салехард' },
    { value: '10', label: 'Первомайский' },
  ];

  const dataCard = [
    {
      title: 'Уютный ямал',
      description: 'Поделись своими идеями, как улучшить жизнь на Ямале. Лучшие проекты будут реализованы в следующем году',
      img: 'images/yamal-bg.png',
      monthStart: 'январь',
      monthEnd: 'ноябрь',
      year: '2023',
      href: '/',
      icon: false,
    },
    {
      title: 'ЯПРИВИТ',
      description: 'Выбери лучшие экопроекты',
      img: 'images/yamal-animal.jpg',
      href: 'https://xn--b1albzfp9f.xn--80adblbabq1bk1bi8r.xn--p1ai/',
      icon: false,
    },
    {
      title: 'Питомцы Ямала',
      description: 'Выбери лучшие экопроекты',
      monthStart: 'январь',
      monthEnd: 'ноябрь',
      year: '2023',
      href: 'https://xn--h1aifcq0a9a.xn--80adblbabq1bk1bi8r.xn--p1ai/',
      icon: false,
    },
    {
      title: 'Безопасный интернет',
      description: 'Сделаем информационную среду комфортной',
      href: 'https://xn--80aaabpfimeotkl2bb2c0n.xn--p1ai/',
      icon: false,
    },
    {
      title: 'Год экологии',
      description: 'Выбери лучшие экопроекты',
      href: '/',
      icon: true,
    },
    {
      title: 'Переполненный вариант',
      description: 'Выбери лучшие экопроекты',
      img: 'images/yamal-animal.jpg',
      monthStart: 'январь',
      monthEnd: 'ноябрь',
      year: '2023',
      href: '/',
      icon: true,
    },
  ];

  const balanceUser = 1500;

  const nameRef = getCyrillicInputRef(register, { required: true });
  const nameError = {
    reg: /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ-]+$/,
    message: 'Пожалуйста, введите своё имя',
  };

  const phoneRef = getPhoneInputRef(register, { required: true });
  const phoneError = {
    reg: /[^0-9]+/g,
    message: 'Пожалуйста, введите свой номер телефона',
  };

  const events = useSelector(selectAllEvents);

  useEffect(() => {
    if (!events.length) {
      dispatch(fetchEvents());
    }
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          paddingTop: 128,
          paddingBottom: 80,
          backgroundColor: '#3C4D80',
        }}
      >
        <Header
          cards={dataCard}
          options={options}
          balance={balanceUser}
        />
        {/* <ProjectCardAbout
          title="Сообщество активных жителей Ямала"
          description="Портал для тех, кому не&nbsp;безразлично, что происходит в&nbsp;его округе, городе, посёлке, дворе"
          text="подробнее о&nbsp;проекте"
          href="/ui"
          img={AboutImg}
        /> */}
        {/* <ProjectCardInner
          type="елка заботы"
          title="Подарите подарок нуждающемуся ребенку"
          description="Благотворительная акция в помощь детям Ямала"
          background={SmallImgV2}
          link="/ui"
        />
        <ProjectCardInner
          title="Уютный ямал"
          description="Поделись своими идеями, как улучшить жизнь на Ямале. Лучшие проекты будут реализованы в следующем году"
          background={SmallImgV3}
          link="/ui"
        /> */}
      </div>
      <div className="container">
        <div style={{
          gridColumn: '2/ span 6', display: 'flex', alignItems: 'center', paddingTop: 64, paddingBottom: 24,
        }}
        >
          <OversizedLink type="link-big-bold" link="/">Афиша</OversizedLink>
          {/* <TagSearch
            options={options}
          >
            Новый
          </TagSearch> */}
        </div>
      </div>
      <div className="container">
        {/* <EventCard */}
        {/*  category="спорт и игры" */}
        {/*  day="13" */}
        {/*  month="декабря" */}
        {/*  name="Хоккей. Первенство УФО, СФО, ПВО" */}
        {/*  img="images/soon-card.jpg" */}
        {/*  location="Новый Уренгой" */}
        {/*  price={2500} */}
        {/*  type="soon" */}
        {/*  typeEvent="torch" */}
        {/* /> */}
        {/* <EventCard */}
        {/*  category="туризм" */}
        {/*  name="Лагерь ГУЛАГа «Кинжальный мыс»" */}
        {/*  img="images/actual-event-card.jpg" */}
        {/*  location="Новый Уренгой" */}
        {/*  description="Уникальный тур по локациям Ямала" */}
        {/*  price={2500} */}
        {/*  type="actual" */}
        {/*  tickerPriceColor="#9164F0" */}
        {/*  typeEvent="Pushkinskaya" */}
        {/* /> */}
        {/* <EventCard */}
        {/*  category="кино" */}
        {/*  name="Миньоны: Грювитация" */}
        {/*  img={SmallImgV4} */}
        {/*  location="в 2 кинотеатрах" */}
        {/*  dateStart="2023-09-01T04:43:36.000000Z" */}
        {/*  price={2500} */}
        {/*  type="actual" */}
        {/*  tickerPriceColor="pink" */}
        {/* /> */}
      </div>
      <div>
        <Button typeButton="button-search" />
        <div style={{ marginTop: 20 }} />
        <div>
          <div className="row" style={{ marginTop: 20 }}>
            <AddIdia style={{ gridColumnStart: 1, gridColumnEnd: 3 }} users={[{ name: 'das', surname: 'xdasd' }, { name: 'czxcm', surname: 'cxczzxx' }, { name: 'das', surname: 'xdasd' }, { name: 'czxcm', surname: 'cxczzxx' }]} />
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <AllEvents />
          </div>
          <div style={{ marginTop: 20 }}>
            <CardListView icon="table" info="таблица" />
            <CardListView icon="table" info="таблица" isActive={open2} onClick={() => setOpen2(!open2)} />
            <CardListView icon="table" info="список" />
            <CardListView icon="list" info="список" isActive={open} onClick={() => setOpen(!open)} isLastEl />
          </div>
          <div>
            <Wallet balance={200} />
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <TickerPrice price={2500} />
          <TickerPrice />
        </div>
        <div style={{ marginTop: 20 }}>
          <TickerPrice price={2500} />
        </div>
        <div className="row" style={{ marginTop: 20, marginBottom: 20, padding: 40 }}>
          <ProjectCardBig data={dataCard[0]} />
          <div style={{
            gridColumn: 'span 3',
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            {/* eslint-disable max-len */}
            {dataCard.map((item, index) => index > 0 && <ProjectCard key={item.title + item.href} data={item} />)}
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: 20, marginBottom: 20, padding: 40, backgroundColor: '#E5E5E5',
          }}
        >
          {events && events.map((event) => (
            <EventCardSmall
              data={event}
              typeEvent={event.type}
            // className={styles.eventCard}
            />
          ))}
        </div>
        <div style={{ margin: 20 }}>
          <ExpertsGrade count={12} />
          <LikesControl count={12} onDislike={() => { }} onLike={() => { }} voted="like" />
        </div>
        <DiscussionSortedList />
        <div className="row">
          {/* <Search /> */}
        </div>
        <div style={{ padding: 20, backgroundColor: 'white' }}>
          {/* <div style={{ margin: 20 }}>
            {supportIdea.map((person) => <ExpertSupport {...person} />)}
          </div> */}
          <div style={{ margin: 20, display: 'flex' }}>
            <Avatar name="Add" surname="Bdd" />
            <Avatar name="Add" surname="Bdd" href="#!" />
            <Avatar count="12" href="#!" />
            <Avatar count="15" />
            <Avatar img="images/avatar/expert-1.png" href="#!" />
          </div>
          <div style={{ margin: 20 }}>
            <ExpertAvatars users={[{ img: 'images/avatar/expert-1.png' }, { name: 'name', surname: 'surname' }, { img: 'images/avatar/expert-3.png' }, { img: 'images/avatar/expert-1.png' }]} />
            <ExpertAvatars users={[{ img: 'images/avatar/expert-1.png' }, { img: 'images/avatar/expert-2.png' }, { img: 'images/avatar/expert-3.png' }, { name: 'name', surname: 'surname' }, { name: 'name', surname: 'surname' }]} />
          </div>
          <h2>Inputs</h2>
          <div className="not-grid-size input-field">
            <InputField
              label="Имя"
              value={name}
              error={errors.name?.message}
            >
              <CyrillicInput
                name="name"
                ref={nameRef}
                error={nameError}
                setForm={setForm}
                setError={setError}
                clearErrors={clearErrors}
                value={name}
              />
            </InputField>
          </div>
          <div className="not-grid-size input-field disabled">
            <InputField
              label="Имя"
              value={name}
              error={errors.name?.message}
            >
              <CyrillicInput
                name="name"
                ref={nameRef}
                error={nameError}
                setForm={setForm}
                setError={setError}
                clearErrors={clearErrors}
                value={name}
                disabled
              />
            </InputField>
          </div>
          <div className="not-grid-size input-field">
            <InputField
              label="Телефон"
              value={phone}
              error={errors.phone?.message}
            >
              <PhoneInput
                name="phone"
                ref={phoneRef}
                error={phoneError}
                setForm={setForm}
                setError={setError}
                clearErrors={clearErrors}
                value={phone}
              />
            </InputField>
          </div>
          <div className="not-grid-size input-field">
            <InputField
              label="Текст"
              value={message}
            >
              <TextArea
                name="message"
                onChange={setForm}
                value={message}
                defaultLinesNumber={5}
              />
            </InputField>
          </div>
          <div className="not-grid-size input-field">
            <InputField
              label="Дата рождения"
              value={date}
              error={errors.date?.message}
            >
              <DateInput
                name="date"
                value={date}
                setForm={setForm}
                setError={setError}
                clearErrors={clearErrors}
              />
            </InputField>
          </div>
          <div className="not-grid-size input-field">
            <InputField>
              <SearchInput
                value={searchValue}
                onChange={setForm}
              />
            </InputField>
          </div>
        </div>
        <div>
          <HowWorkDiscussion isOpen={isOpen} onClose={closeModalHandler} />
        </div>
        <div style={{ marginTop: 20, width: 352 }}>
          <SpecialCard
            balance={200}
          >
            Оставляйте отзывы и получайте бонусы
          </SpecialCard>
          <SpecialCard
            addShapes
            icon="telegram_special"
            balance={200}
          >
            Будьте в курсе всего — подпишитесь на телеграм-бота
          </SpecialCard>
          <SpecialCard
            addShapes
            balance={1200}
          >
            Будьте в курсе всего — подпишитесь на телеграм-бота
          </SpecialCard>
        </div>
        <div className="row">
          <SearchHint
            info="Медитируйте на снежинки в реальности"
            name="Волшебный шар"
            page="Магазин"
            img="images/search-hint.png"
          />
        </div>
        <div className="row">
          <SearchHint
            info="Медитируйте на снежинки в реальности"
            name="Волшебный шар"
            page="Магазин"
          />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridColumnGap: 32,
        }}
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridColumnGap: 32,
          backgroundColor: '#e5e5e5',
        }}
        >
          <BonusCard
            typeTitle="Бонусная программа"
            title="Бонусы за развлечения"
            description="Покупайте билеты, посещайте мероприятия, получайте удовольствие и бонусы."
          />
        </div>
        <TimeCard
          type="firstdate"
          fromDate="2023-11-05T00:00:00.000000Z"
          toDate="2023-11-12T00:00:00.000000Z"
          size="thin"
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridColumnGap: 32,
          marginTop: 20,
        }}
        >
          <TimeCard
            text="Ждем ваших идей до"
            fromDate="2023-11-05T00:00:00.000000Z"
            toDate="2023-12-12T00:00:00.000000Z"
            size="thick"
          />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridColumnGap: 32,
          marginTop: 20,
        }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridColumnGap: 'inherit',
            gridColumn: 'span 12',
          }}
          >
            {/* <OfferFirst */}
            {/*  title="Чем заняться на выходных?" */}
            {/*  description="10 событий, которые нельзя пропустить. Еженедельная подборка." */}
            {/*  date={['2023-11-10T00:00:00.000000Z', '2023-12-05T00:00:00.000000Z']} */}
            {/*  type="color" */}
            {/*  img={OfferFirstImg} */}
            {/*  size="thin" */}
            {/* /> */}
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridColumnGap: 32,
          marginTop: 32,
          backgroundColor: '#F1F1F7',
        }}
        >
          {events.length && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gridColumnGap: 32,
              gridColumn: '2/ span 10',
              gridRowGap: 32,
              marginTop: 32,
              backgroundColor: '#F1F1F7',
            }}
            >
              <div style={{
                gridColumn: 'span 5',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridColumnGap: 'inherit',
              }}
              >
                {/* <OfferFirst */}
                {/*  data={events[0]} */}
                {/*  type="color" */}
                {/* /> */}
              </div>
              <div style={{
                gridColumn: 'span 5',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridColumnGap: 'inherit',
              }}
              >
                {/* <OfferFirst */}
                {/*  data={events[1]} */}
                {/*  type="gray" */}
                {/* /> */}
              </div>
            </div>
          )}
        </div>
        <div style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridColumnGap: 32,
          backgroundColor: '#e5e5e5',
        }}
        >
          {/* <ProjectCardSmall
            variant="big"
            type="елка заботы"
            title="Подарите подарок нуждающемуся ребенку"
            description="Благотворительная акция в помощь детям Ямала"
            background={SmallImgV2}
          />
          <ProjectCardSmall
            variant="small"
            type="уютный ямал"
            title="Предложите идею по улучшению жизни в своем регионе"
            background={SmallImgV1}
          />
          <ProjectCardSmall
            variant="small"
            type="питомцы ямала"
            title="Заведите себе нового друга"
            description="Бездомные животные из природы"
            background={SmallImgV11}
          />
          <ProjectCardSmall
            variant="small"
            type="кибердружина"
            title="Позаботьтесь о безопасности интернета"
            description="Жалобы на деструктивный и опасный контент"
            background={SmallImgV1contrast}
            contrast
          /> */}
        </div>
        <div style={{ marginTop: 20 }}>
          <Tag
            type="mark"
          >
            новый уренгой
          </Tag>
          <Tag
            type="time"
          >
            10:00
          </Tag>
        </div>
        <div className="not-grid-size input-field" style={{ width: 440 }}>
          <h2>Select</h2>
        </div>
        <div className="not-grid-size input-field" style={{ width: 440 }}>
          <div className="select__button">
            <Select
              type="button--color"
              options={options}
              className="select--button"
              classIsOpen="select--button--is-open"
              defaultValue={options[0]}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="not-grid-size input-field" style={{ width: 440 }}>
          <Select
            type="input"
            className="select"
            classIsOpen="select--is-open"
            options={options}
            isSearchable
          />
        </div>
        <div className="not-grid-size input-field" style={{ width: 440 }}>
          <Select
            type="input"
            className="select"
            classIsOpen="select--is-open"
            options={options}
            isSearchable
            isDisabled
          />
        </div>
        <div style={{ marginTop: 20, width: 414 }}>
          <BottomMenuMobile />
        </div>
        <div style={{ marginTop: 20 }}>
          {/* <Tags type="search">
            Лабытнанги
          </Tags> */}
        </div>
        <div className="not-grid-size input-field" style={{ width: 440 }}>
          {/* <TagSearch options={options}>
            Другие теги
          </TagSearch> */}
        </div>
        <div className="row">
          <SearchHint
            info="Медитируйте на снежинки в реальности"
            name="Волшебный шар"
            page="Магазин"
            img="images/search-hint.png"
          />
        </div>
        <div className="row">
          <SearchHint
            info="Медитируйте на снежинки в реальности"
            name="Волшебный шар"
            page="Магазин"
          />
        </div>
        <div>
          <Checkbox checked={checkbox} onClick={() => { setCheckbox((prev) => !prev); }} />
        </div>
        {/* <div className="row" style={{ marginTop: 20, height: 398 }}> */}
        {/*  <EventCard */}
        {/*    category="спорт и игры" */}
        {/*    day="13" */}
        {/*    month="декабря" */}
        {/*    name="Хоккей. Первенство УФО, СФО, ПВО" */}
        {/*    img="images/soon-card.jpg" */}
        {/*    location="Новый Уренгой" */}
        {/*    price={2500} */}
        {/*    type="soon" */}
        {/*  /> */}
        {/* </div> */}
        {/* <div className="row" style={{ marginTop: 20, height: 398 }}> */}
        {/*  <EventCard */}
        {/*    category="туризм" */}
        {/*    name="Лагерь ГУЛАГа «Кинжальный мыс»" */}
        {/*    img="images/actual-event-card.jpg" */}
        {/*    location="Новый Уренгой" */}
        {/*    description="Уникальный тур по локациям Ямала" */}
        {/*    price={2500} */}
        {/*    type="actual" */}
        {/*    icon="face" */}
        {/*    tickerPriceColor="#9164F0" */}
        {/*  /> */}
        {/* </div> */}
        <div style={{ margin: 24 }}>
          <FiltersWrapper />
        </div>
        <div style={{ margin: 20, padding: 50, background: '#F5F5F5' }}>
          {/* <SheduleCard */}
          {/*  name="Многофункциональная площадка Виадук" */}
          {/*  location="Новый Уренгой, мкрн. Тундровый, 4" */}
          {/*  phone="+7 (38142) 1-01-11" */}
          {/*  mapCoord="66.529866, 66.614507" */}
          {/*  webLink="arctorium.ru" */}
          {/*  tickerHref="#!" */}
          {/*  times={['11:30', '15:00', '18:00']} */}
          {/*  socialLinks={[ */}
          {/*    { */}
          {/*      name: 'telegram-social', */}
          {/*      url: 'https://t.me/zhivem_na_severe', */}
          {/*      title: 'Telegram', */}
          {/*    }, */}
          {/*    { */}
          {/*      name: 'vkontakte-social', */}
          {/*      url: 'https://vk.com/zhivemnasevere', */}
          {/*      title: 'ВКонтакте', */}
          {/*    }, */}
          {/*    { */}
          {/*      name: 'odnoklassniki-social', */}
          {/*      url: 'https://ok.ru/group/53447323877518', */}
          {/*      title: 'Одноклассники', */}
          {/*    }, */}
          {/*  ]} */}
          {/* /> */}

          {/* <SheduleCard */}
          {/*  name="Многофункциональная площадка Виадук" */}
          {/*  location="Новый Уренгой, мкрн. Тундровый, 4" */}
          {/*  phone="+7 (38142) 1-01-11" */}
          {/*  mapCoord="66.529866, 66.614507" */}
          {/*  placemarkCoords={['66.529866, 66.614507', '62.529832, 65.614521']} */}
          {/*  webLink="arctorium.ru" */}
          {/*  tickerHref="#!" */}
          {/*  times={['11:30', '15:00', '18:00']} */}
          {/*  socialLinks={[ */}
          {/*    { */}
          {/*      name: 'telegram-social', */}
          {/*      url: 'https://t.me/zhivem_na_severe', */}
          {/*      title: 'Telegram', */}
          {/*    }, */}
          {/*    { */}
          {/*      name: 'vkontakte-social', */}
          {/*      url: 'https://vk.com/zhivemnasevere', */}
          {/*      title: 'ВКонтакте', */}
          {/*    }, */}
          {/*    { */}
          {/*      name: 'odnoklassniki-social', */}
          {/*      url: 'https://ok.ru/group/53447323877518', */}
          {/*      title: 'Одноклассники', */}
          {/*    }, */}
          {/*  ]} */}
          {/* /> */}
          <div className={{ margin: 20 }}>
            <DiscussionSortedList tabs={[{ name: 'результаты', category: 'result' }]} activeTab="result" />
          </div>
          <div style={{ margin: 20 }}>
            <Stages stageName="Обсуждение" stageNumber="1" href="#!" />
            <Stages stageName="Обсуждение" stageNumber="1" href="#!" isFinally />
          </div>
          <div>
            <DocumentLink format="pdf" href="#!" name="Договор оферты" />
            <DocumentInput name="Добавить файл" handleFile={(files) => { console.log(files); }} />
          </div>
          <div className="row">
            <Qr href="/qr" />
          </div>
          <div className="row">
            <ProfileTIle volume={0} additionalText={1} to="/to-my-order" hrefQr="/qr" />
            <ProfileTIle volume={1} additionalText={1} to="/to-my-order" hrefQr="/qr" />
            <ProfileTIle volume={2} additionalText={2} to="/to-my-order" hrefQr="/qr" />
            <ProfileTIle volume={5} additionalText={8} to="/to-my-order" hrefQr="/qr" />
          </div>
          <div className="row">
            <BasketStatus href="/toBasket" />
          </div>
          <div className="row">
            <ActionCard
              text="Как привлечь внимание горожан к нуждающимся жителям Нового Уренгоя?"
              href="/to-somewhere"
              tags={['Губкинский', 'Лабытнанги', 'Муравленко']}
            />
          </div>
        </div>
        <div className="row">
          <ProductCardMainInfo
            type="merch"
            title="Худи «Ледокол», цвет сиреневый, размер XL"
            lastNumber={2}
            price={500}
            label="мерч"
          />
          <ProductCardMainInfo
            type="coupon"
            title="Скидка 5% на покупку абонемента в студию «Атмосфера»"
            logo="/images/icon_store-card.png"
            lastNumber={3}
            price={300}
            label="купон"
          />
        </div>
        <div className="row" style={{ marginLeft: 156 }}>
          <GalleryStore data={galleyStore} />
        </div>
      </div>
      <div style={{ maxWidth: 1528 }}>
        <OrderCard
          orderNumber={8}
          partner="ООО «тоска #008000»"
          orderItems={[
            {
              price: 12000, quantity: 1, name: 'Худи «Ледокол», цвет сиреневый,размер XL', img: './images/order-line.png',
            },
            {
              price: 1000, quantity: 1, name: 'Тренинг «Мозголом» без нагрузки на вакуумном аппарате', img: './images/order-line.png',
            },
            {
              price: 500, quantity: 2, name: 'Перчатки «Гвоздодёр», цвет зеленый,размер XL', img: './images/order-line.png',
            },
          ]}
          phone="+7 (234) 123-123-123"
          status="заказ выдан"
          adress="улица Свердлова, д.48, кабинет 409"
          date="12.04.2023"
        />
        <OrderCard
          orderNumber={8}
          partner="ООО «тоска #008000»"
          orderItems={[
            {
              price: 12000, quantity: 1, name: 'Худи «Ледокол», цвет сиреневый,размер XL', img: './images/order-line.png',
            },
            {
              price: 1000, quantity: 1, name: 'Тренинг «Мозголом» без нагрузки на вакуумном аппарате', img: './images/order-line.png',
            },
            {
              price: 500, quantity: 2, name: 'Перчатки «Гвоздодёр», цвет зеленый,размер XL', img: './images/order-line.png',
            },
          ]}
          phone="+7 (234) 123-123-123"
          status="заказ готов к выдаче"
          adress="улица Свердлова, д.48, кабинет 409"
          date="12.04.2023"
        />
        <OrderCard
          orderNumber={8}
          partner="ООО «тоска #008000»"
          orderItems={[
            {
              price: 12000, quantity: 1, name: 'Худи «Ледокол», цвет сиреневый,размер XL', img: './images/order-line.png',
            },
            {
              price: 1000, quantity: 1, name: 'Тренинг «Мозголом» без нагрузки на вакуумном аппарате',
            },
            {
              price: 500, quantity: 2, name: 'Перчатки «Гвоздодёр», цвет зеленый,размер XL', img: './images/order-line.png',
            },
          ]}
          phone="+7 (234) 123-123-123"
          adress="улица Свердлова, д.48, кабинет 409"
        />
      </div>
      <div className="not-grid-size input-field" style={{ width: 440 }}>
        <Select
          type="input"
          className="select"
          classIsOpen="select--is-open"
          options={options}
          isSearchable
          isDisabled
        />
      </div>
      <div className="row">
        <SearchHint
          info="Медитируйте на снежинки в реальности"
          name="Волшебный шар"
          page="Магазин"
          img="images/search-hint.png"
        />
      </div>
      <div className="row">
        <SearchHint
          info="Медитируйте на снежинки в реальности"
          name="Волшебный шар"
          page="Магазин"
        />
      </div>
      <div>
        <Checkbox checked={checkbox} onClick={() => { setCheckbox((prev) => !prev); }} />
      </div>
      <div style={{ margin: 20 }}>
        <Stages stageName="Обсуждение" stageNumber="1" href="#!" />
        <Stages stageName="Обсуждение" stageNumber="1" href="#!" isFinally />
      </div>
      <div style={{
        backgroundColor: '#f5f5f5',
        maxWidth: 1500,
      }}
      >
        <BasketItem
          category="купон"
          count={1}
          name="Интенсивный тренинг без нагрузки на вакуумном аппарате Интенсивный тренинг без нагрузки на вакуумном аппарате Интенсивный тренинг без нагрузки на вакуумном аппарате Интенсивный тренинг без нагрузки на вакуумном аппарате Интенсивный тренинг без нагрузки на вакуумном аппарате Интенсивный тренинг без нагрузки на вакуумном аппарате Интенсивный тренинг без нагрузки на вакуумном аппарате"
          price={600}
          piecesLeft={2}
          checked={open}
          onChecked={() => setOpen((prev) => !prev)}
          img="./images/basket-item.png"
        />
        <BasketItem
          category="купон"
          count={1}
          name="Интенсивный тренинг без нагрузки на вакуумном аппарате"
          price={600}
          piecesLeft={2}
          checked={open}
          onChecked={() => setOpen((prev) => !prev)}
        />
        <BasketItem
          category="купон"
          count={1}
          name="Интенсивный тренинг без нагрузки на вакуумном аппарате"
          price={600}
          piecesLeft={2}
          img="./images/basket-item.png"
          disabled
        />
      </div>
      <div style={{ margin: 20, maxWidth: 1528 }}>
        <FaqCard title="Как и где получить заказ?">
          <WhereGetOrder
            phone="+7 (234) 123-123-123"
            info="Дорогой друг! Приветствуем тебя на нашем сайте. Видим, что ты частый гость,
                  раз уже накопил достаточно бонусов, чтобы купить себе кофту с атомным
                  ледоколом — гордостью российского атомного флота."
            adress="улица Свердлова, д.48, кабинет 409"
            onClick={() => {}}
          />
        </FaqCard>
      </div>
      <div className="row">
        <AllIdea ideas={ideas} />
        <AllComments comments={comments} />
      </div>
      <div className="row">
        <VoteCards
          votes={votes.votesData}
          maxVotes={votes.maxVotes}
          step={votes.step}
        />
      </div>
    </>
  );
};

export default UIPage;
