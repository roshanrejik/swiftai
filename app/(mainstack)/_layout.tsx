// File deleted.m "react";
import { Screens } from "@/src/constants/Screens";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack
         screenOptions={{
           headerShown: false,
         }}
       >

        
        
         {
          Object.values(Screens).map((item)=>{
            return  <Stack.Screen key={item} name={item} />
          })
         }
         {/* <Stack.Screen
           name={Screens.Home}
           options={{ headerTitle: "All Blog Posts" }}
         /> */}
       </Stack>
  );
}
