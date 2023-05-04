export const cookies = {
  get: (cookie: string, name: string) => {
    const value = `; ${cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const token = parts.pop();
      if (token !== undefined) return token.split(";").shift();
    }
    return null;
  },
};
