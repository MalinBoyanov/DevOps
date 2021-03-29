import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {ReactNativePlugin} from '@microsoft/applicationinsights-react-native';
import * as appData from '../../app-insights-key.json';

const rnAppInsightsPlugin = new ReactNativePlugin();
const appInsightsKeys: Record<string, string> = appData;
console.log(appInsightsKeys['development']);
const appTracking = new ApplicationInsights({
  config: {
    instrumentationKey: appInsightsKeys['development'] ?? '',
    extensions: [rnAppInsightsPlugin],
    enableCorsCorrelation: true,
    disableFetchTracking: false,
    disableAjaxTracking: false,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
    autoTrackPageVisitTime: true,
    overridePageViewDuration: true,
  },
});
appTracking.loadAppInsights();

export const appInsights = appTracking.appInsights;
export {rnAppInsightsPlugin, appTracking};
