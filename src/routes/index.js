/* eslint-disable max-len */
import { lazy } from 'react';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const SignInPage = lazy(() => import('../pages/AuthPage/SignInPage'));
const SignUpPage = lazy(() => import('../pages/AuthPage/SignUpPage'));
const ResetPasswordPage = lazy(() => import('../pages/AuthPage/ResetPasswordPage'));
// const UIPage = lazy(() => import('../pages/UIPage/UIPage'));
const AfishaPage = lazy(() => import('../pages/AfishaPage/AfishaPage'));
const AfishaEventPage = lazy(() => import('../pages/AfishaEventPage/AfishaEventPage'));
const AfishaPlacePage = lazy(() => import('../pages/AfishaPlacePage/AfishaPlacePage'));
const AfishaCompilationPage = lazy(() => import('../pages/AfishaCompilationPage/AfishaCompilationPage'));
const AfishaSearchPage = lazy(() => import('../pages/AfishaSearchPage/AfishaSearchPage'));
const StoreLayout = lazy(() => import('../pages/StorePage/StoreLayout'));
const StoreShop = lazy(() => import('../pages/StorePage/StoreMainPage'));
const StorePartners = lazy(() => import('../pages/StorePage/StorePartners'));
const StoreFaq = lazy(() => import('../pages/StorePage/StoreFaq'));
const ProductPage = lazy(() => import('../pages/ProductPage/ProductPage'));
const CartPage = lazy(() => import('../pages/CartPage/CartPage'));
const OrderPage = lazy(() => import('../pages/OrderPage/OrderPage'));
const DiscussionsPage = lazy(() => import('../pages/DiscussionsPage/DiscussionsPage'));
const DiscussionsArchivePage = lazy(() => import('../pages/DiscussionsArchivePage/DiscussionsArchivePage'));
const DiscussionInnerPage = lazy(() => import('../pages/DiscussionInnerPage/DiscussionInnerPage'));
const ResultsPage = lazy(() => import('../pages/ResultsPage/ResultsPage'));
const CozyYamal = lazy(() => import('../pages/CozyYamal/CozyYamal'));
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));
const ActivitiesPage = lazy(() => import('../pages/ActivitiesPage/ActivitiesPage'));
const BonusHistoryPage = lazy(() => import('../pages/BonusHistoryPage/BonusHistoryPage'));
const ProfileOrders = lazy(() => import('../pages/ProfileOrders/ProfileOrders'));
const EditProfilePage = lazy(() => import('../pages/EditProfilePage/EditProfilePage'));
const UserNotificationsPage = lazy(() => import('../pages/UserNotificationsPage/UserNotificationsPage'));
const BonusProgramPage = lazy(() => import('../pages/BonusProgramPage/BonusProgramPage'));
const MobileMenuPage = lazy(() => import('../pages/MobileMenuPage/MobileMenuPage'));
const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage'));
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage'));
const UpdatePhonePage = lazy(() => import('../pages/AuthPage/UpdatePhonePage'));
const SuccessMessage = lazy(() => import('../pages/SuccessMessage/SuccessMessage'));
// const GiveawayPage = lazy(() => import('../pages/GiveawayPage/GiveawayPage'));
const QuizPage = lazy(() => import('../pages/QuizPage/QuizPage'));
const XmasTreePage = lazy(() => import('../pages/XmasTreePage/XmasTreePage'));
// const XmasTreeFirstStep = lazy(() => import('../pages/XmasTreePage/XmasTreeSteps/XmasTreeFirstStep'));
// const XmasTreeSecondStep = lazy(() => import('../pages/XmasTreePage/XmasTreeSteps/XmasTreeSecondStep'));
// const XmasTreeThirdStep = lazy(() => import('../pages/XmasTreePage/XmasTreeSteps/XmasTreeThirdStep'));
const TreeOfCareFaq = lazy(() => import('../pages/XmasTreePage/TreeOfCareFaq'));
const ReservedGifts = lazy(() => import('../pages/XmasTreePage/ReservedGifts'));

