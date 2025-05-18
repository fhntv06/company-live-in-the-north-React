export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const phoneRegex = /(\+7 9[\d]{2} [\d]{3} [\d]{4})/gm;

export const cyrilicRegex = /^[А-Яа-я]/gm;

export const codeRegex = /^[0-9][0-9][0-9][0-9]/gm;

export const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/g;
