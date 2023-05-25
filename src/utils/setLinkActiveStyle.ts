import { TSetLinkActiveStyle } from './types/types';

const setLinkActiveStyle: TSetLinkActiveStyle = ({ isActive }) => ({
  color: isActive ? '#fff' : '#000',
  backgroundColor: isActive ? '#61892F' : '#86C232',
});

export default setLinkActiveStyle;
