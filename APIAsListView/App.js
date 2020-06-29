/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  SectionList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function HomeScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url =
    'https://images.dog.ceo/breeds/retriever-golden/n02099601_5051.jpg';

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(json => {
        let dogs = [];
        let currDogs = [];
        let curr = 'A';
        Object.keys(json.message).forEach(breed => {
          const name = breed.charAt(0).toUpperCase() + breed.slice(1);
          if (name.charAt(0) === curr) {
            const breedData = {
              key: breed,
              name: name,
              types: json.message[breed],
            };
            currDogs.push(breedData);
          } else {
            const section = {
              heading: curr,
              data: currDogs,
            };
            dogs.push(section);
            curr = name.charAt(0);
            currDogs = [];
            const breedData = {
              key: breed,
              name: name,
              types: json.message[breed],
            };
            currDogs.push(breedData);
          }
        });
        const section = {
          heading: curr,
          data: currDogs,
        };
        dogs.push(section);
        setData(dogs);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: url}} />
        </View>
        <Text style={styles.title}>List of Dog Breeds</Text>
        <View style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <SectionList
              sections={data}
              renderItem={({item}, i) => (
                <View id={i} style={styles.container}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text
                    style={styles.details}
                    onStartShouldSetResponder={() =>
                      navigation.push('Details', {
                        dogBreed: item.key,
                        dogName: item.name,
                      })
                    }>
                    Details
                  </Text>
                </View>
              )}
              renderSectionHeader={({section}) => (
                <Text style={styles.heading}>{section.heading}</Text>
              )}
              keyExtractor={(item, i) => i.toString()}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

function DetailsScreen({route, navigation}) {
  const {dogBreed, dogName} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [url, setUrl] = useState();

  useEffect(() => {
    fetch('https://dog.ceo/api/breed/' + dogBreed + '/images/random')
      .then(response => response.json())
      .then(json => {
        setUrl(json.message);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [dogBreed]);

  return (
    <>
      <SafeAreaView>
        <Text style={styles.title}>Random {dogName} Dog Image</Text>
        <View style={styles.imageContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Image style={styles.image} source={{uri: url}} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 14,
  },
  name: {
    fontSize: 18,
    height: 30,
  },
  details: {
    color: '#8FBC8F',
    fontSize: 14,
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },
  heading: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'gainsboro',
  },
  imageContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'row',
    height: 400, // TODO: make this dynamic (for different screen sizes)
  },
  image: {
    width: 300,
    height: 300, // TODO: make this dynamic (for different screen sizes)
  },
});

export default App;
