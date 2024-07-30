import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useLayoutEffect, useRef} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SearchBarProps} from 'react-native-screens';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}: any) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        autoCapitalize: 'none',
        placement: 'stacked',
        hideWhenScrolling: false,
        shouldShowHintSearchIcon: false,
        hideNavigationBar: true,
        tintColor: 'blue',
        textColor: 'black',
        hintTextColor: 'black',
        headerIconColor: 'black',
      } as SearchBarProps,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Details" onPress={() => navigation.navigate('Details')} />
      <Button
        title="Details2"
        onPress={() => navigation.navigate('Details2')}
      />
    </View>
  );
}

function DetailScreen({navigation}: any) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet
      enableDynamicSizing
      ref={bottomSheetRef}
      enablePanDownToClose
      onClose={navigation.goBack}>
      <BottomSheetView style={styles.contentContainer}>
        <Text>Details</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}
function Detail2Screen() {
  return (
    <View style={styles.container}>
      <Text>Detail2Screen</Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerSearchBarOptions: {}}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Group
            screenOptions={{
              headerShown: false,
              presentation: 'transparentModal',
              animation: 'none',
            }}>
            <Stack.Screen name="Details" component={DetailScreen} />
          </Stack.Group>

          <Stack.Screen
            options={{
              presentation: 'modal',
            }}
            name="Details2"
            component={Detail2Screen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    minHeight: 300,
    alignItems: 'center',
  },
});
