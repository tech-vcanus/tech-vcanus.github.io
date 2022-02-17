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
![image](../../Desktop/screenshot.png)


- basic composition of a file
![image](../../Desktop/screenshot2.png)


## Run Storybook
```
npm run storybook
```
![image](../../Desktop/screenshot3.png)