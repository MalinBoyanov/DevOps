import {appInsights, appTracking} from './index';
import {
  getBuildNumber,
  getApplicationName,
  getVersion,
  getUniqueId,
} from 'react-native-device-info';
export interface ICustomProperties {
  [key: string]: any;
}
export enum SeverityLevel {
  Verbose = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

export class AppInsightsHelper {
  static isSetUserSession = false;

  static deviceInfo: ICustomProperties = {
    version: getVersion(),
    buildNumber: getBuildNumber(),
    appName: getApplicationName(),
    deviceId: getUniqueId(),
  };
  static sendUserTelemetry(user_id: string): void {
    appTracking.setAuthenticatedUserContext(user_id, user_id, true);
    this.isSetUserSession = true;
  }

  static trackEvent(name: string, properties?: ICustomProperties): void {
    console.log(name);
    appInsights?.trackEvent({name}, properties);
  }

  static trackTrace(
    message: string,
    messageType?: SeverityLevel,
    properties?: ICustomProperties,
  ): void {
    appInsights?.trackTrace({
      message,
      severityLevel: messageType ?? SeverityLevel.Information,
      properties: properties
        ? {...this.deviceInfo, ...properties}
        : this.deviceInfo,
    });
  }

  static trackException(
    error: Readonly<Error>,
    errorType?: SeverityLevel,
    properties?: ICustomProperties,
  ): void {
    appInsights?.trackException({
      error: error,
      exception: error,
      severityLevel: errorType ?? SeverityLevel.Error,
      properties: properties
        ? {...this.deviceInfo, ...properties}
        : this.deviceInfo,
    });
  }
  static trackPageView(pageView: string): void {
    appInsights?.trackPageView({name: pageView, uri: pageView});
  }
}

export const ClickTracking = (operation: string, identifier?: string): void => {
  const viewName = 'App';
  const flatText = (text: string): string => {
    return text.replace(/\s/g, '').replace('-', '').toLowerCase();
  };
  AppInsightsHelper.trackEvent(
    `${flatText(viewName)}-${flatText(operation)}` +
      (identifier ? '-' + flatText(identifier) : ''),
  );
};
