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

```
 new-project react-webpack <PROJECT_NAME>
```

#### Flags

1. --proxy<br>
   This flag allows you to set proxy field to webpack config file

```
  new-project react-webpack react-app --proxy=http://localhost:5000
```

### **Express Application**

```
  new-project express-app <PROJECT_NAME>
```

### **Electron Application**

```
  new-project electron-app <PROJECT_NAME>
```

### **Flags which is supported by all types**

1. --main-file<br>
   This flag allows you to change main file name of new project, like this:

```
  new-project react-webpack react-app --main-file=app.js
```

2. --yarn<br>
   This flag allows you to set default package manager to yarn.

```
  new-project react-webpack react-app --yarn
```
