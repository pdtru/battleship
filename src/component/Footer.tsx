import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import TextComponent from './TextComponent';

const Footer = () => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const footerContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '16px',
  };

  const iconStyles = {
    fontSize: '20px',
    color: isHover ? '#8a77a5' : '#6e5494',
  };

  return (
    <>
      <div style={footerContainerStyles}>
        <TextComponent text="Copyright © 2023 pdtru" />
        <a
          style={iconStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          href="https://github.com/pdtru"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </>
  );
};

export default Footer;
