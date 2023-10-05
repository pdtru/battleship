import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const footerContainerStyle: CSSProperties = {};

const Footer = () => {
  return (
    <>
      <div className="footer-container" style={footerContainerStyle}>
        <div className="footer">
          Copyright © 2023 pdtru{' '}
          <a href="https://github.com/pdtru">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
