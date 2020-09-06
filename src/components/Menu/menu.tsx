/*
 * @Description: Menu
 * @Author: Linxian Hong
 * @Date: 2020-09-05 19:56:06
 * @LastEditTime: 2020-09-07 02:10:09
 * @LastEditors: Linxian Hong
 */
import React, {
  useState,
  createContext,
  FunctionComponentElement,
} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type OnSelect = (selectedIndex: string) => void;

export interface MenuProps {
  /**
   * 默认选中的导航项
   */
  defaultIndex?: string;
  /**
   * 样式类名
   */
  className?: string;
  /**
   * 模板：'horizontal'横向；'vertical'纵向
   */
  mode?: MenuMode;
  /**
   * 行内样式
   */
  style?: React.CSSProperties;
  /**
   * SubMenu默认打开的项, 只在 mode='vertical'时有效
   */
  defaultOpenSubMenus?: string[];
  /**
   * 切换导航完成的回调函数
   */
  onSelect?: OnSelect;
}

interface IMenuContext {
  index: string;
  mode?: MenuMode;
  onSelect?: OnSelect;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = props => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames('leson-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    mode,
    // TODO: 回调方法是怎么传递给 subMenu 组件的，不明白？？？
    onSelect: handleClick,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // TODO:child为什么取不到type,需要child as React.FunctionComponentElement.不懂???????????????
      const childElement = child as FunctionComponentElement<MenuItemProps>;

      const { displayName } = childElement.type;
      if (displayName && ['MenuItem', 'SubMenu'].includes(displayName)) {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
