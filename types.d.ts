declare module 'react-quill' {
  import React from 'react';
  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    theme?: string;
    style?: React.CSSProperties;
    className?: string;
    modules?: any;
    formats?: string[];
  }
  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
