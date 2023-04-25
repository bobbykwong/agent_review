export const cookies = {
  get: (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const token = parts.pop();
      if (token !== undefined) return token.split(";").shift();
    }
    return null;
  },
};
