
- Install the required dependencies:

        npm install --save-dev @playwright/test allure-playwright

- Generate the Allure Report:

        npx allure generate --output playwright-report 

- Open the Allure report:

       npx allure open playwright-report

  If you’ve added a script in package.json, run:

      npm run allure:open

 
- If Allure is installed globally, use this command to open the report:

       allure open playwright-report

    