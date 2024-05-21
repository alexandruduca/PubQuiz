const paths = {
  root: '/',
  login: '/login',
  register: '/register',
  about: '/about',
  teamRegistration: '/team-registration',
  gameResults: '/game-results',
  newGame: '/new-game',
  teams: '/teams',
  faq: '/faq',
  contact: '/contact',
};

export const protectedPaths: string[] = [paths.newGame];

export default paths;
