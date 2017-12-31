# Angular 5.1 + Angular Cli 1.6 + NgRx + .NET Core 2.0 (with optional Server Side Rendering) Starter
This is basic demo of how to use .NET Core 2.0 with the currently available preview of [Microsoft.AspNetCore.SpaServices.Extensions](https://docs.microsoft.com/en-us/aspnet/core/spa/).

# Getting Started?

- **Make sure you have at least Node 6.x or higher (w/ npm 3+) installed!**  
- **This repository uses ASP.Net Core 2.0, which has a hard requirement on .NET Core Runtime 2.0.0 and .NET Core SDK 2.0.0. Please install these items from [here](https://github.com/dotnet/core/blob/master/release-notes/download-archives/2.0.0-download.md)**


### Visual Studio 2017

Make sure you have .NET Core 2.0 installed and/or VS2017 15.3.
VS2017 should automatically install all the necessary npm & .NET dependencies when you open the project.

Simply push F5 to start debugging !

### Visual Studio Code

> Note: Make sure you have the C# extension & .NET Core Debugger installed.

The project comes with the configured Launch.json files to let you just push F5 to start the project.

```bash
# cd into the directory you cloned the project into then into the .\ClinetApp\ directory. In this example, the "ClientApp" folder contains a pretty standard Angular CLI generated app with the necessary modifications for .NET Core SSR. The npm dependencies should be installed when you do a "dotnet build", but it's never a bad idea to just do it manually to make any unexpected installation errors evident.
npm install
# cd ../ (or back into the root directory). The root directory contains a fairly standard .NET Web App, with the main difference being that the new Microsoft.AspNetCore.SpaServices.Extensions serves the Angular app directly from the CLI genreated index.html, not the more typical "_Layout.cshtml" + "Views/Home/Index.cshtml" + "Controllers/HomeController.cs" setup.
dotnet restore & npm start
``` 

### SSR (Server Side Rendering)

To enable SSR, simply uncomment the following block of code in startup.cs:

    // spa.UseSpaPrerendering(options =>
    // {
    //     options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.bundle.js";
    //     options.BootModuleBuilder = env.IsDevelopment()
    //         ? new AngularCliBuilder(npmScript: "build:ssr")
    //         : null;
    //     options.ExcludeUrls = new[] { "/sockjs-node" };
    // });
   
  And enable this flag in the .csproj file so the server version of client app will be built upon publishing, and the necessary node_modules folder will be deployed:

    <!-- Set this to true if you enable server-side prerendering -->
    <BuildServerSideRenderer>false</BuildServerSideRenderer>