function Theme({ Icon, mode, setTheme }) {
  const selectThemeHandler = () => {
    localStorage.theme = `${mode}`;
    setTheme({ Icon, mode });
  };

  const isActive = localStorage.theme === mode;

  return (
    <li
      className={`${
        isActive ? "text-sky-500" : "text-gray-800 dark:text-white"
      } cursor-pointer my-2 w-full flex items-center justify-start`}
      onClick={selectThemeHandler}
    >
      <Icon className="mr-4" />
      <span>{mode}</span>
    </li>
  );
}

export default Theme;
