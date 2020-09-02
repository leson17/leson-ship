import React from 'react';
import Button, { ButtonSize, ButtonType, } from './components/Button/button';

const App: React.FC = () => {
  const clickMe = (e) => {
    console.log(e.target);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button disabled
          onClick={(e)=>{clickMe(e);}}
        >DisabledButton</Button>
        <Button btnType={ButtonType.Primary}
          onClick={(e)=>{clickMe(e);}}
          size={ButtonSize.Large}
        >
          LargeButton
        </Button>
        <Button btnType={ButtonType.Danger}
          onClick={(e)=>{clickMe(e);}}
          size={ButtonSize.Small}
        >
          smallButton
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.baidu.com"
          onClick={(e)=>{clickMe(e);}}
          size={ButtonSize.Small}
          target="_blank" rel="noopener noreferrer"
        >
          BaiduLink
        </Button>
      </header>
    </div>
  );
};

export default App;
