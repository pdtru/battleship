import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import TextComponent from './TextComponent';

const Footer: React.FC = () => {
  return (
    <>
      <div>
        <TextComponent text="Copyright © 2023 pdtru" />
        <a href="https://github.com/pdtru">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </>
  );
};

export default Footer;
