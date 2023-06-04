import React from "react";
import { View } from "react-native";
import recaptchaHTML from "./recaptcha";
import { WebView } from "react-native-webview";


const ReCaptcha = (props) => {

  getRecaptchProps = () => {
    const { onMessage } = props;
    const html = recaptchaHTML.replace(
      /_SITEKEY/,
      ""
    );

    return {
      source: {
        html,
        baseUrl: "http://127.0.0.1/"
      },
      webViewRef: view => {
        this.webView = view;
      },
      useWebKit: true,
      onMessage,
      style: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
      }
    };
  };

  const webViewProps = getRecaptchProps();

    return (
      <View style={{ width: "100%", height: "85%", marginTop: 10}}>
        <WebView
            useWebKit
            source={webViewProps.source}
            allowFileAccess
            startInLoadingState
            incognito
            ref={webViewProps.webViewRef}
            style={webViewProps.style}
            onMessage={webViewProps.onMessage}
        />
      </View>
    )
  
}

export default ReCaptcha;
