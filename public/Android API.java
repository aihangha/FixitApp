// Android API
// The following code snippet example will launch Waze to look for the specified location, if Waze is installed. If Waze is not installed it will open Waze page on the Market application.

try
{
   String url = "waze://?q=Hawaii";
    Intent intent = new Intent( Intent.ACTION_VIEW, Uri.parse( url ) );
   startActivity( intent );
}
catch ( ActivityNotFoundException ex  )
{
  Intent intent =
    new Intent( Intent.ACTION_VIEW, Uri.parse( "market://details?id=com.waze" ) );
  startActivity(intent);
}