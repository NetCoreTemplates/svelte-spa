using System;
using System.Collections.Generic;
using System.Linq;
using ServiceStack;
using ServiceStack.Script;
using ServiceStack.DataAnnotations;
using MyApp.ServiceModel;

namespace MyApp.ServiceInterface
{
    [Exclude(Feature.Metadata)]
    [FallbackRoute("/{PathInfo*}", Matches="AcceptsHtml")]
    public class FallbackForClientRoutes
    {
        public string PathInfo { get; set; }
    }

    public class MyServices : Service
    {
        //Return index.html for unmatched requests so routing is handled on client
        public object Any(FallbackForClientRoutes request) => 
            Request.GetPageResult("/");

        public object Any(Hello request)
        {
            return new HelloResponse { Result = $"Hello, {request.Name}!" };
        }
    }
}
