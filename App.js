import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, OnboardingScreen } from "./src/screens";
import { TailwindProvider } from "tailwindcss-react-native";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
       
          <Stack.Screen
            options={{ presentation: "fullScreenModal", headerShown: false }}
            name="Onboarding"
            component={OnboardingScreen}
          />

          <Stack.Screen
            options={{ presentation: "fullScreenModal", headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}


//{isFirstLaunch && ()}