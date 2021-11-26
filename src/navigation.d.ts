import type { ShowEpisode } from '@api';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      ShowInformation: undefined;
      ShowEpisodeInformation: { episode: ShowEpisode };
    }
  }
}
