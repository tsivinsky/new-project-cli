# new-project-cli

## Install

```
  npm i -g @tsivinsky17/new-project
```

## Version

For see version of your package, add -v or --version flag

```
  new-project -v
```

Or

```
  new-project --version
```

## Help

For see help message, add -h or --help flag

```
  new-project -h
```

Or

```
  new-project --help
```

## Usage

```
  new-project <PROJECT_TYPE> <PROJECT_NAME>
```

## Project Types

### **React Webpack Application**

#### Usage

```
 new-project react-webpack <PROJECT_NAME>
```

That allows you to create a new project based on React and Webpack with Sass as stylesheet.

### **Express Application**

#### Usage

```
  new-project express-app <PROJECT_NAME>
```

### **Electron Application**

#### Usage

```
  new-project electron-app <PROJECT_NAME>
```

### **Additional flags**

1. --main-file<br>
   This flag allow you to change main file name of new project, like this:

```
  new-project react-webpack react-app --main-file=app.js
```

That flag is supported by all project types.

2. --yarn<br>
   This flag allow you set default package manager to yarn.

```
  new-project react-webpack react-app --yarn
```

That flag also is supported by all types.
