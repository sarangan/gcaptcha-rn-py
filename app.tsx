/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Modal,
  TouchableHighlight
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import ReCaptchaV3 from "@haskkor/react-native-recaptchav3";
import ReCaptcha from './re-captcha-com';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [recaptcha, setRecaptcha] = useState('');
  const elementRef = useRef();
  const [rekey, setReket] = useState(1);
  const [modalVisible, setModalVisible] = useState(true);

  // useEffect(() => {
  //   const divElement = elementRef.current;
  //   // console.log(divElement);
  // }, []);

  const onMessageFromWebView = (event: any) => {
   
    const token = event.nativeEvent.data;
    if (token) {
     console.log(token)
      setRecaptcha(token)
      setModalVisible(!modalVisible)
    }
  };



  const send = () => {
        console.log('send!');
        console.log(recaptcha)
        const url = "https://your-backend-url"

        let data:any = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
            token: recaptcha
          }),
          headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
          }
        }

        fetch(url, data)
        .then(response => response.json())  // promise
        .then(json => {
          console.log('response')
          
          console.log(json)
          setReket(rekey + 1)
          
        })

    }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          {/* <ReCaptchaV3
                key={rekey}
                captchaDomain={'https://127.0.0.1'}
                siteKey={'6LeFTmQmAAAAAP_AEl2QqVi-Jx3R1WF80YXPu5vR'}
                onReceiveToken={(token) => setRecaptcha(token) }
            /> */}
        <View>
        <Modal animationType="slide" visible={modalVisible}>
          <View>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{}}
            >
              <Text>Close</Text>
            </TouchableHighlight>
            <View style={{}}>
              <ReCaptcha onMessage={onMessageFromWebView} />
            </View>
          </View>
        </Modal>
      </View>
          
            <Button title="Send" onPress={send} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
