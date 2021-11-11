using ServiceStack;

[assembly: HostingStartup(typeof(MyApp.ConfigureUi))]

namespace MyApp;

public class ConfigureUi : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureAppHost(appHost => {
            // if wwwroot/ is empty, build Client App with 'npm run build'
            var svgDir = appHost.RootDirectory.GetDirectory("/assets/svg");
            if (svgDir != null)
            {
                Svg.Load(svgDir);
            }
            Svg.CssFillColor["svg-icons"] = "#FF3E00";
        });
}
