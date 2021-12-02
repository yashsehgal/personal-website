
function saveCurrentTheme(theme) {
    if (theme === undefined) {
        theme = 'light';
    }
    localStorage.setItem('theme', theme);
}

export {
    saveCurrentTheme
}