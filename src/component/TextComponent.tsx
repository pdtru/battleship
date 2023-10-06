import { CSSProperties } from 'react';

const styles: CSSProperties = {};

interface TextProps {
  text: string;
}

const TextComponent: React.FC<TextProps> = (props) => {
  return (
    <span>
      <p>{props.text}</p>
    </span>
  );
};

export default TextComponent;
