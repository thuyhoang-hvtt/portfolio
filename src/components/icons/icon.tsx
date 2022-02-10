import React from 'react';
import {
  IconZeroX,
  IconAppStore,
  IconBlog,
  IconBookmark,
  IconCodepen,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconPlayStore,
  IconStar,
  IconTwitter,
  IconLogo,
  IconYoutube,
} from '@/components/icons';

interface IProps {
  name: string;
}

function Icon(props: IProps) {
  const { name } = props;

  switch (name) {
    case '0x':
      return <IconZeroX />;
    case 'AppStore':
      return <IconAppStore />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Blog':
      return <IconBlog />;
    case 'Codepen':
      return <IconCodepen />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Star':
      return <IconStar />;
    case 'Twitter':
      return <IconTwitter />;
    case 'Logo':
      return <IconLogo />;
    case 'Youtube':
      return <IconYoutube />;
    default:
      return <IconExternal />;
  }
}

export default Icon;
