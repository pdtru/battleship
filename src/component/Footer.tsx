import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const footerContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '16px',
  };

  const iconStyles = {
    fontSize: '20px',
    color: isHover ? '#8a77a5' : undefined,
  };

  return (
    <>
      <div style={footerContainerStyles}>
        <p>Copyright © 2023 pdtru</p>
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
