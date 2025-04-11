const handleOnFocus = (e: React.FocusEvent<any>) => {
  e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.ant-form-item-label')?.classList.add('active');
};

const handleOnBlur = (e: React.FocusEvent<any>) => {
  if (e.target.value === '' || e.target.value === undefined) {
    e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.ant-form-item-label')?.classList.remove('active');
  }
};

const handleOnChange = (e: any) => {
  if (e.target.value !== '') {
    e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.ant-form-item-label')?.classList.add('active');
  }
};

export { handleOnFocus, handleOnBlur, handleOnChange };
