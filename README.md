## Users management app

### 🛠️ Project setup

1. Install [NodeJS](https://nodejs.org/en) with npm included.
2. Open project in a command-line console.
    1. **npm i -g pnpm** - installs [pnpm](https://pnpm.io/) - fast and space efficient package manager
    2. **pnpm i** - installs projects dependencies
    3. If you want to use deployed API, you can change it in .env file

<hr>

### 📣 Available commands

| Command              | Description                                                     |
|----------------------|-----------------------------------------------------------------|
| **pnpm dev**         | Runs frontend app and mock backend together in development mode |
| **pnpm dev:client**  | Runs only frontend app in development mode                      |
| **pnpm dev:backend** | Runs only mock backend in development mode                      |
| **pnpm lint**        | Runs linter and tries to automatically fix all errors           |
| **pnpm typecheck**   | Runs typechecker                                                |
| **pnpm test**        | Runs unit tests                                                 |
| **pnpm build**       | Build frontend application                                      |
| **pnpm preview**     | Preview built application                                       |
