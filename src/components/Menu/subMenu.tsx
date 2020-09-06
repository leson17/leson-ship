/*
 * @Description: subMenu
 * @Author: Linxian Hong
 * @Date: 2020-09-06 21:12:56
 * @LastEditTime: 2020-09-07 02:03:30
 * @LastEditors: Linxian Hong
 */
import React, {
  useState,
  useContext,
  useEffect,
  FunctionComponentElement,
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  className?: string;
  title: string;
}
const SubMenu: React.FC<SubMenuProps> = props => {
  const { index, className, title, children } = props;
  const context = useContext(MenuContext);

  const openSubMenus = context.defaultOpenSubMenus;
  const isOpened =
    index && context.mode === 'vertical'
      ? openSubMenus?.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpened);

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  });

  // 处理鼠标 click 事务
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  // 处理鼠标 hover 事务
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  useEffect(() => {
    console.log('subMenu is opened: ', menuOpen);
  }, [menuOpen]);

  const clickEvents =
    context.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('leson-submenu', {
      'menu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;

      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component'
        );
      }
    });

    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
