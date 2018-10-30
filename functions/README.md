### Troubleshooting

- **Problem 1**: When adding a package via `yarn add <package_name>` I get this error:
  ```
  error @google-cloud/functions-emulator@1.0.0-beta.5: The engine "node" is incompatible with this module. Expected version "~6".
  error Found incompatible module
  ```
  - **Solution**: Use `yarn add <package_name> --ignore-engines`. Also ensure that the module works with Node.js 6.0.

- **Problem 2**: When stopping the `make dev` command using `CTRL+C` and running `make dev` again, I get the following error
  ```
  "functions: Failed to emulate ...'".
  ```
  - **Reason**: This means that your cloud functions emulator hasn't closed from the previous session. This is a known problem when using certain shells (confirmed for Cygwin on Windows).
  - **Solution**: Open your task manager and close all processes called `Node.js: Server-side JavaScript`. Then run the command again.


- **Problem 3**: When running `make dev` or `make prod` I get this error:
  ```
  "EPERM: operation not permitted, ... node_modules\\@google-cloud\\functions-emulator\\logs\\cloud-functions-emulator.log'".
  ```
  - **Reason**: This means that your cloud functions emulator is already running. 
  - **Solution**: If you're still running `make dev` in another console window, attempt to cancel the command with `CTRL+C`. Then run `make dev` or `make prod` again. If this doesn't work, follow the solution to problem 2.

