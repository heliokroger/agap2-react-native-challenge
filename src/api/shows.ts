import { requestAPI } from './api';
import type { Show, ShowEpisode } from './types';

export const getShowInformation = (showId: number) =>
  requestAPI<Show>(`/shows/${showId}`, 'GET');

export const getShowEpisodes = (showId: number) =>
  requestAPI<ShowEpisode[]>(`/shows/${showId}/episodes`, 'GET');
