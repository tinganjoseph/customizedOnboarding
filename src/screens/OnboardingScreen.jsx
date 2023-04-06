
import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity} from 'react-native'
import {Colors, General,Fonts} from '../constant';
import {WelcomeCard,Separator} from '../components';
import {Display} from '../utils';



const pageStyle = isActive =>
  isActive
    ? styles.page
    : {...styles.page, backgroundColor: Colors.DEFAULT_GREY};

const Pagination = ({index}) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};


const OnboardingScreen = ({navigation}) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({changed}) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  
  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };


  return (
    <View style={styles.container}>
   
      <Separator height={StatusBar.currentHeight}/> 
      <Separator height={Display.setHeight(8)}/>
     <View style={styles.welcomeListContainer}>
     <FlatList
           ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({item}) => <WelcomeCard {...item} />}
        />
      </View>
      <Separator height={Display.setHeight(8)}/>
      <Pagination index={welcomeListIndex}/>
      <Separator height={Display.setHeight(8)}/>
      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          style={styles.gettingStartedButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.gettingStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginLeft: 10 , 
                
    
                paddingVertical: 15,
                paddingHorizontal: 19,
                borderRadius: 16,}}
            onPress={() => welcomeList.current.scrollToEnd()}>
            <Text style={styles.buttonText}>SKIP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => pageScroll()}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
           )}
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  welcomeListContainer: {
    height: Display.setHeight(60),
  },
  pageContainer: {
    flexDirection: 'row',
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: Colors.DARK_TWO,
    borderRadius: 32,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Display.setWidth(90),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight:'bold',
    lineHeight: 16 * 1.4,
    color: Colors.DARK_FOUR,
   
  },
  button: {
   
    
    paddingVertical: 15,
    paddingHorizontal: 19,
    borderRadius: 16,
  },
  gettingStartedButton: {
    backgroundColor: Colors.DARK_TWO,
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: Colors.DEFAULT_WHITE,
    lineHeight: 20 * 1.4,
  },
})
