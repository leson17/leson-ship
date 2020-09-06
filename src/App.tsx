import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

const App: React.FC = () => {
  const clickMe = e => {
    console.log(e.target);
  };

  return (
    <div className="App">
      <header className="App-header">
        Leson Ship（雷神之舟）是目前最流行的 React UI组件库之一。
      </header>
      <hr />
      <div>菜单导航组件</div>
      {/* // ------- 菜单组件 ------- */}
      <Menu
        mode={'vertical'}
        onSelect={index => alert(index)}
        defaultOpenSubMenus={['3']}
      >
        <MenuItem>color link</MenuItem>
        <MenuItem disabled>color link 2</MenuItem>
        <MenuItem>color link 3</MenuItem>
        <SubMenu title="Dropdown">
          <MenuItem>Dropdown 1</MenuItem>
          <MenuItem>Dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>color link 5</MenuItem>
      </Menu>

      <div>按钮组件</div>
      {/* // ------- 按钮组件 ------- */}
      <Button
        disabled
        onClick={e => {
          clickMe(e);
        }}
      >
        DisabledButton
      </Button>
      <Button
        btnType={ButtonType.Primary}
        onClick={e => {
          clickMe(e);
        }}
        size={ButtonSize.Large}
      >
        LargeButton
      </Button>
      <Button
        btnType={ButtonType.Danger}
        onClick={e => {
          clickMe(e);
        }}
        size={ButtonSize.Small}
      >
        smallButton
      </Button>
      <Button
        btnType={ButtonType.Link}
        href="https://www.baidu.com"
        onClick={e => {
          clickMe(e);
        }}
        size={ButtonSize.Small}
        target="_blank"
        rel="noopener noreferrer"
      >
        BaiduLink
      </Button>
    </div>
  );
};

export default App;
