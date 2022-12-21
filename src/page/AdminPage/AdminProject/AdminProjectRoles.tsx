import React from "react";
import { Button, Form, Input, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const AdminProjectRoles = ({ project, roleUser, setRoleUser }: any) => {
  const [roleUserInput, setRoleUserInput] = React.useState("");

  React.useEffect(() => {
    if (project.project_roles !== undefined && project.project_roles && project.project_roles.length > 0) {
      setRoleUser(project.project_roles);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List
      size="small"
      bordered
      className="listNavigation"
      style={{
        backgroundColor: "white",
        width: "100%",
        margin: "20px auto 18px",
      }}
      dataSource={roleUser}
      header={
        <>
          <Form.Item
            style={{ display: "block", maxWidth: "100%", marginBottom: "0px" }}
            name={[ 'project', "roleUser"]}
            label="Введите роль"
          >
            <Input.Group style={{ display: "flex", maxWidth: "100%" }}>
              <Input
                style={{ maxWidth: "100%" }}
                value={roleUserInput}
                onChange={(e) => {
                  setRoleUserInput(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  setRoleUser([...roleUser, roleUserInput]);
                  setRoleUserInput("");
                }}
              >
                добавить
              </Button>
            </Input.Group>
          </Form.Item>
        </>
      }
      renderItem={(item: any, key) => (
        <List.Item style={{ display: "flex" }}>
          {item}
          <Button
            danger
            onClick={() => {
              let deleteArray = roleUser.filter((it: any) => it !== item);
              setRoleUser(deleteArray);
            }}
          >
            <DeleteOutlined />
          </Button>
        </List.Item>
      )}
    />
  );
};
