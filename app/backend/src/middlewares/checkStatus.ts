const code400 = (errType: string | undefined): boolean => {
  switch (errType) {
    case 'any.required': return true;
    default: return false;
  }
};

const code422 = (errType: string | undefined): boolean => {
  switch (errType) {
    case 'number.base': return true;
    case 'number.min': return true;
    case 'string.base': return true;
    case 'string.min': return true;
    default: return false;
  }
};

export default { code400, code422 };