export default [
  {
    path: '/',
    name: 'Главная',
    element: MainPage,
  },
  // {
  //   path: 'ui',
  //   name: 'UI',
  //   element: UIPage,
  // },
  {
    path: 'afisha',
    name: 'Афиша',
    element: AfishaPage,
    children: [
      {
        path: ':category',
        element: AfishaPage,
      },
    ],
  },
  {
    path: 'afisha/event/:id',
    element: AfishaEventPage,
  },
  {
    path: 'afisha/place/:id',
    element: AfishaPlacePage,
  },
  {
    path: 'afisha/compilation/:id',
    element: AfishaCompilationPage,
  },
  {
    path: 'afisha/search',
    element: AfishaSearchPage,
  },
  {
    path: 'discussions',
    element: DiscussionsPage,
  },
  {
    path: 'discussions/archive',
    element: DiscussionsArchivePage,
  },
  {
    path: 'discussions/:id',
    element: DiscussionInnerPage,
  },
  {
    path: 'discussions/archive/:id',
    element: DiscussionInnerPage,
  },
  {
    path: 'votings/:id',
    element: DiscussionInnerPage,
  },
  {
    path: 'votings/archive/:id',
    element: DiscussionInnerPage,
  },
  {
    path: 'sign-in',
    name: 'Авторизация',
    element: SignInPage,
  },
  {
    path: 'sign-up',
    name: 'Регистрация',
    element: SignUpPage,
  },
  {
    path: 'reset-password',
    name: 'Восстановление пароля',
    element: ResetPasswordPage,
  },
  // {
  //   path: 'user/:id/verifity-email',
  //   name: 'Подтверждение почты',
  //   element: VerifityEmail,
  // },
  {
    path: 'reset-password-by-email',
    name: 'Восстановление пароля',
    element: ResetPasswordPage,
  },
  {
    path: 'update-password',
    name: 'Смена пароля',
    element: ResetPasswordPage,
  },
  {
    path: 'recovery-account',
    name: 'Восстановление профиля',
    element: ResetPasswordPage,
  },
  {
    path: 'update-email',
    name: 'Смена e-mail',
    element: ResetPasswordPage,
  },
  {
    path: 'update-phone',
    name: 'Смена телефона',
    element: UpdatePhonePage,
  },
  {
    path: 'email-updated',
    element: SuccessMessage,
  },
  {
    path: 'email-confirmed',
    element: SuccessMessage,
  },
  {
    path: 'results/:id',
    element: DiscussionInnerPage,
  },
  {
    path: 'results',
    element: ResultsPage,
  },
  {
    path: 'store',
    name: 'Магазин',
    element: StoreLayout,
    children: [
      {
        index: true,
        element: StoreShop,
      },
      {
        path: 'partners',
        element: StorePartners,
      },
      {
        path: 'faq',
        element: StoreFaq,
      },
    ],
  },
  {
    path: 'product/:id',
    element: ProductPage,
  },
  {
    path: 'cart',
    element: CartPage,
  },
  {
    path: 'order',
    element: OrderPage,
  },
  {
    path: 'cozy-yamal',
    element: CozyYamal,
  },
  {
    path: 'cozy-yamal/discussions/:id',
    element: DiscussionInnerPage,
  },
  {
    path: 'cozy-yamal/votings/:id',
    element: DiscussionInnerPage,
  },
  {
    path: '*',
    name: 'error 404',
    element: ErrorPage,
  },
  {
    path: 'profile',
    element: ProfilePage,
  },
  {
    path: 'profile/favorites',
    element: FavoritesPage,
  },
  {
    path: 'profile/activities',
    element: ActivitiesPage,
  },
  {
    path: 'profile/bonus-history',
    element: BonusHistoryPage,
  },
  {
    path: 'profile/orders',
    element: ProfileOrders,
  },
  {
    path: 'profile/edit',
    element: EditProfilePage,
  },
  {
    path: 'profile/notifications',
    element: UserNotificationsPage,
  },
  {
    path: 'profile/reserved-gifts',
    element: ReservedGifts,
  },
  {
    path: 'bonus-program',
    element: BonusProgramPage,
  },
  {
    path: 'menu',
    element: MobileMenuPage,
  },
  {
    path: 'search',
    element: SearchPage,
  },
  {
    path: 'about',
    element: AboutPage,
  },
  // {
  //   path: 'giveaway',
  //   element: GiveawayPage,
  // },
  {
    path: 'quiz',
    element: QuizPage,
  },
  {
    path: 'tree-of-care',
    name: 'Елка',
    element: XmasTreePage,
    children: [
      // {
      //   index: true,
      //   element: XmasTreeFirstStep,
      // },
      // {
      //   path: '1',
      //   element: XmasTreeFirstStep,
      // },
      // {
      //   path: '2',
      //   element: XmasTreeSecondStep,
      // },
      // {
      //   path: '3',
      //   element: XmasTreeThirdStep,
      // },
    ],
  },
  {
    path: 'tree-of-care/faq',
    element: TreeOfCareFaq,
  },
];
