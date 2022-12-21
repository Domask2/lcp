import React from "react";
import { Switch } from "antd";
import { getAuth, getEditMode } from "../../redux/app/app.selector";
import { RootState } from "../../redux/redux.store";
import { useActions } from "../../hooks/useActions";
import { EditOutlined } from '@ant-design/icons';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import { verification } from "../../utils";


const AdminSwitcher: React.FC = () => {
  const auth = useTypedSelector((state: RootState) => getAuth(state))
  const editMode = useTypedSelector((state: RootState) => getEditMode(state))

  const { appChangeEditMode } = useActions()

  function onChangeSwitchEditMode(checked: boolean) {
    appChangeEditMode(checked)
  }

  return verification(auth) ? (
    <div style={{
        position: "absolute",
        top: "20px",
        right: "16px",
        zIndex: 10
      }}>&nbsp;
      <Switch checkedChildren={<EditOutlined />}
        unCheckedChildren={<EditOutlined />}
        size="small"
        className="noPrint"
        title="режим редактирования"
        onChange={onChangeSwitchEditMode}
        checked={editMode} />
    </div>
  ) : (
    <></>
  );
}

export default AdminSwitcher