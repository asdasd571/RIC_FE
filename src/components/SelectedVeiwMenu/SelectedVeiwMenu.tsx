import { useState } from "react";
import styles from "./SelectedViewMenu.module.scss";
import {
  SelectedViewMenuProps,
  MenuItem,
} from "../../types/SelectedViewMenu.types";

const tempMenuData: MenuItem[] = [
  {
    menuName: "block",
    component: <div>block</div>, // 리액트 컴포넌트 타입 지정
  },
  {
    menuName: "table",
    component: <div>table</div>, // 리액트 컴포넌트 타입 지정
  },
];

/**
 * ! App, xApp block 들에서 MenuItem데이터로 선택한 메뉴를 보여주는 컴포넌트입니다.
 * @param data(선택, 없으면 tempData) : MenuItem[] 형식이며, menuName(메뉴명), component(보여줄 컴포넌트)가 들어있습니다.
 * @returns
 */
const SelectedViewMenu: React.FC<SelectedViewMenuProps> = ({
  data = tempMenuData,
}) => {
  const menuData = data;
  // 보기 선택을 할 state
  const [slectedViewItem, setSelectedViewItem] = useState<string>(
    menuData[0].menuName
  );

  // 아이템 선택
  const handleItemSelect = (slectedViewItem: string) => {
    setSelectedViewItem(slectedViewItem);
  };

  return (
    <div className={styles.container}>
      <section className={styles.view_menu_container}>
        {menuData.map((menu) => (
          <span
            onClick={() => {
              handleItemSelect(menu.menuName);
            }}
            className={`${styles.view_item} ${slectedViewItem === menu.menuName && styles.view_item_clicked}`}
          >
            {menu.menuName}
          </span>
        ))}
      </section>

      <section className={styles.view_contents}>
        {menuData.map((menu) =>
          menu.menuName === slectedViewItem ? menu.component : <></>
        )}
      </section>
    </div>
  );
};

export default SelectedViewMenu;
{
  /* <span
onClick={() => {
  setSelectedViewItem("block");
}}
className={`${styles.view_item} ${slectedViewItem === "block" && styles.view_item_clicked}`}
>
block
</span>
<span
onClick={() => {
  setSelectedViewItem("table");
}}
className={`${styles.view_item} ${slectedViewItem === "table" && styles.view_item_clicked}`}
>
table
</span> */
}
