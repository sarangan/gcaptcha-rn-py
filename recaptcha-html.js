export default `<html>
   <head>
      <title>reCAPTCHA</title>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style>
        #recaptcha-wrapper {
          display: block;
          text-align:
          center;
        }
        #recaptcha {
          display:
          inline-block;
        }
      </style>
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      <script>
        function onSuccess() {
          const token = grecaptcha.getResponse();
          window.ReactNativeWebView.postMessage(token);
        }
        function onExpire() {
          window.ReactNativeWebView.postMessage("EXPIRED");
        }
        function onError() {
          window.ReactNativeWebView.postMessage("ERROR");
        }
        window.onload = (function() {
          window.ReactNativeWebView.postMessage("");
        });
      </script>
   <body>
      <div id="recaptcha-wrapper">
      <div style="font-size: 14px; font-family:arial; font-weight: bold">A quick security check</div>
        <br>
        <div id="recaptcha" class="g-recaptcha" data-callback="onSuccess" data-expired-callback="onExpire" data-error-callback="onError" data-sitekey="_SITEKEY"></div>
      </div>
   </body>
</html>`;
