export const setStateEditForm = (editForm: any, initObject: any, hooksObjectSet: any) => {
  const { setKeyInput, setTitleInput, setVisibleInput, setActiveInput, setParamsInput } = hooksObjectSet;

  if (editForm) {
    setKeyInput(initObject.key);
    setTitleInput(initObject.title);
    setVisibleInput(initObject.visible);
    setActiveInput(initObject.active_page);
    setParamsInput(initObject.params);
  }
};

export const resetInputFormState = (hooksObjectSet: any) => {
  const { setKeyInput, setTitleInput, setVisibleInput, setActiveInput, setParamsInput } = hooksObjectSet;
  setKeyInput("");
  setTitleInput("");
  setVisibleInput("true");
  setActiveInput("true");
  setParamsInput("");
};
