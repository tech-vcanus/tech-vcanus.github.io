# Storybook with React Project

## Install Node
- install node with homebrew
- link: https://brew.sh/index_ko
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
```
brew --version
```
```
brew install node
```

## Install create-react-app
```
npm install -g create-react-app
```

```
create-react-app --version
```

## Create React Project
```
npx create-react-app <app name>
```

- Create React Project with Typescript
```
npx create-react-app <app name> --template=typescript
```
```
cd <app name>
npm start
```

## Install Storybook
- link: https://storybook.js.org/docs/react/get-started/install
- you need a project ready before installation
```
npx sb init
```
- make a file of a component with '.stories.tsx' in 'stories' directory to see on the storybook
![screenshot](https://user-images.githubusercontent.com/93421356/154380385-6a8fd200-8f01-496c-8abc-adbd997ed119.png)



- basic composition of a file </br>
![screenshot2](https://user-images.githubusercontent.com/93421356/154380397-56075b5a-668a-44c8-b03f-194854438d6e.png)



## Run Storybook
```
npm run storybook
```
<img width="1440" alt="screenshot3" src="https://user-images.githubusercontent.com/93421356/154380429-8252f191-cef4-47ad-8c1f-2d3b6d570d14.png">
