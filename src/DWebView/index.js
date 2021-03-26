import React from 'react';
import {WebView} from 'react-native-webview';

export const DWebView = () => {
  const onShouldStartLoadWithRequest = (x) => console.log('-->', x);
  return (
    <WebView
      ref={(ref) => (videoPlayer = ref)}
      allowsFullscreenVideo
      scalesPageToFit={true}
      originWhitelist={['*']}
      source={{uri: `http://localhost:8081/src/DWebView/index.html`}}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      onNavigationStateChange={onShouldStartLoadWithRequest}
    />
  );
};
