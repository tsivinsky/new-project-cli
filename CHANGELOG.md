# 2.10.0

- Uninstall shelljs. Now script uses internal Node.js module, child_process
- Add function, which print bye message in console, into Project class

# 2.9.0

- Update project types. For example, `react-webpack` was changed for `react`
- Add package-lock.json file with versions of dependencies

# 2.8.0

- Change template of electron application. Add menu template and some checks

# 2.7.0

- Change help message

# 2.6.4

- Fix bug with generating react-webpack project with sass, when there is --STYLE LOADERS-- string in webpack.config.js file

# 2.6.3

- Change --save-dev flag to -D for correct work with yarn in functions.js file

# 2.6.2

- Add path.join() method to read files in main file

# 2.6.1

- Fix bug with installing dev packages. Add manager option to splitPackages function with installing dev dependencies

# 2.6.0

- Add --no-sass flag for react-webpack type, which allows you to change default styles from scss to css
- Fix bug with yarn. Earlier, when user enter --yarn flag, it is not used in new project

# 2.5.0

- Add --proxy flag, which allows you to implement proxy url to your react app
- Replace webpack.config.js file with plain txt file

# 2.4.0

- Add chalk package for prettier logs into console

# 2.3.0

- Add option for choose default package manager (npm or yarn)

# 2.2.1

- Add checks for type and name of project

# 2.2.0

- Add new project type: Electron App
- Add option for change main file
- Add flex-direction value into style.scss in react-webpack template
- Change second info about version argument to help info in README

# 2.1.2

- Remove all horizonal lines from README
- Add more keywords to package.json file

# 2.1.1

- Add info about help and version flags to README

# v2.1.0

- Add help and version flags.
- Little refactoring in functions file
