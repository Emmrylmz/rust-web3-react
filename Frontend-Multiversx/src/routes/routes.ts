import { RouteNamesEnum } from 'localConstants';
import { Dashboard, Disclaimer, Home, VotingDashboard } from 'pages';
import { RouteType } from 'types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: VotingDashboard
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: VotingDashboard
  },
  {
    path: RouteNamesEnum.disclaimer,
    title: 'Disclaimer',
    component: Disclaimer
  }
];
