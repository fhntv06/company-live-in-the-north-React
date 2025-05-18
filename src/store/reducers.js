import eventsSlice from '../features/AfishEvents/eventsSlice';
import placesSlice from '../features/AfishPlaces/placesSlice';
import compilationsSlice from '../features/AfishaCompilation/compiationSlice';
import votesSlice from '../features/DiscussionVotes/votesSlice';
import discussionsSlice from '../features/DiscussionsInner/discussionsSlice';
import authSlice from '../features/Auth/authSlice';
import resultsSlice from '../features/DiscussionsResults/resultsSlice';
import productsSlice from '../features/Products/productsSlice';
import projectsSlice from '../features/Projects/projectsSlice';
import municipalitiesSlice from '../features/Municipality/municipalitySlice';
import cozyYamalSlice from '../features/CozyYamalData/cozyYamalSlice';
import notificationSlice from '../features/Notification/notificationSlice';
import favoritesSlice from '../features/Favorites/favoritesSlice';
import feedbackSlice from '../features/Feedback/feedbackSlice';
import orderSlice from '../features/Order/orderSlice';

export default {
  events: eventsSlice,
  places: placesSlice,
  compilations: compilationsSlice,
  votes: votesSlice,
  discussions: discussionsSlice,
  results: resultsSlice,
  auth: authSlice,
  products: productsSlice,
  projects: projectsSlice,
  municipalities: municipalitiesSlice,
  cozyYamalData: cozyYamalSlice,
  notification: notificationSlice,
  favorites: favoritesSlice,
  order: orderSlice,
  feedback: feedbackSlice,
};
