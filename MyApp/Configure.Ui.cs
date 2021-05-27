using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack;

namespace MyApp
{
    public class ConfigureUi : IConfigureAppHost
    {
        public void Configure(IAppHost appHost)
        {
            // if wwwroot/ is empty, build Client App with 'npm run build'
            var svgDir = appHost.RootDirectory.GetDirectory("/assets/svg");
            if (svgDir != null)
            {
                Svg.Load(svgDir);
            }
            Svg.CssFillColor["svg-icons"] = "#FF3E00";
        }
    }
}
