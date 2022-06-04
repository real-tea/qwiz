export const paths = {
  home: () => '/',
  signIn: () => '/signin',
  signOut: () => '/signin?signOut=true',
  register: () => '/register',
  explore: () => '/explore',
  profile: () => '/profile',
  events: () => '/events',
  eventCreate: () => '/events/create',
  eventEdit: (id: string) => `/events/${id}/edit`,
  organizationPage: (id: string) => `/organization/${id}`,
  eventPage: (id: string) => `/events/${id}`,
  quiz: () => '/quiz',
  quizEdit: (id: string) => `/quiz/${id}/edit`,
  quizEditSlide: (id: string, slideId: string) => `/quiz/${id}/${slideId}`,
  questions: () => '/questions',
  questionPacks: () => '/question-packs',
  teams: () => '/teams',
  teamNew: () => '/teams/new',
  stats: () => '/stats',
  leaderboard: () => '/learderboard',
  settings: () => '/settings',
};
