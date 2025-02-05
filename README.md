Backend:

Required version and services:
1. Java 17
2. Make sure your intellij idea has a Lombok package.
3. spring boot version: 3.3.5
4. I'm using the latest Gradle version 8.12.2
   ![image](https://github.com/user-attachments/assets/c3485233-ff88-4ca7-b0c3-923db8306f5d)
5. Mysql setup: Please make sure you have a MySQL with updated credentials.
   ![image](https://github.com/user-attachments/assets/7214b665-5bce-4eda-9c87-b87f5a118dad)

   DDL will be obtained from ddl-query folder and please execute in your database or I added the full database backend to ddl-query folder.
   ![image](https://github.com/user-attachments/assets/b3a291f3-aa76-4381-8572-bbbed752d735)
   ![image](https://github.com/user-attachments/assets/1ef73e9f-90ea-4b32-988d-2236d1519190)
6. Backend application running port: 
  server.port=8001
  management.server.port=8006
7. You will show in the following bootRun if all the dependencies are updated. (import all gradle packages)
   ![image](https://github.com/user-attachments/assets/cc8e63fd-750b-4081-9a0e-0868ecc4ba0e)

8. Click the bootRun to run the application.

Frontend:
1. Node version: v20.11.0
2. React JS version latest 18.3.12
3. .Env file configuration in the following make sure your backend runs on port 8001.
![image](https://github.com/user-attachments/assets/694154fa-ada4-4409-8f0d-9aec1fe10a7e)
4. npm install (fetch all packages on local)
5. npm run start (for running react application on port 3000)
6. npm run build (if required to build the application)

I added a video demo of my development video inventory project in the root directory please check the video attachment.

